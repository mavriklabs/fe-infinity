/* eslint-disable @typescript-eslint/no-explicit-any */
import { LOGIN_NONCE_EXPIRY_TIME, trimLowerCase } from '@infinityxyz/lib-frontend/utils';
import { Signature } from 'ethers';
import { verifyMessage } from 'ethers/lib/utils';
import { base64Encode, getLoginMessage } from '../commonUtils';
import { WalletSigner } from './WalletSigner';

enum StorageKeys {
  CurrentUser = 'CURRENT_USER',
  AuthNonce = 'X-AUTH-NONCE',
  AuthSignature = 'X-AUTH-SIGNATURE',
  AuthMessage = 'X-AUTH-MESSAGE',
  Wallet = 'WALLET'
}

class _OnboardAuthProvider {
  private authNonce = 0;
  private authSignature?: Signature;
  private authMessage = '';

  clear() {
    this.authNonce = 0;
    this.authSignature = undefined;
    this.authMessage = '';
    this.saveAuthSignature();
  }

  getAuthHeaders = (): object => {
    return {
      [StorageKeys.AuthNonce]: this.authNonce,
      [StorageKeys.AuthMessage]: base64Encode(this.authMessage),
      [StorageKeys.AuthSignature]: JSON.stringify(this.authSignature)
    };
  };

  isLoggedInAndAuthenticated(walletSigner: WalletSigner): boolean {
    const currentUser = trimLowerCase(walletSigner.userAddress);

    if (currentUser && this.authNonce && this.authMessage && this.authSignature) {
      try {
        const signer = verifyMessage(this.authMessage, this.authSignature).toLowerCase();
        const isSigValid = signer === currentUser;
        const isNonceValid = Date.now() - this.authNonce < LOGIN_NONCE_EXPIRY_TIME;

        return isSigValid && isNonceValid;
      } catch (err) {
        console.log(err);
        return false;
      }
    }

    return false;
  }

  loadCreds = () => {
    const localStorage = window.localStorage;
    const authNonce = localStorage.getItem(StorageKeys.AuthNonce);
    const authSignature = localStorage.getItem(StorageKeys.AuthSignature);
    const authMessage = localStorage.getItem(StorageKeys.AuthMessage);

    let parsedSignature;
    try {
      parsedSignature = JSON.parse(authSignature || '');
    } catch (err) {
      console.error(err);
    }

    if (
      parsedSignature &&
      'r' in parsedSignature &&
      's' in parsedSignature &&
      'v' in parsedSignature &&
      'recoveryParam' in parsedSignature
    ) {
      this.authSignature = parsedSignature;
    }
    this.authMessage = authMessage ?? '';
    this.authNonce = parseInt(authNonce ?? '0');
  };

  saveAuthSignature = () => {
    const localStorage = window.localStorage;

    localStorage.setItem(StorageKeys.AuthNonce, this.authNonce.toString());
    localStorage.setItem(StorageKeys.AuthSignature, JSON.stringify(this.authSignature ?? {}));
    localStorage.setItem(StorageKeys.AuthMessage, this.authMessage);
  };

  authenticate = async (walletSigner: WalletSigner) => {
    this.loadCreds();

    if (this.isLoggedInAndAuthenticated(walletSigner)) {
      return;
    }

    const nonce = Date.now();
    const loginMsg = getLoginMessage(nonce);
    const signature = await walletSigner.signMessage(loginMsg);
    if (signature) {
      try {
        this.authNonce = nonce;
        this.authSignature = signature;
        this.authMessage = loginMsg;
        this.saveAuthSignature();
      } catch (err) {
        console.error('Error saving login info', err);
      }
    } else {
      console.error('No signature');
    }
  };
}

// Singleton
export const OnboardAuthProvider = new _OnboardAuthProvider();

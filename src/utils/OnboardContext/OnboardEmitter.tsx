/* eslint-disable @typescript-eslint/no-explicit-any */
import mitt from 'mitt';
import { ProviderEvents } from '../providers/AbstractProvider';

class _Emitter {
  // cache
  private userAddress = '';
  private connected = false;
  private chainId = '';
  private emitter = mitt();

  updateUserAddress(address: string) {
    if (this.userAddress !== address) {
      const notify = this.userAddress.length > 0;

      this.userAddress = address;

      if (notify) {
        this.emit(ProviderEvents.AccountsChanged);

        this.updateConnected(!!address && address.length > 0);
      }
    }
  }

  updateConnected(connected: boolean) {
    if (this.connected !== connected) {
      this.connected = connected;

      if (this.connected) {
        this.emit(ProviderEvents.Connect);
      } else {
        this.emit(ProviderEvents.Disconnect);
      }
    }
  }

  updateChainId(chainId: string) {
    if (this.chainId !== chainId) {
      const notify = this.userAddress.length > 0;

      this.chainId = chainId;

      if (notify) {
        this.emit(ProviderEvents.ChainChanged);
      }
    }
  }

  emit(event: ProviderEvents, ...args: any) {
    console.log(`emit: ${event}`);
    this.emitter.emit(event, args);
  }

  on(event: ProviderEvents, listener: (data: any) => void): void {
    this.emitter.on(event, listener);
  }

  removeListener(event: ProviderEvents, listener: (data: any) => void): void {
    this.emitter.off(event, listener);
  }
}

// Singleton
export const OnboardEmitter = new _Emitter();

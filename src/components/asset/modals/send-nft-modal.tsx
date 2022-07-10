import { getAddress } from '@ethersproject/address';
import { Token } from '@infinityxyz/lib-frontend/types/core';
import { useState } from 'react';
import { Modal, TextInputBox, toastError } from 'src/components/common';
import { extractErrorMsg } from 'src/utils';
import { useAppContext } from 'src/utils/context/AppContext';
import { sendSingleNft } from 'src/utils/exchange/orders';

interface Props {
  isOpen: boolean;
  token: Token;
  onClose: () => void;
  onSubmit: (hash: string) => void;
}

export const SendNFTModal = ({ isOpen, onClose, onSubmit, token }: Props) => {
  const [address, setAddress] = useState('');
  const { providerManager, chainId } = useAppContext();

  const getFinalToAddress = async (addr: string) => {
    let finalAddress: string | null = addr;
    if (addr.endsWith('.eth') && providerManager) {
      const provider = providerManager.getEthersProvider();
      finalAddress = await provider.resolveName(addr);
    }
    if (finalAddress) {
      return getAddress(finalAddress);
    }
  };

  return (
    <div>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        okButton="Send"
        title="Send NFT"
        onOKButton={async () => {
          try {
            const toAddress = await getFinalToAddress(address);
            if (toAddress && token.collectionAddress && token.tokenId) {
              const signer = providerManager?.getEthersProvider().getSigner();
              if (signer) {
                const result = await sendSingleNft(signer, chainId, token.collectionAddress, token.tokenId, toAddress);
                if (result.hash) {
                  onSubmit(result.hash);
                }
              } else {
                console.error('signer is null');
              }
            } else {
              console.error('required data for send is missing');
            }
            onClose();
          } catch (err) {
            toastError(extractErrorMsg(err), () => {
              alert(err);
            });
          }
        }}
      >
        <div>
          <TextInputBox
            autoFocus={true}
            type="text"
            value={address}
            label="Address or ENS Name"
            placeholder=""
            onChange={(value) => {
              setAddress(value);
            }}
          />
        </div>
      </Modal>
    </div>
  );
};
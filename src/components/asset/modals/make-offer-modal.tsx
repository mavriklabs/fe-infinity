import { ChainId, OBOrder, SignedOBOrder, Token } from '@infinityxyz/lib-frontend/types/core';
import { ETHEREUM_WETH_ADDRESS, getOBComplicationAddress, NULL_ADDRESS } from '@infinityxyz/lib-frontend/utils';
import { useState } from 'react';
import { CurrencyInput, DatePickerBox, Modal, toastError, toastSuccess } from 'src/components/common';
import { DEFAULT_MAX_GAS_PRICE_WEI } from 'src/utils';
import { useAppContext } from 'src/utils/context/AppContext';
import { getSignedOBOrder } from 'src/utils/exchange/orders';
import { fetchOrderNonce, postOrders } from 'src/utils/marketUtils';
import { secondsPerDay } from 'src/utils/ui-constants';

interface Props {
  buyPriceEth: string;
  isOpen: boolean;
  token: Token;
  onClose: () => void;
}

export const MakeOfferModal = ({ isOpen, onClose, buyPriceEth, token }: Props) => {
  const { user, chainId, providerManager } = useAppContext();
  const [price, setPrice] = useState<string>(buyPriceEth || '1');
  const [expirationDate, setExpirationDate] = useState(Date.now() + secondsPerDay * 30 * 1000);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      okButton="Make offer"
      title="Make offer"
      onOKButton={async () => {
        if (!user) {
          return;
        }
        const priceVal = parseFloat(price);
        const orderNonce = await fetchOrderNonce(user.address);
        const signedOrders: SignedOBOrder[] = [];

        const signer = providerManager?.getEthersProvider().getSigner();
        if (signer) {
          let takerAddress = '';
          const owner = token.owner;
          if (typeof owner === 'string') {
            takerAddress = owner;
          } else if (typeof owner === 'object') {
            takerAddress = owner.address ?? '';
          }
          const tokenInfo = {
            tokenId: token.tokenId,
            tokenAddress: token.collectionAddress ?? '',
            tokenName: token.slug ?? '',
            tokenImage: token.image?.url ?? token.image?.originalUrl ?? '',
            takerAddress,
            takerUsername: '',
            attributes: [],
            numTokens: 1
          };
          const orderItem = {
            chainId: chainId as ChainId,
            collectionAddress: token.collectionAddress ?? '',
            collectionName: token.collectionName ?? '',
            collectionSlug: token.collectionSlug ?? '',
            collectionImage: '',
            hasBlueCheck: token.hasBlueCheck ?? false,
            tokens: [tokenInfo]
          };

          const order: OBOrder = {
            id: '',
            chainId,
            isSellOrder: false,
            makerAddress: user.address,
            makerUsername: user.username ?? '',
            numItems: 1,
            startTimeMs: Date.now(),
            endTimeMs: expirationDate,
            startPriceEth: priceVal, // set the Offer Price.
            endPriceEth: priceVal, // set the Offer Price.
            nfts: [orderItem],
            nonce: orderNonce,
            execParams: {
              complicationAddress: getOBComplicationAddress(chainId),
              currencyAddress: ETHEREUM_WETH_ADDRESS
            },
            extraParams: {
              buyer: NULL_ADDRESS
            },
            maxGasPriceWei: DEFAULT_MAX_GAS_PRICE_WEI
          };

          const signedOrder = await getSignedOBOrder(user, chainId, signer, order);
          if (signedOrder) {
            signedOrders.push(signedOrder);
            try {
              await postOrders(user.address, signedOrders);
              toastSuccess('Offer sent successfully');
            } catch (ex) {
              toastError(`${ex}`);
              return false;
            }
          }
        }
        onClose();
      }}
    >
      <div>
        <div className="mb-4">Buy this NFT for the price shown</div>
        <div>
          <CurrencyInput
            autoFocus={true}
            value={price}
            label="Enter offer"
            placeholder=""
            onChange={(value) => {
              setPrice(value);
            }}
          />
        </div>
        <div className="mt-4">
          <DatePickerBox
            placeholder="Expiry date"
            label="Expiry date"
            value={new Date(parseInt(expirationDate.toString()))}
            onChange={(date) => {
              setExpirationDate(date.getTime());
            }}
          />
        </div>
      </div>
    </Modal>
  );
};

import {
  BaseCollection,
  ChainId,
  ChainNFTs,
  OBOrder,
  OBOrderItem,
  OBTokenInfo,
  SignedOBOrder
} from '@infinityxyz/lib-frontend/types/core';
import { getOBComplicationAddress, getTxnCurrencyAddress, trimLowerCase } from '@infinityxyz/lib-frontend/utils';
import React, { ReactNode, useContext, useEffect, useState } from 'react';
import { CollectionTokenCache, TokenFetcherAlt } from 'src/components/astra/token-grid/token-fetcher';
import { Erc721CollectionOffer, Erc721TokenOffer } from 'src/components/astra/types';
import { useCardSelection } from 'src/components/astra/useCardSelection';
import { useCollectionSelection } from 'src/components/astra/useCollectionSelection';
import { useOrderSelection } from 'src/components/astra/useOrderSelection';
import { toastError, toastInfo, toastSuccess, toastWarning } from 'src/components/common';
import { WaitingForTxModal } from 'src/components/orderbook/waiting-for-tx-modal';
import { cancelMultipleOrders } from 'src/utils/exchange/orders';
import {
  CART_TYPE,
  ellipsisAddress,
  extractErrorMsg,
  getCartType,
  getDefaultOrderExpiryTime,
  getEstimatedGasPrice,
  getOrderExpiryTimeInMsFromEnum
} from '../commonUtils';
import { DEFAULT_MAX_GAS_PRICE_WEI, ZERO_ADDRESS } from '../constants';
import { getSignedOBOrder, sendMultipleNfts, sendSingleNft } from '../exchange/orders';
import { useOnboardContext } from '../OnboardContext/OnboardContext';
import { fetchOrderNonce, postOrdersV2 } from '../orderbookUtils';

export type DashboardContextType = {
  collection: BaseCollection | undefined;
  setCollection: (value?: BaseCollection) => void;

  displayName: string;
  setDisplayName: (value: string) => void;

  showCart: boolean;
  setShowCart: (value: boolean) => void;

  listMode: boolean;
  setListMode: (value: boolean) => void;

  numTokens: number;
  setNumTokens: (value: number) => void;

  tokenFetcher: TokenFetcherAlt | undefined;
  setTokenFetcher: (value: TokenFetcherAlt | undefined) => void;

  handleTokenSend: (selection: Erc721TokenOffer[], sendToAddress: string) => Promise<void>;
  handleTokenCheckout: (selection: Erc721TokenOffer[]) => Promise<void>;
  handleCollCheckout: (selection: Erc721CollectionOffer[]) => Promise<void>;
  handleOrdersCancel: (selection: SignedOBOrder[]) => Promise<void>;
  refreshData: () => void;
  refreshTrigger: number;

  toggleSelection: (data: Erc721TokenOffer) => void;
  isSelected: (data: Erc721TokenOffer) => boolean;
  isSelectable: (data: Erc721TokenOffer) => boolean;
  removeFromSelection: (data?: Erc721TokenOffer) => void;
  selection: Erc721TokenOffer[];
  clearSelection: () => void;

  toggleCollSelection: (data: Erc721CollectionOffer) => void;
  isCollSelected: (data: Erc721CollectionOffer) => boolean;
  isCollSelectable: (data: Erc721CollectionOffer) => boolean;
  removeCollFromSelection: (data?: Erc721CollectionOffer) => void; // null to remove all
  collSelection: Erc721CollectionOffer[];
  clearCollSelection: () => void;

  toggleOrderSelection: (data: SignedOBOrder) => void;
  isOrderSelected: (data: SignedOBOrder) => boolean;
  removeOrderFromSelection: (data?: SignedOBOrder) => void; // null to remove all
  orderSelection: SignedOBOrder[];
  clearOrderSelection: () => void;
};

const DashboardContext = React.createContext<DashboardContextType | null>(null);

interface Props {
  children: ReactNode;
}

export const DashboardContextProvider = ({ children }: Props) => {
  const [collection, setCollection] = useState<BaseCollection>();
  const [showCart, setShowCart] = useState(true);
  const [numTokens, setNumTokens] = useState(0);
  const [tokenFetcher, setTokenFetcher] = useState<TokenFetcherAlt | undefined>();
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [listMode, setListMode] = useState(false);
  const [txnHash, setTxnHash] = useState<string>('');

  const [displayName, setDisplayName] = useState<string>('');

  const { getSigner, getEthersProvider, user, chainId, waitForTransaction } = useOnboardContext();

  const { isSelected, isSelectable, toggleSelection, clearSelection, selection, removeFromSelection } =
    useCardSelection();

  const {
    isCollSelected,
    isCollSelectable,
    toggleCollSelection,
    clearCollSelection,
    collSelection,
    removeCollFromSelection
  } = useCollectionSelection();

  const { isOrderSelected, toggleOrderSelection, clearOrderSelection, orderSelection, removeOrderFromSelection } =
    useOrderSelection();

  useEffect(() => {
    refreshData();
  }, []);

  const handleTokenSend = async (nftsToSend: Erc721TokenOffer[], sendToAddress: string) => {
    const orderItems: ChainNFTs[] = [];
    const collectionToTokenMap: { [collection: string]: { tokenId: string; numTokens: number }[] } = {};

    // group tokens by collections
    for (const nftToSend of nftsToSend) {
      const collection = trimLowerCase(nftToSend.address);
      const tokenId = nftToSend.tokenId;
      if (!collection || !tokenId) {
        continue;
      }
      const numTokens = 1;
      const tokens = collectionToTokenMap[collection] ?? [];
      tokens.push({ tokenId, numTokens });
      collectionToTokenMap[collection] = tokens;
    }

    // add to orderItems
    for (const item in collectionToTokenMap) {
      const tokens = collectionToTokenMap[item];
      orderItems.push({
        collection: item,
        tokens
      });
    }

    try {
      if (sendToAddress) {
        const signer = getSigner();
        if (signer) {
          let result;
          if (nftsToSend.length === 1) {
            const nftToSend = nftsToSend[0];
            result = await sendSingleNft(
              signer,
              chainId,
              nftToSend.address ?? nftToSend.tokenAddress ?? '',
              nftToSend.tokenId ?? '',
              sendToAddress
            );
          } else {
            result = await sendMultipleNfts(signer, chainId, orderItems, sendToAddress);
          }
          if (result.hash) {
            setTxnHash(result.hash);
          }
        } else {
          console.error('Signer is null');
        }
      } else {
        toastWarning('To address is blank');
      }
    } catch (err) {
      toastError(extractErrorMsg(err), () => {
        alert(err);
      });
    }
  };

  const handleTokenCheckout = async (tokens: Erc721TokenOffer[]) => {
    const signer = getSigner();
    if (!user || !user.address || !signer) {
      toastError('No logged in user');
    } else {
      console.log('handleTokenCheckout');
      const url = typeof window !== 'undefined' ? window.location.href : '';
      const isBuyCart = getCartType(url) === CART_TYPE.BUY;
      const isSellCart = getCartType(url) === CART_TYPE.SELL;
      const isSendCart = getCartType(url) === CART_TYPE.SEND;

      if (!isSendCart) {
        // place orders
        // first sign orders
        const signedOrders: SignedOBOrder[] = [];
        let orderNonce = await fetchOrderNonce(user.address);
        for (const token of tokens) {
          let order;
          if (isBuyCart) {
            order = await tokenToOBOrder(token, orderNonce, false);
          } else if (isSellCart) {
            order = await tokenToOBOrder(token, orderNonce, true);
          }
          orderNonce += 1;
          if (order) {
            try {
              const signedOrder = await getSignedOBOrder(user, chainId, signer, order);
              if (signedOrder) {
                signedOrders.push(signedOrder);
              }
            } catch (ex) {
              console.error(ex);
              toastError(`${ex}`);
            }
          }
        }

        // post orders
        try {
          if (signedOrders.length > 0) {
            await postOrdersV2(chainId as ChainId, signedOrders);
            toastSuccess('Orders posted');
          }
        } catch (ex) {
          console.error(ex);
          toastError(`${ex}}`);
        }
      }
    }
  };

  const handleCollCheckout = async (collections: Erc721CollectionOffer[]) => {
    const signer = getSigner();
    if (!user || !user.address || !signer) {
      toastError('No logged in user');
    } else {
      // sign orders
      const signedOrders: SignedOBOrder[] = [];
      let orderNonce = await fetchOrderNonce(user.address);
      for (const collection of collections) {
        const order = await collectionToOBOrder(collection, orderNonce);
        orderNonce += 1;
        if (order) {
          try {
            const signedOrder = await getSignedOBOrder(user, chainId, signer, order);
            if (signedOrder) {
              signedOrders.push(signedOrder);
            }
          } catch (ex) {
            console.error(ex);
            toastError(`${ex}`);
          }
        }
      }

      // post orders
      try {
        if (signedOrders.length > 0) {
          await postOrdersV2(chainId as ChainId, signedOrders);
          toastSuccess('Orders posted');
        }
      } catch (ex) {
        console.error(ex);
        toastError(`${ex}}`);
      }
    }
  };

  const tokenToOBOrder = async (
    token: Erc721TokenOffer,
    orderNonce: number,
    isSellOrder: boolean
  ): Promise<OBOrder | undefined> => {
    try {
      let currencyAddress = getTxnCurrencyAddress(chainId);
      if (isSellOrder) {
        currencyAddress = ZERO_ADDRESS; // sell orders are always in ETH
      }
      const gasPrice = await getEstimatedGasPrice(getEthersProvider());
      const ethPrice = token.offerPriceEth ?? 0;
      if (ethPrice === 0) {
        throw new Error('Price is 0');
      }
      const expiry = token.offerExpiry ?? getDefaultOrderExpiryTime();
      const endTimeMs = getOrderExpiryTimeInMsFromEnum(expiry);
      const obTokenInfo: OBTokenInfo = {
        tokenId: token.tokenId ?? '',
        tokenName: token.name ?? '',
        tokenImage: token.image ?? token.cardImage ?? token.imagePreview ?? '',
        numTokens: 1, // always 1 for ERC721
        takerAddress: '',
        takerUsername: '',
        attributes: token.attributes ?? []
      };
      const obOrderItem: OBOrderItem = {
        chainId: token.chainId as ChainId,
        collectionAddress: token.address ?? '',
        collectionName: token.collectionName ?? '',
        collectionImage: '',
        collectionSlug: token.collectionSlug ?? '',
        hasBlueCheck: token.hasBlueCheck ?? false,
        tokens: [obTokenInfo]
      };
      const order: OBOrder = {
        id: '',
        chainId: token.chainId ?? '1',
        isSellOrder,
        makerAddress: user?.address ?? '',
        numItems: 1, // defaulting to one for now; m of n orders not supported in this release via FE
        startTimeMs: Date.now(),
        endTimeMs,
        startPriceEth: ethPrice,
        endPriceEth: ethPrice,
        nfts: [obOrderItem],
        makerUsername: '', // filled in BE
        nonce: orderNonce,
        maxGasPriceWei: gasPrice ?? DEFAULT_MAX_GAS_PRICE_WEI,
        execParams: {
          currencyAddress,
          complicationAddress: getOBComplicationAddress(chainId)
        },
        extraParams: {
          buyer: ''
        }
      };
      return order;
    } catch (err) {
      console.log(err);
    }
  };

  const collectionToOBOrder = async (
    collection: Erc721CollectionOffer,
    orderNonce: number
  ): Promise<OBOrder | undefined> => {
    try {
      const currencyAddress = getTxnCurrencyAddress(chainId);
      const gasPrice = await getEstimatedGasPrice(getEthersProvider());
      const ethPrice = collection.offerPriceEth ?? 0;
      if (ethPrice === 0) {
        throw new Error('Price is 0');
      }
      const expiry = collection.offerExpiry ?? getDefaultOrderExpiryTime();
      const endTimeMs = getOrderExpiryTimeInMsFromEnum(expiry);
      const obOrderItem: OBOrderItem = {
        chainId: collection.chainId as ChainId,
        collectionAddress: collection.address,
        collectionName: collection.metadata.name,
        collectionImage: collection.metadata.profileImage,
        collectionSlug: collection.slug,
        hasBlueCheck: collection.hasBlueCheck,
        tokens: []
      };
      const order: OBOrder = {
        id: '',
        chainId: collection.chainId,
        isSellOrder: false, // collection orders are always buys
        makerAddress: user?.address ?? '',
        numItems: 1, // defaulting to one for now; m of n orders not supported in this release via FE
        startTimeMs: Date.now(),
        endTimeMs,
        startPriceEth: ethPrice,
        endPriceEth: ethPrice,
        nfts: [obOrderItem],
        makerUsername: '', // filled in BE
        nonce: orderNonce,
        maxGasPriceWei: gasPrice ?? DEFAULT_MAX_GAS_PRICE_WEI,
        execParams: {
          currencyAddress,
          complicationAddress: getOBComplicationAddress(chainId)
        },
        extraParams: {
          buyer: ''
        }
      };
      return order;
    } catch (err) {
      console.log(err);
    }
  };

  const handleOrdersCancel = async (ordersToCancel: SignedOBOrder[]) => {
    try {
      const signer = getSigner();
      if (signer) {
        const nonces = ordersToCancel.map((order) => order.nonce);
        const { hash } = await cancelMultipleOrders(signer, chainId, nonces);
        toastSuccess('Sent txn to chain for execution');
        waitForTransaction(hash, () => {
          toastInfo(`Transaction confirmed ${ellipsisAddress(hash)}`);
        });
      } else {
        throw 'Signer is null';
      }
    } catch (err) {
      toastError(extractErrorMsg(err));
    }
  };

  const refreshData = () => {
    CollectionTokenCache.shared().refresh();

    // updating fetchers triggers rebuild
    setRefreshTrigger(refreshTrigger + 1);
  };

  const value: DashboardContextType = {
    collection,
    setCollection,

    showCart,
    setShowCart,

    listMode,
    setListMode,

    numTokens,
    setNumTokens,

    tokenFetcher,
    setTokenFetcher,

    handleTokenSend,
    handleTokenCheckout,
    handleCollCheckout,
    handleOrdersCancel,
    refreshData,
    refreshTrigger,

    // collection name, my nfts, pending etc
    setDisplayName,
    displayName,

    isSelected,
    isSelectable,
    toggleSelection,
    clearSelection,
    selection,
    removeFromSelection,

    isCollSelected,
    isCollSelectable,
    toggleCollSelection,
    clearCollSelection,
    collSelection,
    removeCollFromSelection,

    isOrderSelected,
    toggleOrderSelection,
    clearOrderSelection,
    orderSelection,
    removeOrderFromSelection
  };

  return (
    <DashboardContext.Provider value={value}>
      <>
        {children}{' '}
        {txnHash && <WaitingForTxModal title={'Sending NFTs'} txHash={txnHash} onClose={() => setTxnHash('')} />}
      </>
    </DashboardContext.Provider>
  );
};

export const useDashboardContext = (): DashboardContextType => {
  return useContext(DashboardContext) as DashboardContextType;
};

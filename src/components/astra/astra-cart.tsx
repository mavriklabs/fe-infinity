import { getAddress } from '@ethersproject/address';
import { ChainId } from '@infinityxyz/lib-frontend/types/core';
import { ETHEREUM_WETH_ADDRESS, GOERLI_WETH_ADDRESS } from '@infinityxyz/lib-frontend/utils';
import { useRouter } from 'next/router';
import { ReactNode, useEffect, useState } from 'react';
import { FiEdit3 } from 'react-icons/fi';
import { MdClose } from 'react-icons/md';
import { AButton } from 'src/components/astra/astra-button';
import { EthSymbol, EZImage, Spacer, TextInputBox } from 'src/components/common';
import {
  ellipsisString,
  getCartType,
  getCollectionKeyId,
  getDefaultOrderExpiryTime,
  getTokenCartItemKey,
  nFormatter
} from 'src/utils';
import { useAppContext } from 'src/utils/context/AppContext';
import { CartItem, CartType, useCartContext } from 'src/utils/context/CartContext';
import { ERC721CollectionCartItem, ERC721OrderCartItem, ERC721TokenCartItem, ORDER_EXPIRY_TIME } from 'src/utils/types';
import {
  borderColor,
  brandTextColor,
  extraSmallIconButtonStyle,
  inverseBgColor,
  inverseTextColor,
  secondaryBgColor,
  secondaryTextColor,
  smallIconButtonStyle,
  textColor
} from 'src/utils/ui-constants';
import { twMerge } from 'tailwind-merge';
import { useAccount, useBalance, useNetwork, useProvider } from 'wagmi';
import { ADropdown } from './astra-dropdown';

interface Props {
  onTokensClear: () => void;
  onCollsClear: () => void;
  onOrdersClear: () => void;
  onCollRemove: (coll: ERC721CollectionCartItem) => void;
  onTokenRemove: (token: ERC721TokenCartItem) => void;
  onOrderRemove: (order: ERC721OrderCartItem) => void;
  onCheckout: () => void;
  onTokenSend: (toAddress: string) => void;
}

export const AstraCart = ({
  onTokensClear,
  onCollsClear,
  onOrdersClear,
  onTokenRemove,
  onCollRemove,
  onOrderRemove,
  onCheckout,
  onTokenSend
}: Props) => {
  const router = useRouter();
  const { selectedProfileTab } = useAppContext();
  const [cartTitle, setCartTitle] = useState('Cart');
  const [checkoutBtnText, setCheckoutBtnText] = useState('Checkout');
  const [sendToAddress, setSendToAddress] = useState('');

  const provider = useProvider();
  const { address: user } = useAccount();
  const { chain } = useNetwork();
  const chainId = String(chain?.id ?? 1) as ChainId;

  const { cartType, setCartType, getCurrentCartItems, cartItems } = useCartContext();
  const [currentCartItems, setCurrentCartItems] = useState<CartItem[]>([]);
  const [cartTotal, setCartTotal] = useState(0);

  const [tokenMap, setTokenMap] = useState<Map<string, ERC721TokenCartItem[]>>(new Map());
  const [collMap, setCollMap] = useState<Map<string, ERC721CollectionCartItem[]>>(new Map());
  const [orderMap, setOrderMap] = useState<Map<string, ERC721OrderCartItem[]>>(new Map());

  let cartItemList: ReactNode;
  const [cartContent, setCartContent] = useState<ReactNode>(cartItemList);

  // future-todo change when supporting more chains
  const WETH_ADDRESS =
    chainId === ChainId.Mainnet ? ETHEREUM_WETH_ADDRESS : chainId === ChainId.Goerli ? GOERLI_WETH_ADDRESS : '';

  const { data: wethBalance, isLoading } = useBalance({
    address: user,
    token: WETH_ADDRESS as `0x{string}`
  });

  const { data: ethBalance, isLoading: isEthBalanceLoading } = useBalance({
    address: user
  });

  const finalSendToAddress = async (addr: string) => {
    let finalAddress: string | null = addr;
    if (addr.endsWith('.eth')) {
      finalAddress = (await provider?.resolveName(addr)) ?? '';
    }
    if (finalAddress) {
      return getAddress(finalAddress);
    }
    return '';
  };

  const upateCartItemList = () => {
    let newCartTotal = 0;
    if (
      (cartType === CartType.TokenList || cartType === CartType.TokenOffer || cartType === CartType.Send) &&
      tokenMap.size > 0
    ) {
      const divList: ReactNode[] = [];
      tokenMap.forEach((tokenArray) => {
        const first = tokenArray[0];

        divList.push(
          <div className="w-full font-bold font-heading truncate min-h-[25px]" key={`header-${first.id}`}>
            {first.collectionName}
          </div>
        );

        for (const t of tokenArray) {
          if (cartType !== CartType.Send) {
            const price = t?.orderPriceEth
              ? t?.orderPriceEth
              : t?.orderSnippet?.listing?.orderItem?.startPriceEth
              ? t?.orderSnippet?.listing?.orderItem?.startPriceEth
              : 0;
            newCartTotal += price;
          }
          divList.push(
            <AstraTokenCartItem
              key={getTokenCartItemKey(t)}
              token={t}
              onRemove={onTokenRemove}
              updateCartTotal={(newVal: string, oldVal: string) => {
                newCartTotal += Number(newVal) - Number(oldVal);
                setCartTotal(newCartTotal);
              }}
            />
          );
        }
        divList.push(<div key={Math.random()} className={twMerge('h-2 w-full border-b-[1px]', borderColor)} />);
      });

      // min-w-0 is important. otherwise text doesn't truncate
      cartItemList = (
        <div className={twMerge(textColor, 'min-w-0 flex px-6 flex-col space-y-2 items-start flex-1 overflow-y-auto')}>
          {divList}
        </div>
      );
    } else if (cartType === CartType.CollectionOffer && collMap.size > 0) {
      const divList: ReactNode[] = [];
      collMap.forEach((collArray) => {
        const first = collArray[0];
        const collId = getCollectionKeyId(first);

        for (const t of collArray) {
          newCartTotal += t.offerPriceEth ?? 0;
          divList.push(
            <AstraCollectionCartItem
              key={collId}
              collection={t}
              onRemove={onCollRemove}
              updateCartTotal={(newVal: string, oldVal: string) => {
                newCartTotal += Number(newVal) - Number(oldVal);
                setCartTotal(newCartTotal);
              }}
            />
          );
        }

        divList.push(<div key={Math.random()} className={twMerge('h-2 w-full border-b-[1px]', borderColor)} />);
      });

      // min-w-0 is important. otherwise text doesn't truncate
      cartItemList = (
        <div className={twMerge(textColor, 'min-w-0 flex px-6 flex-col space-y-2 items-start flex-1 overflow-y-auto')}>
          {divList}
        </div>
      );
    } else if (cartType === CartType.Cancel && orderMap.size > 0) {
      const divList: ReactNode[] = [];
      orderMap.forEach((ordArray) => {
        const first = ordArray[0];
        const orderId = first.id;

        divList.push(
          <div className="w-full rounded-md truncate font-bold font-heading min-h-[25px]" key={`header-${first.id}`}>
            {first.nfts.length > 1 ? 'Multiple Collections' : first.nfts[0].collectionName}
          </div>
        );

        for (const t of ordArray) {
          divList.push(<AstraCancelCartItem key={orderId} order={t} onRemove={onOrderRemove} />);
        }

        divList.push(<div key={Math.random()} className={twMerge('h-2 w-full border-b-[1px]', borderColor)} />);
      });

      // min-w-0 is important. otherwise text doesn't truncate
      cartItemList = (
        <div className={twMerge(textColor, 'min-w-0 flex px-6 flex-col space-y-2 items-start flex-1 overflow-y-auto')}>
          {divList}
        </div>
      );
    } else {
      cartItemList = (
        <div key={Math.random()} className={twMerge(textColor, 'flex items-center justify-center uppercase flex-1')}>
          <div className={twMerge('font-medium font-heading', secondaryTextColor)}>Cart empty</div>
        </div>
      );
    }

    setCartTotal(newCartTotal);
  };

  useEffect(() => {
    const cartType = getCartType(router.asPath, selectedProfileTab);
    setCartType(cartType);
  }, [router.pathname, selectedProfileTab]);

  useEffect(() => {
    const cartItems: CartItem[] = getCurrentCartItems();
    setCurrentCartItems(cartItems);

    if (cartType === CartType.TokenList || cartType === CartType.TokenOffer || cartType === CartType.Send) {
      tokenMap.clear();
      for (const item of cartItems) {
        const token = item as ERC721TokenCartItem;
        const tkns = tokenMap.get(token.tokenAddress ?? '') ?? [];
        tkns.push(token);
        tokenMap.set(token.tokenAddress ?? '', tkns);
      }
      setTokenMap(tokenMap);
    }

    if (cartType === CartType.CollectionOffer) {
      collMap.clear();
      for (const item of cartItems) {
        const coll = item as ERC721CollectionCartItem;
        const colls = collMap.get(coll.address ?? '') ?? [];
        colls.push(coll);
        collMap.set(coll.address ?? '', colls);
      }
      setCollMap(collMap);
    }

    if (cartType === CartType.Cancel) {
      orderMap.clear();
      for (const item of cartItems) {
        const order = item as ERC721OrderCartItem;
        const orders = orderMap.get(order.id ?? '') ?? [];
        orders.push(order);
        orderMap.set(order.id ?? '', orders);
      }
      setOrderMap(orderMap);
    }

    // render cart title and checkout button text
    if (cartType === CartType.TokenList) {
      setCartTitle('Sell');
      if (cartItems.length > 1) {
        setCheckoutBtnText('Bulk Sell');
      } else {
        setCheckoutBtnText('Sell');
      }
    } else if (cartType === CartType.CollectionOffer) {
      if (cartItems.length > 1) {
        setCartTitle('Collection Offers');
        setCheckoutBtnText('Place offers');
      } else {
        setCartTitle('Collection Offer');
        setCheckoutBtnText('Place offer');
      }
    } else if (cartType === CartType.TokenOffer) {
      setCartTitle('Buy');
      if (cartItems.length > 1) {
        setCheckoutBtnText('Bulk Buy');
      } else {
        setCheckoutBtnText('Buy');
      }
    } else if (cartType === CartType.Send) {
      setCartTitle('Send');
      if (cartItems.length > 1) {
        setCheckoutBtnText('Bulk Send');
      } else {
        setCheckoutBtnText('Send');
      }
    } else if (cartType === CartType.Cancel) {
      setCartTitle('Cancel');
      if (cartItems.length > 1) {
        setCheckoutBtnText('Cancel Orders');
      } else {
        setCheckoutBtnText('Cancel Order');
      }
    }

    // render cartItemList
    upateCartItemList();
    setCartContent(cartItemList);
  }, [cartType, cartItems, tokenMap.size, collMap.size, orderMap.size]);

  return (
    <div className={twMerge('h-full flex flex-col border-l-[1px]', borderColor)}>
      <div className=" m-4 flex items-center">
        <div className={twMerge(textColor, 'text-3xl lg:text-2xl font-bold font-heading mr-3')}>{cartTitle}</div>

        <div className="flex items-center">
          {currentCartItems.length > 0 && (
            <>
              <div className={twMerge(secondaryBgColor, textColor, 'rounded-full h-6 w-6 text-center mr-1')}>
                {currentCartItems.length}
              </div>
              <div
                className={twMerge('ml-2 text-sm cursor-pointer', brandTextColor)}
                onClick={() => {
                  if (
                    cartType === CartType.Send ||
                    cartType === CartType.TokenList ||
                    cartType === CartType.TokenOffer
                  ) {
                    onTokensClear();
                  } else if (cartType === CartType.CollectionOffer) {
                    onCollsClear();
                  } else if (cartType === CartType.Cancel) {
                    onOrdersClear();
                  }
                }}
              >
                Clear
              </div>
            </>
          )}
        </div>
      </div>

      {cartType === CartType.Send && tokenMap.size > 0 && (
        <div className="px-4 mb-4">
          <TextInputBox
            type="text"
            value={sendToAddress}
            placeholder="Address or ENS"
            onChange={(value) => setSendToAddress(value)}
          />
        </div>
      )}

      {cartContent}

      <div className="m-6 flex flex-col text-sm space-y-2">
        <div>
          <span className={twMerge(secondaryTextColor, 'font-medium')}>Total: </span>
          <span className="font-heading">{nFormatter(Number(cartTotal))} WETH</span>
        </div>
        {user && (
          <div className="space-y-2">
            <div className="">
              <span className={twMerge(secondaryTextColor, 'font-medium')}>WETH Balance: </span>
              {isLoading ? (
                <span>Loading...</span>
              ) : (
                <span className="font-heading">
                  {nFormatter(Number(wethBalance?.formatted))} {EthSymbol}
                </span>
              )}
            </div>

            <div className="">
              <span className={twMerge(secondaryTextColor, 'font-medium')}>ETH Balance: </span>
              {isEthBalanceLoading ? (
                <span>Loading...</span>
              ) : (
                <span className="font-heading">
                  {nFormatter(Number(ethBalance?.formatted))} {EthSymbol}
                </span>
              )}
            </div>
          </div>
        )}
      </div>

      {/* todo: change the chainId check here when more chains are supported */}
      <div className="m-6 flex flex-col">
        <AButton
          className="p-3 z-50"
          primary={true}
          disabled={!user || currentCartItems.length === 0 || (cartType === CartType.Send && !sendToAddress)}
          onClick={async () => {
            cartType === CartType.Send ? onTokenSend(await finalSendToAddress(sendToAddress)) : onCheckout();
          }}
        >
          {checkoutBtnText}
        </AButton>
      </div>
    </div>
  );
};

// ====================================================================

interface Props2 {
  token: ERC721TokenCartItem;
  onRemove: (token: ERC721TokenCartItem) => void;
  updateCartTotal: (prevPrice: string, newPrice: string) => void;
}

const AstraTokenCartItem = ({ token, onRemove, updateCartTotal }: Props2) => {
  const { cartType } = useCartContext();
  const price = token?.orderPriceEth
    ? token?.orderPriceEth.toString()
    : token?.orderSnippet?.listing?.orderItem?.startPriceEth
    ? token?.orderSnippet?.listing?.orderItem?.startPriceEth.toString()
    : '';

  token.orderPriceEth = parseFloat(price);

  const [editedPrice, setEditedPrice] = useState(price);
  const [editing, setEditing] = useState(price ? false : true);

  return (
    <div key={getTokenCartItemKey(token)} className="flex items-center w-full">
      <div className="relative">
        <EZImage className={twMerge('h-12 w-12 rounded-lg overflow-clip')} src={token.image} />
        <div className={twMerge('absolute top-[-5px] right-[-5px] rounded-full p-0.5 cursor-pointer', inverseBgColor)}>
          <MdClose
            className={twMerge(extraSmallIconButtonStyle, inverseTextColor)}
            onClick={() => {
              onRemove(token);
            }}
          />
        </div>
      </div>

      <div className="ml-3 flex w-full space-x-2 items-center">
        <div className="font-bold font-heading w-1/3 text-sm">{ellipsisString(token.tokenId)}</div>
        {cartType !== CartType.Send && (
          <PriceAndExpiry
            token={token}
            className=""
            editing={editing}
            onEditComplete={(newValue) => {
              updateCartTotal(newValue, editedPrice);
              setEditedPrice(newValue);
              setEditing(false);
            }}
            useSpacer
            currentPrice={editedPrice}
          ></PriceAndExpiry>
        )}
        {!editing && cartType !== CartType.Send && (
          <FiEdit3 className={twMerge(smallIconButtonStyle, 'cursor-pointer')} onClick={() => setEditing(true)} />
        )}
      </div>
    </div>
  );
};

interface Props3 {
  collection: ERC721CollectionCartItem;
  onRemove: (coll: ERC721CollectionCartItem) => void;
  updateCartTotal: (prevPrice: string, newPrice: string) => void;
}

const AstraCollectionCartItem = ({ collection, onRemove, updateCartTotal }: Props3) => {
  const [editedPrice, setEditedPrice] = useState(collection.offerPriceEth?.toString());
  const [editing, setEditing] = useState(editedPrice ? false : true);

  return (
    <div key={getCollectionKeyId(collection)} className="flex items-center w-full mt-3">
      <div className="relative">
        <EZImage className={twMerge('h-12 w-12 rounded-lg overflow-clip')} src={collection.metadata.profileImage} />
        <div className={twMerge('absolute top-[-5px] right-[-5px] rounded-full p-0.5 cursor-pointer', inverseBgColor)}>
          <MdClose
            className={twMerge(extraSmallIconButtonStyle, inverseTextColor)}
            onClick={() => {
              onRemove(collection);
            }}
          />
        </div>
      </div>

      <div className="ml-4 flex w-full flex-col space-y-2">
        <div className={twMerge('font-bold font-heading text-sm truncate')}>{collection.metadata.name}</div>
        <div className="flex flex-row items-center">
          <PriceAndExpiry
            collection={collection}
            editing={editing}
            onEditComplete={(newValue) => {
              updateCartTotal(newValue, editedPrice ?? '0');
              setEditedPrice(newValue);
              setEditing(false);
            }}
            currentPrice={editedPrice}
          ></PriceAndExpiry>
          {!editing && (
            <FiEdit3
              className={twMerge(smallIconButtonStyle, 'ml-2 cursor-pointer')}
              onClick={() => setEditing(true)}
            />
          )}
        </div>
      </div>
    </div>
  );
};

interface Props4 {
  order: ERC721OrderCartItem;
  onRemove: (order: ERC721OrderCartItem) => void;
}

const AstraCancelCartItem = ({ order, onRemove }: Props4) => {
  return (
    <div key={order.id} className="flex items-center w-full">
      <div className="relative">
        <EZImage
          className={twMerge('h-12 w-12 rounded-lg overflow-clip')}
          src={order.nfts[0].tokens[0].tokenImage ?? order.nfts[0].collectionImage}
        />
        <div className={twMerge('absolute top-[-5px] right-[-5px] rounded-full p-0.5 cursor-pointer', inverseBgColor)}>
          <MdClose
            className={twMerge(extraSmallIconButtonStyle, inverseTextColor)}
            onClick={() => {
              onRemove(order);
            }}
          />
        </div>
      </div>

      <div className="ml-3 flex flex-col w-full text-sm font-bold font-heading">
        <div>
          {order.nfts.length > 1
            ? 'Multiple tokens'
            : order.nfts[0].tokens.length > 1
            ? 'Multiple tokens'
            : ellipsisString(order.nfts[0].tokens[0].tokenId)}
        </div>
      </div>
    </div>
  );
};

interface Props5 {
  token?: ERC721TokenCartItem;
  collection?: ERC721CollectionCartItem;
  className?: string;
  editing?: boolean;
  onEditComplete?: (price: string) => void;
  useSpacer?: boolean;
  currentPrice?: string;
}

const PriceAndExpiry = ({ token, collection, className, editing, onEditComplete, useSpacer, currentPrice }: Props5) => {
  const [price, setPrice] = useState(currentPrice?.toString() ?? '');
  const [expiry, setExpiry] = useState(getDefaultOrderExpiryTime());

  const priceEditable = !currentPrice || editing;

  return (
    <div className={twMerge('flex flex-row space-x-4 w-full', className)}>
      {!priceEditable ? (
        <div className="flex w-full">
          {useSpacer && <Spacer />}
          <div className={twMerge('flex flex-col items-end')}>
            <div className="flex flex-row">
              <div className={twMerge('font-bold font-heading')}>{price}</div>
              <div className={twMerge('font-bold font-heading ml-1')}>{EthSymbol}</div>
            </div>
            <div className={twMerge(secondaryTextColor, 'text-xs font-medium')}>{expiry}</div>
          </div>
        </div>
      ) : (
        <>
          <ADropdown
            hasBorder={true}
            alignMenuRight={true}
            label={expiry}
            innerClassName="w-24"
            items={[
              {
                label: ORDER_EXPIRY_TIME.HOUR,
                onClick: () => {
                  onEditComplete?.(price);
                  setExpiry(ORDER_EXPIRY_TIME.HOUR);
                  if (token) {
                    token.orderExpiry = ORDER_EXPIRY_TIME.HOUR;
                  } else if (collection) {
                    collection.offerExpiry = ORDER_EXPIRY_TIME.HOUR;
                  }
                }
              },
              {
                label: ORDER_EXPIRY_TIME.DAY,
                onClick: () => {
                  onEditComplete?.(price);
                  setExpiry(ORDER_EXPIRY_TIME.DAY);
                  if (token) {
                    token.orderExpiry = ORDER_EXPIRY_TIME.DAY;
                  } else if (collection) {
                    collection.offerExpiry = ORDER_EXPIRY_TIME.DAY;
                  }
                }
              },
              {
                label: ORDER_EXPIRY_TIME.WEEK,
                onClick: () => {
                  onEditComplete?.(price);
                  setExpiry(ORDER_EXPIRY_TIME.WEEK);
                  if (token) {
                    token.orderExpiry = ORDER_EXPIRY_TIME.WEEK;
                  } else if (collection) {
                    collection.offerExpiry = ORDER_EXPIRY_TIME.WEEK;
                  }
                }
              },
              {
                label: ORDER_EXPIRY_TIME.MONTH,
                onClick: () => {
                  onEditComplete?.(price);
                  setExpiry(ORDER_EXPIRY_TIME.MONTH);
                  if (token) {
                    token.orderExpiry = ORDER_EXPIRY_TIME.MONTH;
                  } else if (collection) {
                    collection.offerExpiry = ORDER_EXPIRY_TIME.MONTH;
                  }
                }
              },
              {
                label: ORDER_EXPIRY_TIME.YEAR,
                onClick: () => {
                  onEditComplete?.(price);
                  setExpiry(ORDER_EXPIRY_TIME.YEAR);
                  if (token) {
                    token.orderExpiry = ORDER_EXPIRY_TIME.YEAR;
                  } else if (collection) {
                    collection.offerExpiry = ORDER_EXPIRY_TIME.YEAR;
                  }
                }
              }
            ]}
          />

          <TextInputBox
            inputClassName="font-heading font-bold"
            className="p-[6.5px]"
            autoFocus={true}
            addEthSymbol={true}
            type="number"
            value={price}
            placeholder=""
            onChange={(value) => {
              setPrice(value);
              if (token) {
                token.orderPriceEth = parseFloat(value);
              } else if (collection) {
                collection.offerPriceEth = parseFloat(value);
              }
            }}
            onEnter={() => {
              onEditComplete?.(price);
            }}
            onMouseLeave={() => {
              onEditComplete?.(price);
            }}
          />
        </>
      )}
    </div>
  );
};

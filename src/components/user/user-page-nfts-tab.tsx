import { CardData } from '@infinityxyz/lib/types/core';
import { useAppContext } from 'src/utils/context/AppContext';
import { useOrderContext } from 'src/utils/context/OrderContext';
import { GalleryBox } from '../gallery/gallery-box';
import { UserProfileDto } from './user-profile-dto';

type Props = {
  userInfo: UserProfileDto;
};

export const UserPageNftsTab = ({ userInfo }: Props) => {
  const { user } = useAppContext();
  const { addCartItem, setOrderDrawerOpen, ordersInCart, cartItems, removeCartItem, updateOrders } = useOrderContext();

  const isAlreadyAdded = (data: CardData | undefined) => {
    // check if this item was already added to cartItems or order.
    const found1 =
      cartItems.find((item) => item.collectionAddress === data?.address && item.tokenId === data.tokenId) !== undefined;
    let found2 = false;
    for (const order of ordersInCart) {
      const foundInOrder = order.cartItems.find(
        (item) => item.collectionAddress === data?.address && item.tokenId === data.tokenId
      );
      if (foundInOrder) {
        found2 = true;
        break;
      }
    }
    return found1 || found2;
  };

  // find & remove this item in cartItems & all orders' cartItems:
  const findAndRemove = (data: CardData | undefined) => {
    const foundItemIdx = cartItems.findIndex(
      (item) => item.collectionAddress === data?.address && item.tokenId === data?.tokenId
    );
    removeCartItem(cartItems[foundItemIdx]);
    ordersInCart.forEach((order) => {
      order.cartItems = order.cartItems.filter(
        (item) => !(item.collectionAddress === data?.address && item.tokenId === data?.tokenId)
      );
    });
    updateOrders(ordersInCart.filter((order) => order.cartItems.length > 0));
  };

  const isMyProfile = user?.address === userInfo.address;
  return (
    <div>
      <div className="mt-20">
        <GalleryBox
          pageId="PROFILE"
          getEndpoint={`/user/${userInfo?.address}/nfts`}
          userAddress={userInfo?.address}
          filterShowedDefault={false}
          showFilterSections={['COLLECTIONS']}
          cardProps={
            isMyProfile
              ? {
                  cardActions: [
                    {
                      label: (data) => {
                        if (isAlreadyAdded(data)) {
                          return <div className="font-normal">✓ Added</div>;
                        }
                        return <div className="font-bold">List</div>;
                      },
                      onClick: (ev, data) => {
                        if (isAlreadyAdded(data)) {
                          findAndRemove(data);
                          return;
                        }
                        addCartItem({
                          collectionName: data?.collectionName ?? '(no name)',
                          collectionAddress: data?.tokenAddress ?? '(no address)',
                          tokenImage: data?.image ?? '',
                          tokenName: data?.name ?? '(no name)',
                          tokenId: data?.tokenId ?? '0',
                          isSellOrder: true
                        });
                        if (cartItems.length < 1) {
                          setOrderDrawerOpen(true); // only show when adding the first time.
                        }
                      }
                    }
                  ]
                }
              : undefined
          }
          className="mt-[-82px]"
        />
      </div>
    </div>
  );
};

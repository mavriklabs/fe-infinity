import { SignedOBOrder } from '@infinityxyz/lib-frontend/types/core';
import { Button, SVG, Spacer, toastSuccess, toastError, Divider, toastInfo } from 'src/components/common';
import { ellipsisAddress, extractErrorMsg } from 'src/utils';
import { cancelMultipleOrders } from 'src/utils/exchange/orders';
import { useOnboardContext } from 'src/utils/OnboardContext/OnboardContext';
import { drawerPx, iconButtonStyle } from 'src/utils/ui-constants';
import { twMerge } from 'tailwind-merge';
import { Drawer } from '../../common/drawer';
import { OrderbookItem } from '../orderbook-list/orderbook-item';

interface Props {
  open: boolean;
  onClose: () => void;
  orders: SignedOBOrder[];
  onClickRemove: (order: SignedOBOrder) => void;
}

export const CancelDrawer = ({ open, onClose, orders, onClickRemove }: Props) => {
  const { getSigner, chainId, waitForTransaction } = useOnboardContext();

  const doCancel = async () => {
    try {
      const signer = getSigner();
      if (signer) {
        const nonces = orders.map((order) => order.nonce);
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

  return (
    <>
      <Drawer
        open={open}
        onClose={onClose}
        subtitle={'Cancel these orders in one transaction'}
        title={<div className="flex items-center">Cancel Orders</div>}
      >
        <div className="flex flex-col h-full">
          <div className={twMerge(drawerPx, 'overflow-y-auto content-between')}>
            {orders.map((order: SignedOBOrder) => {
              return (
                <div key={order.id} className="py-3 flex">
                  <div className="w-full flex justify-between">
                    <div className="flex-1">
                      <OrderbookItem nameItem={true} key={`${order.id} ${order.chainId}`} order={order} />
                    </div>
                    <button onClick={() => onClickRemove(order)}>
                      <SVG.grayDelete className={iconButtonStyle} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
          <Spacer />

          <footer className="w-full text-center py-4">
            <Divider className="mb-10" />

            <Button size="large" onClick={doCancel}>
              Cancel Orders
            </Button>
          </footer>
        </div>
      </Drawer>
    </>
  );
};

import { SignedOBOrder } from '@infinityxyz/lib-frontend/types/core';
import React from 'react';
import { Button, Modal, SimpleTable, SimpleTableItem } from 'src/components/common';
import { secondaryTextColor } from 'src/utils/ui-constants';
import { twMerge } from 'tailwind-merge';
import { OrderDetailPicker } from './order-detail-picker';

interface Props {
  order: SignedOBOrder;
  isOpen: boolean;
  onClose: () => void;
}

export const OrderDetailModal = ({ order, isOpen, onClose }: Props) => {
  const tableItems: SimpleTableItem[] = [
    {
      title: <div className="">Type</div>,
      value: <div className="font-heading">{order.isSellOrder ? 'Listing' : 'Offer'}</div>
    },
    {
      title: <div className="">Price</div>,
      value: <div className="font-heading">{order.startPriceEth}</div>
    },
    {
      title: <div className=""># NFTs</div>,
      value: <div className="font-heading">{order.numItems}</div>
    },
    {
      title: <div className="">Expiry date</div>,
      value: <div className="font-heading">{new Date(order.endTimeMs).toLocaleString()}</div>
    }
  ];

  return (
    <Modal wide={false} isOpen={isOpen} onClose={onClose} title="Order details" showActionButtons={false}>
      <div className="max-h-[480px] flex flex-col">
        <OrderDetailPicker order={order} scroll={true} />

        <SimpleTable className={twMerge(secondaryTextColor, 'mt-3')} items={tableItems} />

        <div className="mt-10">
          <Button variant="primary" className="w-full font-heading" onClick={onClose}>
            Done
          </Button>
        </div>
      </div>
    </Modal>
  );
};
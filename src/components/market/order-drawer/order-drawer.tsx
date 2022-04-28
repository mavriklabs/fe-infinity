import {
  Spacer,
  Divider,
  TooltipSpec,
  EthPrice,
  Button,
  Drawer,
  SimpleTable,
  SimpleModal
} from 'src/components/common';
import { useOrderContext } from 'src/utils/context/OrderContext';
import { OrderBuilder } from './order-builder';
import { OrderSummary } from './order-summary';
import { useState } from 'react';
import { AiOutlineCheckCircle } from 'react-icons/ai';
import { numStr } from 'src/utils';
interface Props {
  open: boolean;
  onClose: () => void;
}

export const OrderDrawer = ({ open, onClose }: Props) => {
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const {
    isSellOrderCart,
    addOrderToCart,
    readyToCheckout,
    isOrderStateEmpty,
    isOrderBuilderEmpty,
    executeOrder,
    ordersInCart,
    isEditingOrder
  } = useOrderContext();

  const emptyCart = (
    <div className="flex h-full justify-center content-center items-center text-sm">
      <div className="text-center">
        <span className="text-lg font-semibold">Cart is empty</span>
        <br />
        Add an item to the order.
      </div>
    </div>
  );

  const buildFooter = (buttonClick: () => void) => {
    let buttonTitle = 'Add order to cart';
    let topWidget;

    if (readyToCheckout()) {
      buttonTitle = 'Checkout';

      const items = [];

      let totalEth = 0;
      let totalNFTs = 0;

      for (const orderInCart of ordersInCart) {
        totalEth = totalEth + orderInCart.orderSpec.endPriceEth;
        totalNFTs = totalNFTs + orderInCart.orderSpec.numItems;
      }

      if (isSellOrderCart()) {
        items.push({
          title: 'Min total sale price',
          value: <EthPrice label={numStr(totalEth)} />
        });
        items.push({ title: 'Max NFTs to sell', value: <div>{totalNFTs.toString()}</div> });
      } else {
        items.push({
          title: 'Max budget',
          value: <EthPrice label={numStr(totalEth)} />
        });
        items.push({ title: 'Min NFTs to buy', value: <div>{totalNFTs.toString()}</div> });
      }

      topWidget = <SimpleTable items={items} className="mb-6  px-12" />;
    } else {
      if (isEditingOrder) {
        buttonTitle = 'Update order';
      }
    }

    return (
      <div className="flex flex-col mb-8">
        <Divider className="mb-10" />

        {topWidget}
        <div className="px-12 mb-4 w-full">
          <Button size="large" className="w-full" onClick={buttonClick}>
            {buttonTitle}
          </Button>
        </div>
      </div>
    );
  };

  let contents;
  let title = 'Create order';
  let footer;
  let tooltip: TooltipSpec | undefined;

  if (isOrderStateEmpty()) {
    contents = emptyCart;
  } else if (readyToCheckout()) {
    // ready to checkout, we have an order
    title = 'Cart';
    tooltip = { title: '(tooltip goes here)', content: '(tooltip goes here)' };
    footer = buildFooter(async () => {
      if (await executeOrder()) {
        setShowSuccessModal(true);
      }
    });

    contents = (
      <>
        <div className="flex flex-col px-12 space-y-2">
          <OrderSummary />
        </div>

        <Spacer />

        {footer}
      </>
    );
  } else if (!isOrderBuilderEmpty()) {
    // an order is being built, so let them finish it
    title = isSellOrderCart() ? 'Sell Order' : 'Buy order';
    tooltip = isSellOrderCart()
      ? { title: 'Sell order', content: 'Selected NFT(s) will be automatically sold when there’s a matching buy order' }
      : {
          title: 'Buy order',
          content:
            'Any NFT(s) from selected collections will be automatically bought when there’s a matching sell order'
        };

    footer = buildFooter(() => {
      addOrderToCart();
    });

    contents = (
      <>
        <div className="flex flex-col px-12 space-y-2">
          <OrderBuilder />
        </div>

        <Spacer />

        {footer}
      </>
    );
  }

  return (
    <>
      <SimpleModal
        dialogWidth="max-w-sm"
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        showActionButtons={false}
        titleChildren={
          <div>
            <AiOutlineCheckCircle className="h-12 w-12" />
          </div>
        }
      >
        <div className="flex flex-col modal-body p-4 rounded-3xl">
          <div className="font-bold text-xlg">Thank you,</div>
          <div className="font-bold mb-6 text-xlg">Order Submitted</div>
          <div>Confirmation: 234234</div>
          <Button className="mt-6" onClick={() => setShowSuccessModal(false)}>
            Done
          </Button>
        </div>
      </SimpleModal>

      <Drawer open={open} onClose={onClose} title={title} tooltip={tooltip}>
        {contents}
      </Drawer>
    </>
  );
};

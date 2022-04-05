import { formatEther } from 'ethers/lib/utils';
import { RiEditCircleFill } from 'react-icons/ri';
import { Button, Spacer } from 'src/components/common';
import { EthPrice } from 'src/components/common/eth-price';
import { useOrderContext } from 'src/utils/context/OrderContext';
import { bigNumToDate } from 'src/utils/marketUtils';
import { SimpleTable, SimpleTableItem } from './simple-table';
import { collectionIconHeight, collectionIconStyle, collectionIconWidthInPx } from './ui-constants';

export function OrderSummary() {
  const { isSellOrderCart, buyCartItems, setOrder, sellCartItems, order } = useOrderContext();

  const cartItems = isSellOrderCart() ? sellCartItems : buyCartItems;

  let leftOffset = 0;
  const iconStack = cartItems.map((item, index) => {
    const whiteBoxLeft = leftOffset;
    const iconLeft = leftOffset + (index === 0 ? 0 : 2);

    leftOffset = iconLeft + 4;

    return (
      <>
        <div
          key={item.collectionAddress + 'blank'}
          className={`absolute ${collectionIconStyle} bg-white`}
          style={{ left: whiteBoxLeft }}
        />

        <img
          key={item.collectionAddress}
          className={`absolute ${collectionIconStyle}`}
          src={item.imageUrl}
          alt=""
          style={{ left: iconLeft }}
        />
      </>
    );
  });

  const iconWidth = collectionIconWidthInPx();

  const collectionIcons = (
    <div className={`relative ${collectionIconHeight} mb-4 w-full flex items-center`}>
      <div className={`${collectionIconHeight}`} style={{ width: `${iconWidth + (cartItems.length - 1) * 4}px` }}>
        {iconStack}
      </div>

      <div className="ml-4">{`${cartItems.length} Collections`}</div>

      <Spacer />

      <Button variant="ghost" size="small" onClick={() => setOrder(undefined)}>
        <RiEditCircleFill className="h-5 w-5" />
      </Button>
    </div>
  );

  const items: SimpleTableItem[] = [];
  let header;

  if (isSellOrderCart()) {
    items.push({
      title: 'Max spending',
      value: <EthPrice label={formatEther(order?.endPrice ?? 0)} />
    });
    items.push({ title: 'Min NFTs to buy', value: <div>{order?.numItems}</div> });
    items.push({ title: 'Start Date', value: <div>{bigNumToDate(order?.startTime ?? 0).toLocaleString()}</div> });
    items.push({ title: 'Expiration Date', value: <div>{bigNumToDate(order?.endTime ?? 0).toLocaleString()}</div> });

    header = (
      <div>
        <div>Sell Order</div>
      </div>
    );
  } else {
    items.push({
      title: 'Max spending',
      value: <EthPrice label={formatEther(order?.endPrice ?? 0)} />
    });
    items.push({ title: 'Min NFTs to buy', value: <div>{order?.numItems}</div> });
    items.push({ title: 'Start Date', value: <div>{bigNumToDate(order?.startTime ?? 0).toLocaleString()}</div> });
    items.push({ title: 'Expiration Date', value: <div>{bigNumToDate(order?.endTime ?? 0).toLocaleString()}</div> });

    header = (
      <div>
        <div>Buy Order</div>
      </div>
    );
  }

  return (
    <>
      {collectionIcons}
      {header}
      <SimpleTable items={items} />
    </>
  );
}

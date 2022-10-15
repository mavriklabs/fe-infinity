import React, { useState } from 'react';
import { SignedOBOrder } from '@infinityxyz/lib-frontend/types/core';
import { Button, CenteredContent, Dropdown, ScrollLoader, Spinner } from 'src/components/common';
import { OrderbookProvider, SORT_FILTERS, useOrderbook } from '../OrderbookContext';
import { OrderbookRow } from './orderbook-row';
import { OrderbookFilters } from './filters/orderbook-filters';

const SORT_LABELS: {
  [key: string]: string;
} = {
  [SORT_FILTERS.highestPrice]: 'Highest Price',
  [SORT_FILTERS.lowestPrice]: 'Lowest Price',
  [SORT_FILTERS.mostRecent]: 'Most Recent'
};

const getSortLabel = (key: string | undefined) => {
  return key ? SORT_LABELS[key] || 'Sort' : 'Sort';
};

interface Props {
  collectionId?: string;
  tokenId?: string;
  className?: string;
}

export const OrderbookContainer = ({ collectionId, tokenId, className = '' }: Props): JSX.Element => {
  return (
    <OrderbookProvider collectionId={collectionId} tokenId={tokenId}>
      <OrderbookContent className={className} />
    </OrderbookProvider>
  );
};

interface Props4 {
  className?: string;
}

export const OrderbookContent = ({ className }: Props4) => {
  // const { query } = useRouter();
  const { orders, fetchMore, isLoading, updateFilter, filters, hasMoreOrders, hasNoData } = useOrderbook();
  const [showFilters, setShowFilters] = useState<boolean>(
    true
    // query.orderTypes || query.collections || query.minPrice || query.maxPrice || query.numberOfNfts ? true : false
  );
  const [label, setLabel] = useState<string>(getSortLabel(filters?.sort));

  const onClickSort = (_label: string, sortOrder: string) => {
    setLabel(_label);
    updateFilter('sort', sortOrder);
  };

  return (
    <>
      <div className={`flex flex-col gap-1 min-h-[50vh] ${className}`}>
        <div className="gap-3 flex justify-end pb-8">
          <Button
            variant="outline"
            onClick={() => {
              setShowFilters(!showFilters);
            }}
            className="pointer-events-auto"
          >
            {showFilters ? 'Hide' : 'Show'} filter
          </Button>
          <Dropdown
            alignMenuRight={true}
            label={label}
            items={[
              {
                label: SORT_LABELS[SORT_FILTERS.highestPrice],
                onClick: () => onClickSort(SORT_LABELS[SORT_FILTERS.highestPrice], SORT_FILTERS.highestPrice)
              },
              {
                label: SORT_LABELS[SORT_FILTERS.lowestPrice],
                onClick: () => onClickSort(SORT_LABELS[SORT_FILTERS.lowestPrice], SORT_FILTERS.lowestPrice)
              },
              {
                label: SORT_LABELS[SORT_FILTERS.mostRecent],
                onClick: () => onClickSort(SORT_LABELS[SORT_FILTERS.mostRecent], SORT_FILTERS.mostRecent)
              }
            ]}
            className="pointer-events-auto"
          />
        </div>

        <OrderbookList
          orderList={orders}
          showFilters={showFilters}
          isLoading={isLoading}
          fetchMore={fetchMore}
          hasMoreOrders={hasMoreOrders}
          hasNoData={hasNoData}
        />
      </div>
    </>
  );
};

// ========================================================================

interface Props2 {
  orderList: SignedOBOrder[];
  isLoading: boolean;
  fetchMore: () => void;
  showFilters?: boolean;
  hasMoreOrders?: boolean;
  hasNoData?: boolean;
}

const OrderbookList = ({
  orderList,
  showFilters,
  isLoading,
  fetchMore,
  hasMoreOrders,
  hasNoData
}: Props2): JSX.Element => {
  return (
    <div className="flex gap-4 pointer-events-auto">
      {showFilters && (
        <div className="w-1/5 shrink-0">
          <OrderbookFilters />
        </div>
      )}
      <div className="flex flex-col items-start w-full">
        {hasNoData && <div className="font-heading">No results found</div>}

        {orderList.length > 0 &&
          orderList.map((order: SignedOBOrder, i: number) => {
            return <OrderbookRow key={`${i}-${order.id}`} order={order} isFilterOpen={showFilters ?? false} />;
          })}

        {isLoading && (
          <CenteredContent>
            <Spinner />
          </CenteredContent>
        )}

        {hasMoreOrders && <ScrollLoader onFetchMore={fetchMore} />}
      </div>
    </div>
  );
};

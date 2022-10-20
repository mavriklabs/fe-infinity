import React, { ReactNode, useEffect, useState } from 'react';
import { apiGet, ITEMS_PER_PAGE } from 'src/utils';
import { useIsMounted } from 'src/hooks/useIsMounted';
import { OrderCache } from '../orderbook/order-cache';
import { BaseCollection } from '@infinityxyz/lib-frontend/types/core/Collection';
import { nftsToCardData } from './token-fetcher';
import { ERC721CardData } from '@infinityxyz/lib-frontend/types/core/NftInterface';

type ReservoirContextType = {
  cardData: ERC721CardData[]; // NftDto[]; why?
  isLoading: boolean;
  fetchOrders: (refreshData: boolean) => void;
  hasMoreOrders: boolean;
  hasNoData: boolean;
};

const ReservoirContext = React.createContext<ReservoirContextType | null>(null);

const orderCache = new OrderCache();

interface Props {
  children: ReactNode;
  collection: BaseCollection;
  limit?: number;
}

export const ReservoirProvider = ({ children, collection, limit = ITEMS_PER_PAGE }: Props) => {
  const [cardData, setCardData] = useState<ERC721CardData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMoreOrders, setHasMoreOrders] = useState<boolean>(false);
  const [hasNoData, setHasNoData] = useState<boolean>(false);
  const [cursor, setCursor] = useState<string>('');
  const isMounted = useIsMounted();

  useEffect(() => {
    setIsLoading(true);
    fetchOrders(true);
  }, [collection]);

  const fetchOrders = async (refreshData = false) => {
    try {
      // eslint-disable-next-line
      const query: any = {
        limit: limit,
        orderBy: 'price',
        orderDirection: 'asc',
        cursor: refreshData ? '' : cursor,
        collection: collection.address
      };

      const cacheKey = JSON.stringify(query);

      // use cached value if exists
      let response = orderCache.get(cacheKey);
      if (!response) {
        const getUrl = `/collections/${collection.chainId}:${collection.address}/reservoir/nfts`;

        response = await apiGet(getUrl, {
          query
        });

        // save in cache
        orderCache.set(cacheKey, response);
      }

      if (isMounted()) {
        if (response && response.result?.data) {
          let newData;
          const newCardData = nftsToCardData(response.result.data, collection.address, collection.metadata.name);

          if (refreshData) {
            newData = [...newCardData];
          } else {
            newData = [...cardData, ...newCardData];
          }

          setCardData(newData);
          setHasNoData(newData.length === 0);

          setHasMoreOrders(response.result.hasNextPage);
          setCursor(response.result.cursor);
        }
      }
    } catch (err) {
      console.error(err);
    } finally {
      if (isMounted()) {
        setIsLoading(false);
      }
    }
  };

  const value: ReservoirContextType = {
    cardData,
    isLoading,
    fetchOrders,
    hasMoreOrders,
    hasNoData
  };

  return <ReservoirContext.Provider value={value}>{children}</ReservoirContext.Provider>;
};

export const useReservoir = () => {
  return React.useContext(ReservoirContext) as ReservoirContextType;
};

import { BaseCollection, ERC721CardData, Erc721Token, OrdersSnippet } from '@infinityxyz/lib-frontend/types/core';
import { useEffect, useState } from 'react';
import { ITEMS_PER_PAGE } from 'src/utils/constants';
import { useFilterContext } from 'src/utils/context/FilterContext';
import { apiGet, ApiError } from 'src/utils/apiUtils';
import { Button, Card, CardProps, ScrollLoader } from 'src/components/common';
import { FilterPanel } from '../filter/filter-panel';
import { GallerySort } from './gallery-sort';
import { twMerge } from 'tailwind-merge';
import { useResizeDetector } from 'react-resize-detector';
import { useAppContext } from 'src/utils/context/AppContext';
import { useRouter } from 'next/router';

type ApiNftData = Erc721Token & {
  collectionAddress?: string;
  collectionName?: string;
  collectionSlug?: string;
  orderSnippet?: OrdersSnippet;
};

interface GalleryProps {
  collection?: BaseCollection | null;
  cardProps?: CardProps;
  getEndpoint?: string;
  className?: string;
  filterShowedDefault?: boolean;
  pageId?: 'COLLECTION' | 'PROFILE' | undefined;
  showFilterSections?: string[];
  showSort?: boolean;
  userAddress?: string; // for User's NFTs and User's Collection Filter
}

export const GalleryBox = ({
  collection,
  className,
  cardProps,
  getEndpoint,
  pageId,
  filterShowedDefault,
  showFilterSections,
  showSort = true,
  userAddress = ''
}: GalleryProps) => {
  const { chainId } = useAppContext();
  const router = useRouter();
  const { filterState } = useFilterContext();

  const [filterShowed, setFilterShowed] = useState(filterShowedDefault);
  const [isFetching, setIsFetching] = useState(false);
  const [data, setData] = useState<ERC721CardData[]>([]);
  const [error, setError] = useState<ApiError>(null);
  const [cursor, setCursor] = useState('');
  const [currentPage, setCurrentPage] = useState(-1);
  const [dataLoaded, setDataLoaded] = useState(false);

  const [gridWidth, setGridWidth] = useState(0);

  const { width, ref } = useResizeDetector();

  useEffect(() => {
    setGridWidth(ref.current ? ref.current.offsetWidth : 0);
  }, [width]);

  const fetchData = async (isRefresh = false) => {
    if (!getEndpoint) {
      return;
    }
    setIsFetching(true);
    let newCurrentPage = currentPage + 1;
    let newCursor = cursor;
    if (isRefresh) {
      newCurrentPage = 0;
      newCursor = '';
    }

    const offset = currentPage > 0 ? currentPage * ITEMS_PER_PAGE : 0;
    if (pageId === 'COLLECTION' && !filterState.orderBy) {
      filterState.orderBy = 'rarityRank'; // set defaults
      filterState.orderDirection = 'asc';
    }
    if (pageId === 'PROFILE') {
      delete filterState.orderBy;
      delete filterState.orderDirection;
    }

    const { result, error } = await apiGet(getEndpoint, {
      query: {
        chainId,
        offset,
        limit: ITEMS_PER_PAGE,
        cursor: newCursor,
        ...filterState
      }
    });
    if (error) {
      setError(error);
    }
    setCursor(result?.cursor);

    let moreData: ERC721CardData[] = (result?.data || []).map((item: ApiNftData) => {
      return {
        id: collection?.address + '_' + item.tokenId,
        name: item.metadata?.name,
        title: item.collectionName ?? collection?.metadata?.name,
        collectionName: item.collectionName ?? collection?.metadata?.name,
        collectionSlug: item.collectionSlug ?? '',
        description: item.metadata?.description ?? '',
        image: item?.image?.url,
        price: item?.orderSnippet?.listing?.orderItem?.startPriceEth ?? 0,
        chainId: item.chainId,
        tokenAddress: item.collectionAddress ?? collection?.address,
        address: item.collectionAddress ?? collection?.address,
        tokenId: item.tokenId,
        rarityRank: item.rarityRank,
        orderSnippet: item.ordersSnippet,
        hasBlueCheck: item.hasBlueCheck ?? false,
        attributes: item.metadata?.attributes ?? []
      } as ERC721CardData;
    });

    // remove any without tokenAddress (seeing bad NFTs in my profile)
    moreData = moreData.filter((x) => x.tokenAddress);

    setIsFetching(false);
    if (isRefresh) {
      setData([...moreData]);
    } else {
      if (result?.cursor !== cursor) {
        setData([...data, ...moreData]);
      }
    }
    setCurrentPage(newCurrentPage);
  };

  useEffect(() => {
    setData([]);
    setCursor('');
    fetchData(true); // refetch data when filterState changed somewhere (ex: from Sort comp, etc.)
  }, [getEndpoint, filterState, router.query]);

  useEffect(() => {
    if (currentPage < 0 || data.length < currentPage * ITEMS_PER_PAGE) {
      return;
    }
    setDataLoaded(true); // current page's data loaded & rendered.
  }, [currentPage]);

  let gridColumns = 'grid-cols-2';
  let cardHeight = 310;

  if (gridWidth > 0) {
    const cols = Math.round(gridWidth / cardHeight);
    gridColumns = `repeat(${cols}, minmax(0, 1fr))`;

    const w = gridWidth / cols;
    cardHeight = w * 1.2;
  }

  return (
    <div className={twMerge(className, 'flex flex-col')}>
      <div className="sm:col-span-2 lg:col-span-3 xl:col-span-4 text-right mt-[-73px] pointer-events-none">
        <Button
          variant="outline"
          onClick={() => {
            setFilterShowed((flag) => !flag);
          }}
          className="py-2.5 mr-2 font-heading pointer-events-auto"
        >
          {filterShowed ? 'Hide' : 'Show'} filter
        </Button>
        {showSort ? <GallerySort /> : null}
      </div>

      <div className={twMerge(className, 'flex items-start mt-[60px]')}>
        {filterShowed && (
          <div className="mt-4">
            <FilterPanel
              collection={collection as BaseCollection}
              collectionAddress={collection?.address}
              showFilterSections={showFilterSections}
              userAddress={userAddress}
            />
          </div>
        )}

        <div
          ref={ref}
          className={twMerge('w-full grid gap-12 pointer-events-none')}
          style={{ gridTemplateColumns: gridColumns }}
        >
          {isFetching && cursor === '' && (
            <>
              <Card height={cardHeight} isLoading={true} />

              <Card height={cardHeight} isLoading={true} />

              <Card height={cardHeight} isLoading={true} />

              <Card height={cardHeight} isLoading={true} />
            </>
          )}

          {!isFetching && error ? <div className="mt-24">Unable to load data.</div> : null}

          {!error && !isFetching && data.length === 0 ? <div>No results found.</div> : null}

          {data.map((item, idx) => {
            return (
              <Card key={`${item.address}_${item.tokenId}_${idx}`} height={cardHeight} data={item} {...cardProps} />
            );
          })}

          {/* <div className="h-[10vh]">&nbsp;</div> */}

          {dataLoaded && (
            <ScrollLoader
              onFetchMore={async () => {
                // setDataLoaded(false);
                await fetchData();
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

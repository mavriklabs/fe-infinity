import { BaseCollection, BaseToken, CardData } from '@infinityxyz/lib/types/core';
import React, { useState, useEffect } from 'react';
import { useResizeDetector } from 'react-resize-detector';
import { FetchMore, CenteredContent, Spinner } from 'src/components/common';
import { apiGet, DEFAULT_LIMIT } from 'src/utils';
import { Filter } from 'src/utils/context/FilterContext';
import { twMerge } from 'tailwind-merge';
import { NFTArray } from '../../utils/types/collection-types';
import { TokenCard } from './token-card';

// =========================================================================

const fetchTokens = async (collectionAddress: string, chainId: string, cursor: undefined | string) => {
  const filterState: Filter = {};

  filterState.orderBy = 'rarityRank'; // set defaults
  filterState.orderDirection = 'asc';

  const API_ENDPOINT = `/collections/${chainId}:${collectionAddress}/nfts`;
  const response = await apiGet(API_ENDPOINT, {
    query: {
      limit: DEFAULT_LIMIT,
      cursor,
      ...filterState
    }
  });

  return response;
};

// ==============================================================

interface Props2 {
  collection: BaseCollection;
  chainId: string;
  className?: string;
  onClick?: (data: CardData) => void;
  isSelected: (data: CardData) => boolean;
}

export const TokensGrid = ({ collection, chainId, className = '', onClick, isSelected }: Props2) => {
  const [tokens, setTokens] = useState<BaseToken[]>([]);
  const [error, setError] = useState(false);
  const [gridWidth, setGridWidth] = useState(0);
  const [cursor, setCursor] = useState<string>('');
  const [hasNextPage, setHasNextPage] = useState(false);
  const [loading, setLoading] = useState(false);

  const { width, ref } = useResizeDetector();

  useEffect(() => {
    setGridWidth(ref.current ? ref.current.offsetWidth : 0);
  }, [width]);

  useEffect(() => {
    setTokens([]);
    setLoading(true);
    handleFetch('');
  }, [collection]);

  const handleFetch = async (passedCursor: string) => {
    const response = await fetchTokens(collection.address, chainId, passedCursor);

    if (response.error) {
      setError(response.error);
      setTokens([]);
      setCursor('');
      setHasNextPage(false);
    } else {
      const result = response.result as NFTArray;
      if (passedCursor) {
        setTokens([...tokens, ...result.data]);
      } else {
        setTokens(result.data);
      }
      setCursor(result.cursor);
      setHasNextPage(result.hasNextPage);
    }

    setLoading(false);
  };

  if (error) {
    console.error(error);
    return (
      <div className={className}>
        <div>Unable to load data.</div>
      </div>
    );
  }

  let gridColumns = 'grid-cols-2';
  if (gridWidth > 0) {
    const cols = Math.round(gridWidth / 250);
    gridColumns = `repeat(${cols}, minmax(0, 1fr))`;
  }

  let contents;

  if (loading) {
    contents = (
      <CenteredContent>
        <Spinner />
      </CenteredContent>
    );
  } else {
    contents = (
      <>
        <div className={twMerge('grid gap-x-8 gap-y-12 ')} style={{ gridTemplateColumns: gridColumns }}>
          {tokens.map((token) => {
            const data: CardData = {
              id: collection?.address + '_' + token.tokenId,
              name: token.metadata?.name,
              collectionName: collection?.metadata?.name,
              title: collection?.metadata?.name,
              description: token.metadata.description,
              image: token.image.url,
              price: 0,
              chainId: token.chainId,
              tokenAddress: collection?.address,
              tokenId: token.tokenId,
              rarityRank: token.rarityRank,
              orderSnippet: token.ordersSnippet
            };

            return (
              <TokenCard
                key={data.id}
                data={data}
                selected={isSelected(data)}
                onClick={(data) => {
                  if (onClick) {
                    return onClick(data);
                  }
                }}
              />
            );
          })}
        </div>
        {hasNextPage && <FetchMore onFetchMore={() => handleFetch(cursor)} />}
      </>
    );
  }

  return (
    <div ref={ref} className={twMerge('h-full w-full', className)}>
      {contents}
    </div>
  );
};

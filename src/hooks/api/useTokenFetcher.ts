import { BaseToken, Erc721Token, OrdersSnippet } from '@infinityxyz/lib-frontend/types/core';
import { useState } from 'react';
import { useIsMounted } from 'src/hooks/useIsMounted';
import { ApiResponse } from 'src/utils';
import { fetchCollectionTokens, fetchProfileTokens } from 'src/utils/astra-utils';
import { CartType } from 'src/utils/context/CartContext';
import { useOnboardContext } from 'src/utils/context/OnboardContext/OnboardContext';
import { ERC721TokenCartItem, TokensFilter } from 'src/utils/types';

type ApiNftData = Erc721Token & {
  orderSnippet?: OrdersSnippet;
};

export function useCollectionTokenFetcher(collectionAddress: string | undefined, filter: TokensFilter) {
  const { chainId } = useOnboardContext();

  return useTokenFetcher<ApiNftData, ERC721TokenCartItem>({
    fetcher: (cursor, filters) => fetchCollectionTokens(collectionAddress || '', chainId, { cursor, ...filters }),
    mapper: (data) => nftsToCardDataWithOfferFields(data, '', ''),
    execute: collectionAddress !== '',
    filter
  });
}

export function useProfileTokenFetcher(userAddress: string | undefined, filter: TokensFilter) {
  const { chainId } = useOnboardContext();

  return useTokenFetcher<ApiNftData, ERC721TokenCartItem>({
    fetcher: (cursor, filters) => fetchProfileTokens(userAddress || '', chainId, { cursor, ...filters }),
    mapper: (data) => nftsToCardDataWithOfferFields(data, '', ''),
    execute: userAddress !== '',
    filter
  });
}

function useTokenFetcher<From, To>({
  fetcher,
  mapper,
  execute,
  filter
}: {
  fetcher: (cursor: string, filters: TokensFilter) => Promise<ApiResponse>;
  mapper: (data: From[]) => To[];
  execute: boolean;
  filter: TokensFilter;
}) {
  const isMounted = useIsMounted();
  const [error, setError] = useState<string>();
  const [cursor, setCursor] = useState('');
  const [data, setData] = useState<To[]>([]);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const fetch = async (loadMore: boolean) => {
    if (!isMounted || !execute) {
      return;
    }

    let response;
    if (loadMore) {
      response = await fetcher(cursor, filter);
    } else {
      response = await fetcher('', filter); // reset cursor
    }

    if (response.error) {
      setError(response.error);
      console.error(response.error);
    } else {
      const result = response.result;
      const newData = mapper(result.data);
      setCursor(result.cursor);
      setData(loadMore ? (state) => [...state, ...newData] : newData);
      setHasNextPage(result.hasNextPage);
      setError(undefined);
    }

    setIsLoading(false);
  };

  return { error, data, hasNextPage, isLoading, fetch };
}

const nftsToCardDataWithOfferFields = (
  tokens: ApiNftData[],
  collectionAddress: string,
  collectionName: string
): ERC721TokenCartItem[] => {
  let result: ERC721TokenCartItem[] = (tokens || []).map((item: ApiNftData) => {
    const image =
      item?.metadata?.image ||
      item?.image?.url ||
      item?.alchemyCachedImage ||
      item?.image?.originalUrl ||
      item?.zoraImage?.url ||
      '';

    const result: ERC721TokenCartItem = {
      id: collectionAddress + '_' + item.tokenId,
      name: item.metadata?.name ?? item.metadata?.title,
      title: item.collectionName ?? collectionName,
      collectionName: item.collectionName ?? collectionName,
      collectionSlug: item.collectionSlug ?? '',
      description: item.metadata?.description ?? '',
      image: image,
      displayType: item.displayType,
      isVideo: isVideoNft(item),
      price: item?.orderSnippet?.listing?.orderItem?.startPriceEth ?? 0,
      chainId: item.chainId,
      tokenAddress: item.collectionAddress ?? collectionAddress,
      address: item.collectionAddress ?? collectionAddress,
      tokenId: item.tokenId,
      rarityRank: item.rarityRank,
      orderSnippet: item.ordersSnippet,
      hasBlueCheck: item.hasBlueCheck ?? false,
      attributes: item.metadata?.attributes ?? [],
      cartType: CartType.None
    };

    return result;
  });

  // remove any with blank images
  result = result.filter((x) => {
    return x.image && x.image.length > 0;
  });

  return result;
};

const isVideoNft = (token: BaseToken) => {
  // could also check image extension?
  return token.zoraImage?.mimeType === 'video/mp4';
};
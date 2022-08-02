import { BaseCollection, BaseToken, CollectionStats } from '@infinityxyz/lib-frontend/types/core';
import { useEffect, useState } from 'react';
import { apiGet } from 'src/utils/apiUtils';
import mitt from 'mitt';
import { DEFAULT_LIMIT } from 'src/utils';
import { CollectionSearchArrayDto, CollectionSearchDto } from '@infinityxyz/lib-frontend/types/dto/collections';

class _CollectionCache {
  cCache = new Map<string, BaseCollection>();
  tCache = new Map<string, BaseToken>();
  fetchingKeySet = new Set<string>();
  emitter = mitt();

  // TODO hookup to cache
  getTopCollections = async (): Promise<CollectionSearchDto[]> => {
    const response = await apiGet(
      `/collections/rankings?period=monthly&date=${Date.now()}&orderBy=floorPrice&orderDirection=desc&limit=${DEFAULT_LIMIT}`
    );

    if (response.error) {
      console.log(response.error);
    } else {
      // result is CollectionStats
      const collections = response.result.data as CollectionStats[];

      collections.map((stats) => {
        return {
          name: stats.name,
          chainId: stats.chainId,
          address: stats.collectionAddress,
          profileImage: stats.profileImage,
          hasBlueCheck: stats.hasBlueCheck
          // bannerImage: stats.bannerImage
          // slug: stats.slug,
          // description: stats.description,
        } as CollectionSearchDto;
      });
    }

    return [];
  };

  // TODO hookup to cache
  getCollectionsByIds = async (ids: string[]): Promise<CollectionSearchDto[]> => {
    const apiCalls = ids.map((id) => {
      return apiGet(`/collections/${id}`);
    });
    const responses = await Promise.all(apiCalls);

    const result = responses.map((response) => {
      if (response.error) {
        console.log(response.error);
        return {} as CollectionSearchDto;
      } else {
        const data: BaseCollection = response.result;

        return {
          name: data.metadata.name,
          chainId: data.chainId,
          address: data.address,
          profileImage: data.metadata.profileImage,
          hasBlueCheck: data.hasBlueCheck,
          bannerImage: data.metadata.bannerImage,
          slug: data.slug,
          description: data.metadata.description
        } as CollectionSearchDto;
      }
    });

    return result;
  };

  // TODO hookup to cache
  getCollectionsByName = async (query: string): Promise<CollectionSearchDto[]> => {
    const API_ENDPOINT = '/collections/search';
    const response = await apiGet(API_ENDPOINT, {
      query: {
        query,
        limit: DEFAULT_LIMIT
      }
    });

    if (response.error) {
      console.log(response.error);
    } else {
      const data = (response.result?.data ?? []) as CollectionSearchDto[];

      return data;
    }

    return [];
  };

  oneCollection = async (query: string): Promise<BaseCollection | undefined> => {
    const API_ENDPOINT = '/collections/search';
    const response = await apiGet(API_ENDPOINT, {
      query: {
        query,
        limit: DEFAULT_LIMIT
      }
    });

    if (response.error) {
      console.log(response.error);
    } else {
      const dtoData = response.result as CollectionSearchArrayDto;
      if (dtoData.data && dtoData.data.length > 0) {
        const dto = dtoData.data[0];

        const { result } = await apiGet(`/collections/${dto.chainId}:${dto.address}`);
        const collection = result as BaseCollection;

        return collection;
      }
    }
  };

  getCollection = (chainId: number, collectionAddress: string): BaseCollection | undefined => {
    const key = `${chainId.toString()}-${collectionAddress}`;

    const collection = this.cCache.get(key);

    if (collection) {
      return collection;
    }

    // get it async
    if (!this.fetchingKeySet.has(key)) {
      this.fetchingKeySet.add(key);

      this.getCollectionAsync(chainId, collectionAddress);
    }
  };

  getCollectionAsync = async (chainId: number, collectionAddress: string): Promise<BaseCollection> => {
    const key = `${chainId.toString()}-${collectionAddress}`;

    let collection = this.cCache.get(key);

    if (!collection) {
      const { result } = await apiGet(`/collections/${chainId}:${collectionAddress}`);
      collection = result as BaseCollection;

      this.cCache.set(key, collection);
      this.emitter.emit('updated');
    }

    return collection;
  };

  getToken = (chainId: number, collectionAddress: string, tokenId: string): BaseToken | undefined => {
    const key = `${chainId.toString()}-${collectionAddress}-${tokenId}`;

    const token = this.tCache.get(key);

    if (token) {
      return token;
    }

    // get it async
    if (!this.fetchingKeySet.has(key)) {
      this.fetchingKeySet.add(key);

      this.getTokenAsync(chainId, collectionAddress, tokenId);
    }
  };

  getTokenAsync = async (chainId: number, collectionAddress: string, tokenId: string): Promise<BaseToken> => {
    const key = `${chainId.toString()}-${collectionAddress}-${tokenId}`;

    let token = this.tCache.get(key);

    if (!token) {
      const { result } = await apiGet(`/collections/${chainId}:${collectionAddress}/nfts/${tokenId}`);
      token = result as BaseToken;

      this.tCache.set(key, token);
      this.emitter.emit('updated');
    }

    return token;
  };
}

export const CollectionCache = new _CollectionCache();

// ================================================

export const useCollectionCache = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [trigger, setTrigger] = useState<number>(0);

  useEffect(() => {
    CollectionCache.emitter.on('updated', onCacheUpdate);

    return () => {
      CollectionCache.emitter.off('updated', onCacheUpdate);
    };
  }, []);

  const onCacheUpdate = () => {
    const t = Math.random();
    setTrigger(t);
  };

  const nameForTokenId = (chainId: number, collectionAddress: string, tokenId: string): string => {
    CollectionCache.getToken(chainId, collectionAddress, tokenId);

    return tokenId;
  };

  const imageForTokenId = (chainId: number, collectionAddress: string, tokenId: string): string => {
    const token = CollectionCache.getToken(chainId, collectionAddress, tokenId);

    const tokenMetadata = token?.metadata;

    if (token && tokenMetadata) {
      if ('title' in tokenMetadata) {
        return tokenMetadata.title ?? tokenMetadata.name ?? '';
      }
      return tokenMetadata.name ?? '';
    }

    return tokenId;
  };

  const nameForCollection = (chainId: number, collectionAddress: string): string => {
    const collection = CollectionCache.getCollection(chainId, collectionAddress);

    if (collection) {
      return collection.metadata?.name;
    }

    return collectionAddress;
  };

  const getTopCollections = async (): Promise<CollectionSearchDto[]> => {
    return CollectionCache.getTopCollections();
  };

  const getCollectionsByName = async (query: string): Promise<CollectionSearchDto[]> => {
    return CollectionCache.getCollectionsByName(query);
  };

  const getCollectionsByIds = async (ids: string[]): Promise<CollectionSearchDto[]> => {
    return CollectionCache.getCollectionsByIds(ids);
  };

  return {
    nameForTokenId,
    imageForTokenId,
    nameForCollection,
    getTopCollections,
    getCollectionsByName,
    getCollectionsByIds
  };
};

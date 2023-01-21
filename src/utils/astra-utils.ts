import axios, { AxiosRequestHeaders } from 'axios';
import { trimText } from 'src/components/common';
import { SORT_FILTERS, TokensFilter } from 'src/utils/types';
import { ApiResponse } from './api-utils';
import { API_BASE, LARGE_LIMIT, SMALL_LIMIT } from './constants';
import { OnboardAuthProvider } from './context/OnboardContext/OnboardAuthProvider';

export type TokenFetcherOptions = { cursor?: string } & TokensFilter;

export const fetchCollectionTokens = async (
  collectionAddress: string,
  chainId: string,
  { cursor, sort = SORT_FILTERS.lowestPrice, ...options }: TokenFetcherOptions = {}
): Promise<ApiResponse> => {
  const filters = {
    orderBy: '',
    orderDirection: ''
  };

  switch (sort) {
    case SORT_FILTERS.highestPrice:
    case SORT_FILTERS.lowestPrice:
      filters.orderBy = 'price';
      filters.orderDirection = sort === SORT_FILTERS.highestPrice ? 'desc' : 'asc';
      break;
    case SORT_FILTERS.tokenIdNumeric:
      filters.orderBy = sort;
      filters.orderDirection = 'asc';
      break;
  }

  const query = {
    limit: LARGE_LIMIT,
    cursor,
    chainId,
    ...options,
    ...filters
    // ...parseFiltersToApiQueryParams({ sort }) // TODO: update API to support v2 filters for collections like this?
  };

  const response = await httpGet(`/collections/${chainId}:${collectionAddress}/nfts`, query);
  return response;
};

export const fetchProfileTokens = async (
  userAddress: string,
  chainId: string,
  { cursor, ...options }: TokenFetcherOptions = {}
): Promise<ApiResponse> => {
  const query = {
    ...options,
    limit: LARGE_LIMIT,
    cursor,
    chainId
  };

  const response = await httpGet(`/user/${userAddress}/nfts`, query);
  return response;
};

export const fetchCollections = async (query: string, cursor?: string): Promise<ApiResponse> => {
  const response = await httpGet('/collections/search', {
    query,
    limit: SMALL_LIMIT,
    cursor
  });

  return response;
};

export const getCollection = async (collectionAddress: string): Promise<CollectionInfo | undefined> => {
  const chainId = '1';
  const response = await httpGet(`/collection/${chainId}/${collectionAddress}`, {});

  if (response.result) {
    return response.result as CollectionInfo;
  }
};

export const numberWithCommas = (x: number | string) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

export const truncateStr = (str: string, max = 400) => {
  const textArray = trimText(str, max - 2, max - 1, max);

  if (textArray[1].length > 0) {
    return `${textArray[0]}\u{02026}`;
  }

  return textArray[0];
};

export interface CollectionInfo {
  address: string;
  chainId: string;
  tokenStandard: string;
  hasBlueCheck?: boolean;
  numNfts?: number;
  numOwners?: number;
  slug: string;
  name: string;
  symbol: string;
  description: string;
  profileImage: string;
  bannerImage: string;
  cardDisplaytype?: string;
  twitter?: string;
  discord?: string;
  external?: string;
}

// CollectionSearchArrayDto

export interface CollectionInfoArrayDto {
  data: CollectionInfo[];
  cursor: string;
  hasNextPage: boolean;
}

export const sleep = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export const httpGet = async (path: string, params?: object): Promise<ApiResponse> => {
  try {
    const headers = await authHeaders(path);
    const response = await axios.get(`${API_BASE}${path}`, { headers, params });

    return { status: response.status, error: '', result: response.data };
  } catch (error) {
    return httpErrorResponse(error);
  }
};

// ===================================================================

export const httpPost = async (path: string, body: object): Promise<ApiResponse> => {
  try {
    const headers = await authHeaders(path);
    const response = await axios.post(`${API_BASE}${path}`, body, { headers });

    return { status: response.status, error: '', result: response.data };
  } catch (error) {
    return httpErrorResponse(error);
  }
};

// ===================================================================

export const authHeaders = async (path: string): Promise<AxiosRequestHeaders> => {
  const userEndpointRegex = /\/(u|user)\//;
  const publicUserEndpoint = /\/p\/u\//;
  const requiresAuth = userEndpointRegex.test(path) && !publicUserEndpoint.test(path);

  let authHeaders = {};
  if (requiresAuth) {
    authHeaders = await OnboardAuthProvider.getAuthHeaders();
  }

  return authHeaders;
};

// ===================================================================

export const httpErrorResponse = (error: unknown) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const err: any = error;
  let status = 551;
  let message = '';

  if (err.response) {
    message = err.response.data;
    status = err.response.status;
    console.error(err.response.headers);
  } else if (err.request) {
    console.error(err.request);
    message = 'request error';
  } else {
    message = err.message;
  }
  console.error(err.config);

  // make sure error: is never undefined since if (error) fails in that case
  return { status: status, error: message ?? 'Unknown Error' };
};

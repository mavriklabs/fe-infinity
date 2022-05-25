import { GetOrderItemsQuery, OBOrderItem, SignedOBOrder } from '@infinityxyz/lib/types/core';
import { BigNumber, BigNumberish } from '@ethersproject/bignumber';
import { apiPost } from 'src/utils/apiUtils';
import { apiGet } from '.';

export const postOrders = async (user: string, orders: SignedOBOrder[]): Promise<string> => {
  try {
    const body = {
      orders: orders
    };

    const { result, error } = await apiPost(`/orders/${user}`, {
      data: body
    });
    if (error) {
      const msg = error?.errorResponse?.message ?? 'postOrders failed.';
      console.error(msg);
      throw msg;
    }
    return result as string;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const getOrders = async (filters: GetOrderItemsQuery = {}, limit = 5): Promise<SignedOBOrder[]> => {
  const response = await apiGet(`/orders`, {
    query: { ...filters, limit }
  });

  if (response.result) {
    return response.result.data as SignedOBOrder[];
  }

  return [];
};

export const fetchOrderNonce = async (user: string): Promise<string> => {
  try {
    const response = await apiGet(`/orders/${user}/nonce`, {});
    return response.result as string;
  } catch (err) {
    console.error('Failed fetching order nonce');
    throw err;
  }
};

export const fetchMinBpsToSeller = async (chainId: string, nfts: OBOrderItem[]): Promise<number> => {
  try {
    const collections: string[] = [];
    for (const nft of nfts) {
      collections.push(nft.collectionAddress);
    }
    const response = await apiGet(`/orders/minbps`, {
      query: { chainId, collections }
    });
    return response.result as number;
  } catch (err) {
    console.error('Failed fetching minbps');
    throw err;
  }
};

export const bigNumToDate = (time: BigNumberish): Date => {
  return new Date(BigNumber.from(time).toNumber() * 1000);
};

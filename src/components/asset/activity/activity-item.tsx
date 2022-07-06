import React from 'react';
import { BLANK_IMAGE_URL_MINI, ellipsisAddress } from 'src/utils';
import { BGImage, EthPrice, NextLink } from 'src/components/common';
import { format } from 'timeago.js';
import { BaseCollection } from '@infinityxyz/lib-frontend/types/core';
import { EventType, EventTypeNames } from '@infinityxyz/lib-frontend/types/core/feed';

export interface NftActivity {
  address: string;
  tokenId: string;
  chainId: string;
  type: string;
  from: string;
  fromDisplayName?: string;
  to?: string;
  toDisplayName?: string;
  price?: number;
  paymentToken: string;
  internalUrl?: string;
  externalUrl?: string;
  timestamp: number;
  collectionData?: BaseCollection;
}

interface Props {
  item: NftActivity;
}

export const ActivityItem = ({ item }: Props) => {
  return (
    <div>
      <div className="bg-gray-100 px-10 py-6 rounded-3xl flex items-center font-heading">
        <NextLink href={`/asset/${item.chainId}/${item.collectionData?.address}/${item.tokenId}`}>
          {item.collectionData?.metadata?.profileImage ? (
            <BGImage
              className="w-16 h-16 max-h-[80px] rounded-full"
              src={item.collectionData?.metadata?.profileImage}
            />
          ) : (
            <BGImage className="w-16 h-16 max-h-[80px] rounded-full" src={BLANK_IMAGE_URL_MINI} />
          )}
        </NextLink>
        <div className="flex justify-between w-full mx-8">
          {/* <div className="w-1/6">
            <div className="text-black font-bold font-body">
              <a href={`/collection/${item.collectionSlug}`}>{item.collectionName}</a>
            </div>
            <div>
              <a href={`/asset/${item.chainId}/${item.collectionAddress}/${item.tokenId}`}>
                {ellipsisAddress(item.tokenId)}
              </a>
            </div>
          </div> */}
          <div className="w-1/6">
            <div className="text-gray-400">Event</div>
            <div className="font-bold">
              <a href={`${item.externalUrl}`} target="_blank" rel="noopener noreferrer">
                {EventTypeNames[item.type as EventType]}
              </a>
            </div>
          </div>
          <div className="w-1/6">
            <div className="text-gray-400">Price</div>
            <div className="font-bold">{item.price ? <EthPrice label={`${item.price}`} /> : '—'}</div>
          </div>
          <div className="w-1/6">
            <div className="text-gray-400">From</div>
            <div className="font-bold">
              <NextLink href={`/profile/${item.from}`}>
                {item.fromDisplayName ? ellipsisAddress(item.fromDisplayName) : ellipsisAddress(item.from)}
              </NextLink>
            </div>
          </div>
          <div className="w-1/6">
            <div className="text-gray-400">To</div>
            <div className="font-bold">
              <NextLink href={`/profile/${item.to}`}>
                {item.toDisplayName ? ellipsisAddress(item.toDisplayName) : ellipsisAddress(item.to)}
              </NextLink>
            </div>
          </div>
          <div className="w-1/6">
            <div className="text-gray-400">Date</div>
            <div className="font-bold">
              <a href={item.externalUrl} target="_blank" rel="noopener noreferrer">
                {format(item.timestamp)}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

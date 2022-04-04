import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { BaseCollection } from '@infinityxyz/lib/types/core';
import { FaCheck, FaEdit, FaFacebook, FaTwitter } from 'react-icons/fa';
import { Button, Chip, PageBox, RoundedNav } from 'src/components/common';
import { GalleryBox } from 'src/components/gallery/gallery-box';
import { useFetch } from 'src/utils/apiUtils';
import { CollectionFeed } from 'src/components/feed/collection-feed';

export function CollectionPage() {
  const {
    query: { name }
  } = useRouter();
  const [currentTab, setCurrentTab] = useState(0);
  const path = `/collections/${name}`;
  const { result: collection } = useFetch<BaseCollection>(name ? path : '', { chainId: '1' });
  // const { result: stats } = useFetch<BaseCollection>(
  //   name
  //     ? path +
  //         '/stats?limit=10&interval=oneDay&orderBy=volume&orderDirection=asc&minDate=0&maxDate=2648764957623&period=daily'
  //     : '',
  //   { chainId: '1' }
  // );

  return (
    <PageBox
      title={name?.toString() ?? ''}
      titleElement={
        <span>
          {name}{' '}
          {collection?.hasBlueCheck ? (
            <Image src="/images/blue-check.png" width={24} height={24} alt="Blue check icon" />
          ) : null}
        </span>
      }
      center={false}
    >
      <div className="flex flex-row space-x-4">
        <Chip content="Watch" />
        <Chip left={<FaEdit />} content="Edit" />
        <Chip content={<FaTwitter />} />
        <Chip content={<FaFacebook />} />
      </div>

      <div className="text-theme-light-3000 mt-6">{collection?.metadata.description ?? ''}</div>

      <div className="text-sm font-bold mt-6">
        <div>Ownership includes</div>
        <div className="flex space-x-8 mt-2 font-normal">
          <div className="flex text-theme-light-3000">
            <FaCheck className="mr-2" />
            Access
          </div>
          <div className="flex text-theme-light-3000">
            <FaCheck className="mr-2" />
            Royalties
          </div>
          <div className="flex text-theme-light-3000">
            <FaCheck className="mr-2" />
            IP rights
          </div>
        </div>
      </div>

      <Button variant="outline" className="mt-6">
        Claim Collection
      </Button>

      <table className="mt-8 text-sm w-1/2">
        <thead>
          <tr className="text-gray-400">
            <th className="text-left font-medium">Items</th>
            <th className="text-left font-medium">Owned by</th>
            <th className="text-left font-medium">Floor price</th>
            <th className="text-left font-medium">Volume traded</th>
          </tr>
        </thead>
        <tbody>
          <tr className="font-bold">
            <td>379</td>
            <td>999</td>
            <td>0.40 ETH</td>
            <td>899</td>
          </tr>
        </tbody>
      </table>

      <RoundedNav
        items={[{ title: 'NFTs' }, { title: 'Community' }]}
        onChange={(currentIndex) => setCurrentTab(currentIndex)}
        className="w-80 mt-6"
      />

      <div className="mt-6">
        {currentTab === 0 ? (
          <>{collection && <GalleryBox collection={collection} />}</>
        ) : (
          <div className="flex">
            <div className="w-2/3">
              <div className="text-3xl mb-6">Feed</div>
              <CollectionFeed collectionAddress={collection?.address ?? ''} />
            </div>
            <div className="w-1/3">
              <div className="text-3xl mb-6">
                Trending
                <span className="ml-6 text-secondary">7 day vol</span>
              </div>
              <div>Trending component</div>
            </div>
          </div>
        )}
      </div>
    </PageBox>
  );
}

export default CollectionPage;

import { useEffect, useState } from 'react';
import { ErrorOrLoading, EZImage, HelpTip, NextLink, Spacer } from 'src/components/common';
import { apiGet, nFormatter, standardCard } from 'src/utils';
import { twMerge } from 'tailwind-merge';
import { Collection } from '@infinityxyz/lib-frontend/types/core';
import { ReactNode } from 'react-markdown/lib/react-markdown';

interface Props2 {
  collection: Collection;
  index: number;
}

const TrendingItem = ({ collection, index }: Props2) => {
  return (
    <NextLink href={`/collection/${collection.slug}`}>
      <div className={twMerge(standardCard, 'flex items-center')}>
        <div className="mr-4 text-theme-light-800">{index}</div>
        {/* NOTE min-w-0 is the secret to getting truncate working in flexboxes */}
        <div className="flex items-center min-w-0">
          <EZImage
            src={collection.metadata.profileImage || collection.metadata.bannerImage}
            className="w-12 h-12 overflow-clip rounded-full"
          />

          <div className="flex flex-col ml-4 overflow-clip">
            <div className="font-bold truncate font-heading">{collection.metadata.name}</div>
            <div className="text-theme-light-800 font-body text-sm">{`Volume ${nFormatter(
              collection.stats?.weekly?.salesVolume
            )}`}</div>
          </div>
        </div>
        <Spacer />
        <HelpTip
          content={
            <div className="flex flex-col items-center">
              <div>Number of sales</div>
              <div>last 7 days</div>
            </div>
          }
        >
          <div className="bg-white px-3 font-bold py-1 rounded-full mx-3">{`${nFormatter(
            collection.stats?.weekly?.numSales
          )}`}</div>
        </HelpTip>
      </div>
    </NextLink>
  );
};

export const TrendingSidebar = () => {
  const [data, setData] = useState<Collection[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasNoData, setHasNoData] = useState(false);
  const [hasError, setHasError] = useState(false);

  // const { result, isLoading } = useFetch(`${USER_API_END_POINT}/${user.address}`);

  // const topOwners = `/collections/${chainId}:${collectionAddress}/topOwners`;

  const getActivityList = async () => {
    setIsLoading(true);
    setHasNoData(false);

    const { result, error } = await apiGet('/collections/stats', {
      query: {
        period: 'weekly',
        queryBy: 'by_sales_volume' // 'by_avg_price' // 'by_sales_volume'
      }
    });

    setIsLoading(false);

    if (!error) {
      if (result?.data && result?.data.length === 0) {
        setHasNoData(true);
      }

      let tData = (result.data as Collection[]) ?? [];

      if (tData.length > 10) {
        tData = tData.splice(0, 10);
      }

      setData(tData);
    } else {
      setHasError(true);
    }
  };

  useEffect(() => {
    getActivityList();
  }, []);

  let contents: ReactNode = <></>;
  if (hasError || isLoading || hasNoData) {
    contents = <ErrorOrLoading error={hasError} noData={hasNoData} />;
  } else {
    contents = data.map((e, index) => {
      return <TrendingItem index={index + 1} collection={e} key={`${e.address}:${e.chainId}:${e.slug}`} />;
    });
  }

  return (
    <>
      <div className="text-2xl mb-6 font-medium">Trending 7 day volume</div>
      {contents}
    </>
  );
};

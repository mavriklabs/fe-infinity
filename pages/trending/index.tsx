import { Collection, CollectionPeriodStatsContent } from '@infinityxyz/lib-frontend/types/core';
import { useEffect, useState } from 'react';
import { AiOutlineCheckCircle } from 'react-icons/ai';
import { AButton } from 'src/components/astra/astra-button';
import { APageBox } from 'src/components/astra/astra-page-box';
import { BlueCheckInline, CenterFixed, EthPrice, EZImage, NextLink, Spinner, ToggleTab } from 'src/components/common';
import { useIsMounted } from 'src/hooks/useIsMounted';
import useScreenSize from 'src/hooks/useScreenSize';
import { apiGet, formatNumber, getCollectionKeyId, nFormatter } from 'src/utils';
import { useAppContext } from 'src/utils/context/AppContext';
import { ERC721CollectionCartItem } from 'src/utils/types';
import { borderColor, iconButtonStyle } from 'src/utils/ui-constants';
import { twMerge } from 'tailwind-merge';

const TrendingPage = () => {
  const queryBy = 'by_sales_volume';
  const [data, setData] = useState<Collection[]>([]);
  const [period, setPeriod] = useState('daily');
  const [isLoading, setIsLoading] = useState(false);
  const isMounted = useIsMounted();
  const { isCollSelected, isCollSelectable, toggleCollSelection } = useAppContext();
  const options = ['1 day', '7 days', '30 days'];
  const DEFAULT_TAB = '1 day';

  const fetchData = async (refresh = false) => {
    setIsLoading(true);
    if (refresh) {
      setData([]);
    }
    const { result } = await apiGet('/collections/stats', {
      query: {
        period,
        queryBy: queryBy
      }
    });

    if (isMounted()) {
      setIsLoading(false);
      if (result?.data?.length > 0) {
        if (refresh) {
          const newData = [...result.data];
          setData(newData);
        } else {
          const newData = [...data, ...result.data];
          setData(newData);
        }
      }
    }
  };

  useEffect(() => {
    fetchData(true);
  }, [period]);

  const onChangeToggleTab = (value: string) => {
    switch (value) {
      case '1 day':
        setPeriod('daily');
        break;
      case '7 days':
        setPeriod('weekly');
        break;
      case '30 days':
        setPeriod('monthly');
        break;
    }
  };

  return (
    <APageBox title="Trending Collections" showTitle={true}>
      <div className="overflow-y-auto overflow-x-clip text-sm scrollbar-hide">
        <ToggleTab
          className="font-heading"
          options={options}
          defaultOption={DEFAULT_TAB}
          onChange={onChangeToggleTab}
        />

        <div className="space-y-3 mt-8">
          {data.map((coll, index) => {
            return (
              <TrendingPageCard
                key={getCollectionKeyId(coll)}
                collection={coll}
                isCollSelectable={isCollSelectable}
                isCollSelected={isCollSelected}
                onClickBuy={(selectedColl) => {
                  if (toggleCollSelection) {
                    return toggleCollSelection(selectedColl);
                  }
                }}
                index={index}
                period={period}
              />
            );
          })}
        </div>

        {isLoading && (
          <CenterFixed>
            <Spinner />
          </CenterFixed>
        )}
      </div>
    </APageBox>
  );
};

export default TrendingPage;

// =======================================================================

interface Props {
  collection: Collection;
  period: string;
  index: number;
  onClickBuy: (data: ERC721CollectionCartItem) => void;
  isCollSelected: (data: ERC721CollectionCartItem) => boolean;
  isCollSelectable: (data: ERC721CollectionCartItem) => boolean;
}

const TrendingPageCard = ({ collection, onClickBuy, isCollSelected, isCollSelectable, period, index }: Props) => {
  const { isDesktop } = useScreenSize();

  let periodStat: CollectionPeriodStatsContent | undefined = undefined;
  if (period === 'daily') {
    periodStat = collection?.stats?.daily;
  } else if (period === 'weekly') {
    periodStat = collection?.stats?.weekly;
  } else if (period === 'monthly') {
    periodStat = collection?.stats?.monthly;
  }
  const floorPrice = periodStat?.floorPrice ?? 0;
  const numOwners = collection?.numOwners && nFormatter(collection.numOwners);
  const floorPriceChange = Number(nFormatter(periodStat?.floorPriceChange));
  const salesVolumeChange = Number(nFormatter(periodStat?.salesVolumeChange));

  return (
    <div className={twMerge(borderColor, 'border-b py-4 flex items-center')}>
      <div
        className="grid gap-2 justify-between items-center w-full"
        style={{ gridTemplateColumns: 'minmax(0, 4fr) repeat(auto-fit, minmax(0, 1fr))' }}
      >
        <div className="flex items-center font-bold font-heading">
          <div className="text-lg mr-8 text-right">{index + 1}</div>

          <NextLink href={`/collection/${collection?.slug}`}>
            <EZImage className="w-14 h-14 rounded-lg overflow-clip" src={collection?.metadata?.profileImage} />
          </NextLink>

          <NextLink href={`/collection/${collection?.slug}`} className="ml-2 whitespace-normal">
            {collection?.metadata?.name}
            {collection?.hasBlueCheck && <BlueCheckInline />}
          </NextLink>
        </div>

        <div className="space-y-1">
          <div className="text-sm font-bold flex items-center">Volume</div>
          <div className="flex items-center">
            <EthPrice label={`${periodStat?.salesVolume ? nFormatter(periodStat?.salesVolume) : '-'}`} />
            <div className={twMerge('ml-1 text-xs', salesVolumeChange >= 0 ? 'text-green-600' : 'text-red-600')}>
              {salesVolumeChange} %
            </div>
          </div>
        </div>

        <div className="space-y-1">
          <div className="text-sm font-bold flex items-center">Floor</div>
          <div className="flex items-center">
            <EthPrice label={floorPrice > 0 ? formatNumber(floorPrice, 2) : '-'} />
            <div className={twMerge('ml-1 text-xs', floorPriceChange >= 0 ? 'text-green-600' : 'text-red-600')}>
              {floorPriceChange} %
            </div>
          </div>
        </div>

        {isDesktop ? (
          <>
            <div className="space-y-1">
              <div className="text-sm font-bold ">Owners</div>
              <div>{numOwners ? numOwners : '-'}</div>
            </div>

            <div className="space-y-1">
              <div className=" text-sm font-bold ">Tokens</div>
              <div>{nFormatter(periodStat?.tokenCount ?? 0)}</div>
            </div>
          </>
        ) : null}

        <div className="flex gap-2">
          <AButton
            primary
            className="px-9 py-3 rounded-lg"
            onClick={() => {
              if (isCollSelectable(collection as ERC721CollectionCartItem)) {
                onClickBuy(collection as ERC721CollectionCartItem);
              }
            }}
          >
            {isCollSelected(collection as ERC721CollectionCartItem) ? (
              <AiOutlineCheckCircle className={iconButtonStyle} />
            ) : (
              'Buy'
            )}
          </AButton>
        </div>
      </div>
    </div>
  );
};

import { SetStateAction } from 'jotai';
import { Dispatch, useState } from 'react';
import { APageBox } from 'src/components/astra/astra-page-box';
import { DonutChart, DonutDataPoint } from 'src/components/charts/donut-chart';
import { LineChart } from 'src/components/charts/line-chart';
import { Checkbox, Spacer } from 'src/components/common';
import { RewardsSection } from 'src/components/rewards/rewards-section';
import {
  AllBuyDataSetIds,
  AllVolumeDataSetIds,
  BuyDataSetIds,
  VolumeDataSetIds,
  useBuyRewardDataSets
} from 'src/hooks/api/useBuyRewardDataSets';
import { useTopBuyersDataSets } from 'src/hooks/api/useTopBuyersDataSets';
import useScreenSize from 'src/hooks/useScreenSize';
import { nFormatter } from 'src/utils';
import { buttonBorderColor, primaryShadow, textColor } from 'src/utils/ui-constants';
import { twMerge } from 'tailwind-merge';

const BuyDataSetIdsToNames: Record<BuyDataSetIds, string> = {
  buys: 'Total',
  'native-buys': 'Native',
  'user-buys': 'Your Total',
  'user-native-buys': 'Your Native'
};

const VolumeDataSetIdsToNames: Record<VolumeDataSetIds, string> = {
  volume: 'Total',
  'native-volume': 'Native',
  'user-volume': 'Your Total',
  'user-native-volume': 'Your Native'
};

const AnalyticsPage = () => {
  const { isDesktop } = useScreenSize();
  const {
    aggregated,
    userAvailable,
    userAggregated,
    buyDataSets,
    volumeDataSets,
    selectedVolumeDataSets,
    availableVolumeDataSets,
    availableBuyDataSets,
    selectedBuyDataSets,
    setSelectedBuyDataSets,
    setSelectedVolumeDataSets
  } = useBuyRewardDataSets();

  const {
    topUsersByVolumeDataSet,
    topUsersByNumBuysDataSet,
    topUsersByNativeVolumeDataSet,
    topUsersByNumNativeBuysDataSet
  } = useTopBuyersDataSets();

  const [selectedUserByVolume, setSelectedUserByVolume] = useState<null | DonutDataPoint>(null);
  const [selectedUserByNativeVolume, setSelectedUserByNativeVolume] = useState<null | DonutDataPoint>(null);
  const [selectedUserByBuys, setSelectedUserByBuys] = useState<null | DonutDataPoint>(null);
  const [selectedUserByNativeBuys, setSelectedUserByNativeBuys] = useState<null | DonutDataPoint>(null);

  const handleDonutSelect = (set: Dispatch<SetStateAction<DonutDataPoint | null>>) => (item: DonutDataPoint) => {
    set((prev) => {
      return prev && prev.id === item.id ? null : item;
    });
  };

  return (
    <APageBox title="Analytics">
      <div
        className={twMerge(textColor, 'flex flex-col h-full w-full overflow-y-auto overflow-x-hidden scrollbar-hide')}
      >
        <div className="mb-4">
          <RewardsSection
            title="Totals"
            sideInfo={
              <div className={twMerge(buttonBorderColor, isDesktop && primaryShadow, 'md:border md:py-4 md:px-6')}>
                <div className="md:flex flex-wrap mt-4">
                  <div className="lg:w-1/4 sm:w-full md:block flex justify-between">
                    <div className="md:text-2xl font-heading font-bold">{nFormatter(aggregated.volume, 2)} USD</div>
                    <div className="text-sm mt-1">Buy volume</div>
                  </div>
                  <Spacer />

                  <div className="lg:w-1/4 sm:w-full md:block flex justify-between">
                    <div className="md:text-2xl font-heading font-bold">
                      {nFormatter(aggregated.nativeVolume, 2)} USD
                    </div>
                    <div className="text-sm mt-1">Native buy volume</div>
                  </div>
                  <Spacer />

                  <div className="lg:w-1/4 sm:w-full md:block flex justify-between">
                    <div className="md:text-2xl font-heading font-bold">{nFormatter(aggregated.numBuys, 2)} Buys</div>
                    <div className="text-sm mt-1">Number of buys</div>
                  </div>
                  <Spacer />

                  <div className="lg:w-1/4 sm:w-full md:block flex justify-between">
                    <div className="md:text-2xl font-heading font-bold">
                      {nFormatter(aggregated.numNativeBuys, 2)} Buys
                    </div>
                    <div className="text-sm mt-1">Number of native buys</div>
                  </div>
                  <Spacer />
                </div>
              </div>
            }
          ></RewardsSection>
        </div>

        {userAvailable && (
          <div className="mb-4">
            <RewardsSection
              title="Your Totals"
              sideInfo={
                <div className={twMerge(buttonBorderColor, isDesktop && primaryShadow, 'md:border md:py-4 md:px-6')}>
                  <div className="md:flex flex-wrap mt-4">
                    <div className="lg:w-1/4 sm:w-full md:block flex justify-between">
                      <div className="md:text-2xl font-heading font-bold">
                        {nFormatter(userAggregated.volume, 2)} USD
                      </div>
                      <div className="text-sm mt-1">Buy volume</div>
                    </div>
                    <Spacer />

                    <div className="lg:w-1/4 sm:w-full md:block flex justify-between">
                      <div className="md:text-2xl font-heading font-bold">
                        {nFormatter(userAggregated.nativeVolume, 2)} USD
                      </div>
                      <div className="text-sm mt-1">Native buy volume</div>
                    </div>
                    <Spacer />

                    <div className="lg:w-1/4 sm:w-full md:block flex justify-between">
                      <div className="md:text-2xl font-heading font-bold">
                        {nFormatter(userAggregated.numBuys, 2)} Buys
                      </div>
                      <div className="text-sm mt-1">Number of buys</div>
                    </div>
                    <Spacer />

                    <div className="lg:w-1/4 sm:w-full md:block flex justify-between">
                      <div className="md:text-2xl font-heading font-bold">
                        {nFormatter(userAggregated.numNativeBuys, 2)} Buys
                      </div>
                      <div className="text-sm mt-1">Number of native buys</div>
                    </div>
                    <Spacer />
                  </div>
                </div>
              }
            ></RewardsSection>
          </div>
        )}

        <div className={twMerge('space-y-4 mt-6 pb-6')}>
          <div className="flex flex-col lg:flex-row mb-2 mx-2">
            <div className="mb-2 lg:mb-0 lg:flex-1 lg:mr-1 lg:max-w-[50%]">
              <DonutChart
                title={topUsersByVolumeDataSet.name}
                subTitle={''}
                dataSet={topUsersByVolumeDataSet}
                selectedDataPoint={selectedUserByVolume}
                onClick={handleDonutSelect(setSelectedUserByVolume)}
              />
            </div>
            <div className="lg:flex-1 lg:ml-1 lg:max-w-[50%]">
              <DonutChart
                title={topUsersByNativeVolumeDataSet.name}
                subTitle={''}
                dataSet={topUsersByNativeVolumeDataSet}
                selectedDataPoint={selectedUserByNativeVolume}
                onClick={handleDonutSelect(setSelectedUserByNativeVolume)}
              />
            </div>
          </div>
        </div>

        <div className={twMerge('space-y-4 mt-6 pb-6')}>
          <div className="flex flex-col lg:flex-row mb-2 mx-2">
            <div className="mb-2 lg:mb-0 lg:flex-1 lg:mr-1 lg:max-w-[50%]">
              <DonutChart
                title={topUsersByNumBuysDataSet.name}
                subTitle={''}
                dataSet={topUsersByNumBuysDataSet}
                selectedDataPoint={selectedUserByBuys}
                onClick={handleDonutSelect(setSelectedUserByBuys)}
              />
            </div>
            <div className="lg:flex-1 lg:ml-1 lg:max-w-[50%]">
              <DonutChart
                title={topUsersByNumNativeBuysDataSet.name}
                subTitle={''}
                dataSet={topUsersByNumNativeBuysDataSet}
                selectedDataPoint={selectedUserByNativeBuys}
                onClick={handleDonutSelect(setSelectedUserByNativeBuys)}
              />
            </div>
          </div>
        </div>
        <div className={twMerge('space-y-4 mt-6 pb-6 mb-16')}>
          <div className="flex flex-col lg:flex-row mb-2 mx-2">
            <div className="mb-2 lg:mb-0 lg:flex-1 lg:mr-1 lg:max-w-[50%]">
              <LineChart dataSets={volumeDataSets} xAxisType="DATE" title="Buy Volume" subTitle="Last 30 days">
                <div className="grid grid-cols-2">
                  {AllVolumeDataSetIds.map((id) => {
                    return (
                      <div key={id}>
                        <Checkbox
                          label={VolumeDataSetIdsToNames[id]}
                          checked={selectedVolumeDataSets.includes(id)}
                          onChange={() => {
                            setSelectedVolumeDataSets((prev) => {
                              if (prev.includes(id)) {
                                return prev.filter((item) => item !== id);
                              }
                              return [...prev, id];
                            });
                          }}
                          disabled={!availableVolumeDataSets.includes(id)}
                        />
                      </div>
                    );
                  })}
                </div>
              </LineChart>
            </div>
            <div className="lg:flex-1 lg:ml-1 lg:max-w-[50%]">
              <LineChart dataSets={buyDataSets} xAxisType="DATE" title="Buys" subTitle="Last 30 days">
                <div className="grid grid-cols-2">
                  {AllBuyDataSetIds.map((id) => {
                    return (
                      <div key={id}>
                        <Checkbox
                          label={BuyDataSetIdsToNames[id]}
                          checked={selectedBuyDataSets.includes(id)}
                          onChange={() => {
                            setSelectedBuyDataSets((prev) => {
                              if (prev.includes(id)) {
                                return prev.filter((item) => item !== id);
                              }
                              return [...prev, id];
                            });
                          }}
                          disabled={!availableBuyDataSets.includes(id)}
                        />
                      </div>
                    );
                  })}
                </div>
              </LineChart>
            </div>
          </div>
        </div>
      </div>
    </APageBox>
  );
};

export default AnalyticsPage;

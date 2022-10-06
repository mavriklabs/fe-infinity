import { useEffect, useState } from 'react';
import { EventType } from '@infinityxyz/lib-frontend/types/core/feed';
import { apiGet } from 'src/utils';
import { FeedFilter } from 'src/utils/firestore/firestoreUtils';
import { ScrollLoader } from '../common';
import { ActivityItem, NftEventRec } from '../asset/activity/activity-item';
import { useOnboardContext } from 'src/utils/OnboardContext/OnboardContext';

interface Props {
  collectionAddress?: string;
  tokenId?: string;
  types?: EventType[];
  className?: string;
}

export const CollectionActivityFeed = ({
  collectionAddress,
  tokenId,
  types = [EventType.NftSale],
  className = ''
}: Props) => {
  const { chainId } = useOnboardContext();
  const [filter] = useState<FeedFilter>({ collectionAddress, tokenId, types });
  // const [filteringTypes, setFilteringTypes] = useState<EventType[]>(types);

  const [isLoading, setIsLoading] = useState(false);
  const [activities, setActivities] = useState<NftEventRec[]>([]);
  const [cursor, setCursor] = useState('');

  const fetchActivity = async (isRefresh = false, fromCursor = '') => {
    if (!collectionAddress) {
      return;
    }

    try {
      setIsLoading(true);
      const url = tokenId
        ? `/collections/${chainId}:${collectionAddress}/nfts/${tokenId}/activity`
        : `/collections/${chainId}:${collectionAddress}/activity`;
      const { result, error } = await apiGet(url, {
        query: {
          limit: 50,
          eventType: filter.types || [
            EventType.NftSale,
            EventType.NftListing,
            EventType.NftOffer,
            EventType.TokensStaked,
            EventType.UserVote,
            EventType.NftTransfer
          ],
          cursor: fromCursor
        }
      });

      if (!error && result) {
        if (isRefresh) {
          setActivities([...result.data]);
        } else {
          setActivities([...activities, ...result.data]);
        }
        setCursor(result?.cursor);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchActivity(true);
  }, [filter]);

  // const onChangeFilterDropdown = (checked: boolean, checkId: string) => {
  //   const newFilter = { ...filter };

  //   if (checkId === '') {
  //     setFilteringTypes([]);
  //     delete newFilter.types;
  //     setFilter(newFilter);
  //     return;
  //   }
  //   const selectedType = checkId as EventType;
  //   if (checked) {
  //     newFilter.types = [...filteringTypes, selectedType];
  //     setFilter(newFilter);
  //     setFilteringTypes(newFilter.types);
  //   } else {
  //     const _newTypes = [...filteringTypes];
  //     const index = filteringTypes.indexOf(selectedType);
  //     if (index >= 0) {
  //       _newTypes.splice(index, 1);
  //     }
  //     newFilter.types = _newTypes;
  //     setFilter(newFilter);
  //     setFilteringTypes(_newTypes);
  //   }
  // };

  if (!collectionAddress) {
    return null; // require collectionAddress
  }

  return (
    <div className={`min-h-[50vh] ${className}`}>
      {/* <div className={twMerge("flex justify-between mb-6", negativeMargin)}>
        <div className="text-3xl mb-6">&nbsp;</div>
         <FeedFilterDropdown
          options={[
            {
              label: 'All',
              value: ''
            },
            {
              label: 'Listings',
              value: EventType.NftListing
            },
            {
              label: 'Offers',
              value: EventType.NftOffer
            },
            {
              label: 'Sales',
              value: EventType.NftSale
            }
          ]}
          selectedTypes={filteringTypes}
          onChange={onChangeFilterDropdown}
        /> 
      </div> */}

      {!isLoading && activities.length === 0 ? <div className="font-heading">No results found</div> : null}

      <ul className="space-y-4">
        {activities.map((act: NftEventRec, idx) => {
          return <ActivityItem key={idx} item={act} />;
        })}

        <ScrollLoader
          onFetchMore={() => {
            fetchActivity(false, cursor);
          }}
        />
      </ul>
    </div>
  );
};

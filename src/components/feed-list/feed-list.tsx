import { useEffect, useState } from 'react';
import { EventType } from '@infinityxyz/lib-frontend/types/core/feed';
import { apiGet } from 'src/utils';
import { FeedFilter } from 'src/utils/firestore/firestoreUtils';
import { ScrollLoader } from '../common';
// import { CommentPanel } from '../feed/comment-panel';
import { FeedFilterDropdown } from '../feed/feed-filter-dropdown';
import { FeedEvent } from '../feed/feed-item';
import { NftActivity } from '../asset/activity/activity-item';
import { useAppContext } from 'src/utils/context/AppContext';
import { FeedListItem } from './feed-list-item';

interface Props {
  collectionAddress: string;
  tokenId?: string;
  types?: EventType[];
  className?: string;
}

export const FeedList = ({ collectionAddress, tokenId, types, className = '' }: Props) => {
  const { chainId } = useAppContext();
  const [filter, setFilter] = useState<FeedFilter>({ collectionAddress, tokenId, types });
  const [commentPanelEvent, setCommentPanelEvent] = useState<FeedEvent | null>(null);
  const [filteringTypes, setFilteringTypes] = useState<EventType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [activities, setActivities] = useState<NftActivity[]>([]);
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
          limit: 10,
          eventType: filter.types || [EventType.NftSale, EventType.NftListing, EventType.NftOffer],
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

  const onChangeFilterDropdown = (checked: boolean, checkId: string) => {
    const newFilter = { ...filter };

    if (checkId === '') {
      setFilteringTypes([]);
      delete newFilter.types;
      setFilter(newFilter);
      return;
    }

    const selectedType = checkId as EventType;
    if (checked) {
      newFilter.types = [...filteringTypes, selectedType];
      setFilter(newFilter);
      setFilteringTypes(newFilter.types);
    } else {
      const _newTypes = [...filteringTypes];
      const index = filteringTypes.indexOf(selectedType);
      if (index >= 0) {
        _newTypes.splice(index, 1);
      }
      newFilter.types = _newTypes;
      setFilter(newFilter);
      setFilteringTypes(_newTypes);
    }
  };

  if (!collectionAddress) {
    return null;
  }

  return (
    <div className={`min-h-[1024px] ${className}`}>
      <div className="flex justify-between mt-[-66px] mb-6">
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
      </div>

      {!isLoading && activities.length === 0 ? <div className="font-heading">No data available.</div> : null}

      <ul className="space-y-4">
        {activities.map((activity, idx) => {
          return (
            <div key={idx}>
              <FeedListItem
                activity={activity}
                onLike={(ev) => {
                  console.log(ev);
                }}
                onComment={(ev) => {
                  if (ev.id === commentPanelEvent?.id) {
                    setCommentPanelEvent(null);
                  } else {
                    setCommentPanelEvent(ev);
                  }
                }}
              />

              <hr className="mt-6 mb-10 text-gray-100" />
            </div>
          );
        })}

        <ScrollLoader
          onFetchMore={async () => {
            fetchActivity(false, cursor);
          }}
        />
      </ul>
    </div>
  );
};
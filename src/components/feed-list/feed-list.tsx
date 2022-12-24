import { useEffect, useState } from 'react';
import { EventType } from '@infinityxyz/lib-frontend/types/core/feed';
import { apiGet } from 'src/utils';
import { FeedFilter } from 'src/components/feed/filter-popdown';
import { Button, ScrollLoader, Spacer } from '../common';
import { NftEventRec } from '../asset/activity/activity-item';
import { FeedListItem } from './feed-list-item';
import { useOnboardContext } from 'src/utils/OnboardContext/OnboardContext';
import { IoMdRefresh } from 'react-icons/io';
import { iconButtonStyle } from 'src/utils/ui-constants';
import { filterButtonDefaultOptions, FilterPopdown } from './filter-popdown';

interface Props {
  collectionAddress: string;
  tokenId?: string;
  types: EventType[];
  className?: string;
  collectionName?: string;
  collectionSlug?: string;
  collectionProfileImage?: string;
}

export const FeedList = ({
  collectionAddress,
  tokenId,
  collectionName,
  collectionSlug,
  types,
  collectionProfileImage,
  className = ''
}: Props) => {
  const { chainId } = useOnboardContext();
  const [filter, setFilter] = useState<FeedFilter>({ collectionAddress, tokenId, types });
  const [commentPanelEvent, setCommentPanelEvent] = useState<NftEventRec | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [activities, setActivities] = useState<NftEventRec[]>([]);
  const [cursor, setCursor] = useState('');

  const fetchActivity = async (isRefresh = false, fromCursor = '') => {
    if (!collectionAddress) {
      return;
    }

    try {
      setIsLoading(true);

      const types = filter.types ?? [];
      if (types?.length > 0) {
        const url = tokenId
          ? `/collections/${chainId}:${collectionAddress}/nfts/${tokenId}/activity`
          : `/collections/${chainId}:${collectionAddress}/activity`;

        const { result, error } = await apiGet(url, {
          query: {
            limit: 20,
            eventType: filter.types,
            cursor: fromCursor,
            source: filter.source
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
      } else {
        setActivities([]);
        setCursor('');
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

  if (!collectionAddress) {
    return null;
  }

  return (
    <div className={`${className}`}>
      <div className="flex items-center mb-8">
        <div className="text-4xl">Feed</div>

        <Spacer />
        <Button className="mr-3" variant="roundBorder" size="round" onClick={() => fetchActivity(true)}>
          <IoMdRefresh className={iconButtonStyle} />
        </Button>

        <FilterPopdown
          options={filterButtonDefaultOptions}
          filter={filter}
          onChange={(f) => {
            setFilter(f);
          }}
        />
      </div>

      {!isLoading && activities.length === 0 ? <div className="font-heading">No results found</div> : null}

      <div className="space-y-4">
        {activities.map((activity) => {
          return (
            <div key={activity.id}>
              <FeedListItem
                collectionName={collectionName}
                collectionSlug={collectionSlug}
                collectionProfileImage={collectionProfileImage}
                activity={activity}
                onComment={(ev) => {
                  if (!ev) {
                    // using the up arrow thing to close the chat?  not sure what it's for
                    setCommentPanelEvent(null);
                  } else {
                    if (ev.id === commentPanelEvent?.id) {
                      setCommentPanelEvent(null);
                    } else {
                      setCommentPanelEvent(ev);
                    }
                  }
                }}
              />

              {/* {commentPanelEvent && commentPanelEvent.id === activity.id && (
                <div className="ml-20 p-4 ">
                  <CommentPanel
                    contentOnly={true}
                    isOpen={!!commentPanelEvent}
                    event={commentPanelEvent}
                    onClose={() => {
                      setCommentPanelEvent(null);
                    }}
                  />
                </div>
              )} */}

              {/* <hr className="mt-6 mb-10 text-gray-100" /> */}
            </div>
          );
        })}

        <ScrollLoader
          onFetchMore={() => {
            fetchActivity(false, cursor);
          }}
        />
      </div>
    </div>
  );
};

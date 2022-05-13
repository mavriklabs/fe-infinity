import { FunctionComponent } from 'react';
import { useRouter } from 'next/router';
import { UserProfileDto } from './user-profile-dto';
import { UserBannerImage } from './user-banner-image';
import { UserProfileImage } from './user-profile-image';
import { UserProfileShare } from './user-profile-share';
import { Chip, ToggleTab, useToggleTab } from 'src/components/common';
import { UserPageNftsTab } from './user-page-nfts-tab';
import { UserPageActivityTab } from './user-page-activity-tab';

interface UserPageProps {
  userInfo: UserProfileDto;
  isOwner?: boolean;
}

export const UserPage: FunctionComponent<UserPageProps> = ({ userInfo, isOwner = false }) => {
  const router = useRouter();
  const { options, onChange, selected } = useToggleTab(['Collected', 'Activity'], 'Collected');

  return (
    <>
      <UserBannerImage imgSrc={userInfo.bannerImage} isOwner={isOwner} />

      <div className="flex flex-col mx-auto translate-x-1 -mt-16">
        <UserProfileImage imgSrc={userInfo.profileImage} isOwner={isOwner} />

        <h2 className="my-6 text-6xl font-body">{userInfo.displayName || 'No Display Name'}</h2>

        <div className="flex flex-wrap font-heading -ml-3 mb-8">
          <p className="leading-wide mx-4 font-bold">@{userInfo.username || 'no-username'}</p>
          {/* <UserWatchList userWatchList={[userInfo.address, userInfo.address]} /> */}
        </div>
        <div className="my-4 -ml-2 flex flex-wrap">
          {isOwner && (
            <Chip
              content="Edit"
              onClick={() => {
                router.push(`/profile/settings`);
              }}
            />
          )}
          <UserProfileShare username={userInfo.username} userAddress={userInfo.address} />
        </div>
        {userInfo.bio && <p className="text-theme-light-800 mt-8 ml-1 max-w-md">{userInfo.bio || ''}</p>}

        <ToggleTab className="mt-14 -ml-2 font-heading" options={options} selected={selected} onChange={onChange} />

        <div className="mt-6 min-h-[1024px]">
          {selected === 'Collected' && <UserPageNftsTab userInfo={userInfo} />}
          {selected === 'Activity' && <UserPageActivityTab userInfo={userInfo} />}
        </div>
      </div>
    </>
  );
};

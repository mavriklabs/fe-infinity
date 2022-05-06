import { useRouter } from 'next/router';
import { PageBox } from 'src/components/common';
import { UserPage } from 'src/components/user/user-page';
import { useAppContext, User } from 'src/utils/context/AppContext';
import { useFetch } from 'src/utils';
import { UserProfileDto } from 'src/components/user/user-profile-dto';

const USER_API_END_POINT = '/user';

const ProfilePage = () => {
  const router = useRouter();
  const {
    query: { address }
  } = router;
  const { user } = useAppContext();

  if (!address) {
    return null;
  }
  if (address === 'me' && !user) {
    return (
      <PageBox title="Account" className="mb-12">
        Please sign in.
      </PageBox>
    );
  }

  return (
    <ProfilePageContents userAddress={address === 'me' ? `${user?.address ?? ''}` : `${address ?? ''}`} user={user} />
  );
};

// ================================================

interface Props {
  user: User | null;
  userAddress: string;
}

const ProfilePageContents = ({ user, userAddress }: Props) => {
  const { result, isLoading, isError, error } = useFetch(`${USER_API_END_POINT}/${userAddress}`);

  if (isLoading) {
    return <PageBox title="Loading..."></PageBox>;
  }

  if (isError) {
    console.error(error);
    return (
      <PageBox title="Error" className="mb-12">
        Failed Fetch User Info
      </PageBox>
    );
  }

  const userInfo = result as UserProfileDto;

  return (
    <PageBox showTitle={false} title={userInfo.username || userInfo.address}>
      <UserPage userInfo={result as UserProfileDto} isOwner={!!(user && user.address === userInfo.address)} />
    </PageBox>
  );
};

export default ProfilePage;

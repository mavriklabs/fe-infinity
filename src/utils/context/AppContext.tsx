import * as React from 'react';
import { getCustomExceptionMsg } from 'src/utils/commonUtils';
import { ProviderEvents, WalletType } from 'src/utils/providers/AbstractProvider';
import { UserRejectException } from 'src/utils/providers/UserRejectException';
import { ProviderManager } from 'src/utils/providers/ProviderManager';
import { Toaster, toastWarning } from 'src/components/common';
import { apiGet } from '../apiUtils';

export type User = {
  address: string;
};

export type FollowingCollection = {
  collectionAddress: string;
  collectionChainid: string;
};

export type AppContextType = {
  user: User | null;
  signOut: () => void;
  checkSignedIn: () => boolean;
  userReady: boolean;
  chainId: string;
  showAppError: (msg: string) => void;
  showAppMessage: (msg: string) => void;
  headerPosition: number;
  setHeaderPosition: (bottom: number) => void;
  connectWallet: (walletType: WalletType) => Promise<void>;
  providerManager?: ProviderManager;
  userFollowingCollections: FollowingCollection[];
  fetchFollowingCollections: () => void;
};

const AppContext = React.createContext<AppContextType | null>(null);

export function AppContextProvider(props: React.PropsWithChildren<unknown>) {
  const [user, setUser] = React.useState<User | null>(null);
  const [userReady, setUserReady] = React.useState(false);
  const [followingCollections, setFollowingCollections] = React.useState([]);
  const [chainId, setChainId] = React.useState('1');
  const [headerPosition, setHeaderPosition] = React.useState(0);
  const showAppError = (message: React.ReactNode) => {
    getCustomExceptionMsg(message);
  };
  const [providerManager, setProviderManager] = React.useState<ProviderManager | undefined>();

  const showAppMessage = (message: React.ReactNode) => message;

  const fetchFollowingCollections = async () => {
    if (user?.address) {
      const { result, error } = await apiGet(`/user/${chainId}:${user?.address}/followingCollections`);
      if (!error) {
        setFollowingCollections(result.data);
      }
    }
  };

  React.useEffect(() => {
    // check & set logged in user:
    let isActive = true;
    ProviderManager.getInstance().then((providerManagerInstance) => {
      if (isActive) {
        setProviderManager(providerManagerInstance);

        providerManagerInstance
          .signIn()
          .then(() => {
            setUser({ address: providerManagerInstance.account });
            const chainIdNew = providerManagerInstance.chainId ?? 1;
            setChainId(`${chainIdNew}`);
          })
          .catch((err) => {
            console.error(err);
          })
          .finally(() => {
            setUserReady(true);
          });
      }
    });
    return () => {
      isActive = false;
    };
  }, []);

  React.useEffect(() => {
    // get & keep user's following collections:
    fetchFollowingCollections();
  }, [userReady]);

  const connectWallet = async (walletType: WalletType) => {
    if (providerManager?.connectWallet) {
      try {
        await providerManager.connectWallet(walletType);
        await providerManager.signIn();
        setUser({ address: providerManager.account ?? '' });
        const chainIdNew = providerManager.chainId ?? 1;
        setChainId(`${chainIdNew}`);
        setUserReady(true);
      } catch (err: Error | unknown) {
        console.log(err);
        if (err instanceof UserRejectException) {
          showAppError(err.message);
        }

        setUserReady(true);
      }
    } else {
      console.log(`Provider not ready yet`);
    }
  };

  React.useEffect(() => {
    const handleNetworkChange = () => {
      setChainId(`${chainId}`);
      window.location.reload();
    };

    let isChangingAccount = false;
    const handleAccountChange = async () => {
      isChangingAccount = true;
      window.onfocus = async () => {
        if (isChangingAccount) {
          setTimeout(async () => {
            isChangingAccount = false;
            try {
              await providerManager?.signIn();
              setUser({ address: providerManager?.account ?? '' });
              const chainIdNew = providerManager?.chainId ?? 1;
              setChainId(`${chainIdNew}`);
            } catch (err) {
              if (err instanceof UserRejectException) {
                showAppError(err.message);
                return;
              }
              console.error(err);
            }
            window.location.reload();
          }, 500);
        }
      };
    };

    const onConnect = () => {
      return;
    };

    const onDisconnect = () => {
      signOut();
    };

    if (providerManager) {
      providerManager.on(ProviderEvents.AccountsChanged, handleAccountChange);
      providerManager.on(ProviderEvents.ChainChanged, handleNetworkChange);
      providerManager.on(ProviderEvents.Connect, onConnect);
      providerManager.on(ProviderEvents.Disconnect, onDisconnect);
    }

    return () => {
      providerManager?.removeListener?.(ProviderEvents.AccountsChanged, handleAccountChange);
      providerManager?.removeListener?.(ProviderEvents.ChainChanged, handleNetworkChange);
      providerManager?.removeListener?.(ProviderEvents.Connect, onConnect);
      providerManager?.removeListener?.(ProviderEvents.Disconnect, onDisconnect);
    };
  }, [providerManager]);

  const signOut = async (): Promise<void> => {
    setUser(null);
    providerManager?.disconnect();
    window.location.reload();
  };

  const checkSignedIn = () => {
    if (!user?.address) {
      toastWarning('Please sign in.');
      return false;
    }
    return true;
  };

  const value: AppContextType = {
    user,
    signOut,
    checkSignedIn,
    userReady,
    chainId,
    showAppError,
    showAppMessage,
    headerPosition,
    setHeaderPosition,
    connectWallet,
    providerManager,
    userFollowingCollections: followingCollections,
    fetchFollowingCollections
  };

  return (
    <AppContext.Provider value={value} {...props}>
      {props.children}

      <Toaster />
    </AppContext.Provider>
  );
}

export function useAppContext(): AppContextType {
  return React.useContext(AppContext) as AppContextType;
}

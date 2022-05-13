import { BaseCollection, CardData } from '@infinityxyz/lib/types/core';
import { useEffect, useRef, useState } from 'react';
import { TokensGrid } from 'src/components/astra/token-grid';
import { BGImage, CenteredContent, ReadMoreText, Spacer, Toaster, toastSuccess } from 'src/components/common';
import { twMerge } from 'tailwind-merge';
import { AstraNavbar, AstraNavTab } from 'src/components/astra/astra-navbar';
import { AstraSidebar } from 'src/components/astra/astra-sidebar';
import { AstraCart } from 'src/components/astra/astra-cart';
import { inputBorderColor } from 'src/utils/ui-constants';
import { CollectionTokenFetcher, TokenFetcher, UserTokenCache } from 'src/components/astra/token-fetcher';
import { useAppContext } from 'src/utils/context/AppContext';
import { useCardSelection } from 'src/components/astra/useCardSelection';

export const PixelScore = () => {
  const [collection, setCollection] = useState<BaseCollection>();
  const [currentTab, setCurrentTab] = useState<AstraNavTab>(AstraNavTab.All);

  const [chainId, setChainId] = useState<string>();
  const [showCart, setShowCart] = useState(false);
  const [numTokens, setNumTokens] = useState(0);
  const [tokenFetcher, setTokenFetcher] = useState<TokenFetcher>();

  const { selectedCards, isSelected, toggleSelection, clearSelection, removeFromSelection, hasSelection } =
    useCardSelection();

  const ref = useRef<HTMLDivElement>(null);
  const { user } = useAppContext();

  useEffect(() => {
    setShowCart(hasSelection);
  }, [hasSelection]);

  useEffect(() => {
    ref.current?.scrollTo({ left: 0, top: 0 });
  }, [collection]);

  useEffect(() => {
    if (currentTab === AstraNavTab.All && collection && chainId) {
      setTokenFetcher(new CollectionTokenFetcher(collection, chainId));
    }
  }, [currentTab, collection, chainId]);

  useEffect(() => {
    if (currentTab === AstraNavTab.MyNFTs && user) {
      setTokenFetcher(UserTokenCache.shared().fetcher(user.address));
    }
  }, [currentTab, user]);

  const onCardClick = (data: CardData) => {
    toggleSelection(data);
  };

  let tokensGrid;
  let avatarUrl;
  let name = '';
  let description = '';
  let emptyMessage = '';

  switch (currentTab) {
    case AstraNavTab.All:
      avatarUrl = collection?.metadata.bannerImage;
      name = collection?.metadata.name ?? '';
      description = collection?.metadata.description ?? '';
      emptyMessage = 'Select a Collection';
      break;
    case AstraNavTab.MyNFTs:
      name = currentTab;
      emptyMessage = currentTab;

      if (!user) {
        emptyMessage = 'Click Connect to sign in';
      }
      break;
    case AstraNavTab.Hot:
    case AstraNavTab.Pending:
    case AstraNavTab.Top100:
      name = currentTab;
      emptyMessage = currentTab;
      break;
  }

  if (tokenFetcher) {
    const header = (
      <div className={twMerge(inputBorderColor, 'flex items-center bg-gray-100 border-b px-8 py-3')}>
        <BGImage src={avatarUrl} className="mr-6 h-16 w-36 rounded-xl" />
        <div className="flex flex-col items-start bg-gray-100">
          <div className="tracking-tight text-theme-light-800 font-bold text-xl text-center  ">{name}</div>
          <div className="max-w-3xl">
            <ReadMoreText text={description} min={50} ideal={160} max={10000} />
          </div>
        </div>
        <Spacer />
        <div className="text-lg whitespace-nowrap ml-3">{numTokens} items</div>
      </div>
    );

    tokensGrid = (
      <div className="flex flex-col h-full w-full">
        {header}
        <TokensGrid
          tokenFetcher={tokenFetcher}
          className="px-8 py-6"
          onClick={onCardClick}
          isSelected={(data) => {
            return isSelected(data);
          }}
          onLoad={(value) => setNumTokens(value)}
        />
      </div>
    );
  } else {
    tokensGrid = <CenteredContent>{emptyMessage}</CenteredContent>;
  }

  const handleCheckout = () => {
    clearSelection();

    toastSuccess('Success', 'Your Pixel Scores has been calculated');
  };

  const gridTemplate = (
    navBar: JSX.Element,
    sideBar: JSX.Element,
    grid: JSX.Element,
    cart: JSX.Element,
    footer: JSX.Element
  ) => {
    return (
      <div className="h-screen w-screen grid grid-rows-[auto_1fr] grid-cols-[auto_1fr_auto]">
        <div className="col-span-full">{navBar}</div>

        <div className="row-span-3 col-span-1">{sideBar}</div>

        <div ref={ref} className="col-span-1 overflow-y-scroll overflow-x-hidden">
          {grid}
        </div>

        <div className="row-span-3 col-span-1 overflow-y-auto overflow-x-hidden">
          <div className={twMerge(showCart ? 'w-64' : 'w-0', 'transition-width duration-500 h-full')}>{cart}</div>
        </div>

        <div className="col-start-2 col-span-1">{footer}</div>
      </div>
    );
  };

  const navBar = (
    <AstraNavbar
      currentTab={currentTab}
      onTabChange={(value) => {
        // blanks out the cards
        setTokenFetcher(undefined);
        setCollection(undefined);

        // set tab so new cards will load
        setCurrentTab(value);
      }}
    />
  );

  const sidebar = (
    <AstraSidebar
      selectedCollection={collection}
      onClick={(value) => {
        // avoid clicking if already selected (avoids a network fetch)
        if (value.address !== collection?.address) {
          setCollection(value);
          setChainId(value.chainId);
        }

        setCurrentTab(AstraNavTab.All);
      }}
    />
  );

  const cart = (
    <AstraCart
      cardData={selectedCards()}
      onCheckout={handleCheckout}
      onRemove={(value) => {
        removeFromSelection(value);
      }}
    />
  );

  const footer = (
    <div className={twMerge(inputBorderColor, 'px-6 py-1 flex justify-center border-t bg-slate-200')}>
      <div className="text-lg"> {name}</div>
      <Spacer />
      <div className="text-lg">{numTokens} items</div>
    </div>
  );

  const contents = gridTemplate(navBar, sidebar, tokensGrid, cart, footer);

  return (
    <div>
      {contents}
      <Toaster />
    </div>
  );
};

export default PixelScore;

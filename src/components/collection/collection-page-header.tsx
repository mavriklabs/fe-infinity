import { ChainId, Collection, CollectionStats } from '@infinityxyz/lib-frontend/types/core';
import { useState } from 'react';
import { FaDiscord, FaInstagram, FaTwitter } from 'react-icons/fa';
import { HiOutlineExternalLink } from 'react-icons/hi';
import { BlueCheck, ClipboardButton, EZImage, EthSymbol, ReadMoreText, Spacer } from 'src/components/common';
import etherscanLogo from 'src/images/etherscan-logo.png';
import { ellipsisAddress, getChainScannerBase } from 'src/utils';
import {
  borderColor,
  brandBorderColor,
  hoverColor,
  hoverColorBrandText,
  secondaryBgColor,
  secondaryTextColor,
  smallIconButtonStyle
} from 'src/utils/ui-constants';
import { twMerge } from 'tailwind-merge';
import { AOutlineButton } from '../astra/astra-button';
import useScreenSize from 'src/hooks/useScreenSize';

export interface CollectionPageHeaderProps {
  expanded: boolean;
  avatarUrl: string;
  title: string;
  slug: string;
  description?: string;
  hasBlueCheck?: boolean;
  children?: React.ReactNode;
  collection?: Collection & Partial<CollectionStats>;
  totalVol: string | number | null | undefined;
  floorPrice: string | number | null | undefined;
  numOwners: string | number | null | undefined;
  numNfts: string | number | null | undefined;
  twitterFollowers: string | number | null | undefined;
  discordFollowers: string | number | null | undefined;
  tabs: string[];
  onTabChange: (tab: string) => void;
}

export const CollectionPageHeader = ({
  expanded,
  avatarUrl,
  title,
  description,
  hasBlueCheck,
  collection,
  totalVol,
  floorPrice,
  numOwners,
  numNfts,
  tabs,
  onTabChange
}: CollectionPageHeaderProps) => {
  const [selectedTab, setSelectedTab] = useState(tabs[0]);
  const { isDesktop } = useScreenSize();

  const chainId = (collection?.chainId ?? '1') as ChainId;

  // const { result: matchingEngineStatus, isInitialLoadComplete } = useMatchingEngineCollection(
  //   collection?.address ?? '',
  //   chainId
  // );

  return (
    <div className={twMerge(borderColor, secondaryBgColor, 'border-b px-6')}>
      {expanded && (
        <div className="flex flex-col space-y-3">
          <div className="flex w-full items-center text-center md:flex-row flex-col mt-2">
            <EZImage
              src={avatarUrl}
              className="md:mr-4 h-14 w-14 rounded-lg cursor-pointer hover:scale-90 duration-100"
              onClick={() => window.open(collection?.metadata?.links?.external)}
            />
            <div className="md:flex w-full items-center space-x-2">
              <div className="font-bold font-heading text-xl">{title}</div>

              {isDesktop && (
                <>
                  <div className="flex p-2 text-sm space-x-2 items-center justify-center">
                    {hasBlueCheck ? <BlueCheck /> : null}
                    <div>{ellipsisAddress(collection?.address).toLowerCase()}</div>
                    <div className={twMerge('cursor-pointer p-2 rounded-lg', hoverColor)}>
                      <ClipboardButton
                        textToCopy={collection?.address ?? ''}
                        className={twMerge(smallIconButtonStyle)}
                      />
                    </div>
                  </div>
                  <Spacer />
                  {collection?.metadata?.links?.external ? (
                    <>
                      <AOutlineButton
                        className={hoverColor}
                        onClick={() => window.open(collection.metadata?.links?.external)}
                      >
                        <span className="flex items-center">
                          <EZImage src={avatarUrl} className="mr-2 h-5 w-5 rounded-full" />
                          <HiOutlineExternalLink className="text-md" />
                        </span>
                      </AOutlineButton>
                    </>
                  ) : null}

                  <AOutlineButton
                    className={hoverColor}
                    onClick={() => window.open(getChainScannerBase(chainId) + '/address/' + collection?.address)}
                  >
                    <span className="flex items-center">
                      <EZImage src={etherscanLogo.src} className="mr-2 h-5 w-5 rounded-lg" />
                      <HiOutlineExternalLink className="text-md" />
                    </span>
                  </AOutlineButton>

                  {collection?.metadata?.links?.twitter ? (
                    <AOutlineButton
                      className={hoverColor}
                      onClick={() => window.open(collection?.metadata?.links?.twitter)}
                    >
                      <span className="flex items-center text-sm">
                        <div className="">
                          <FaTwitter className="text-brand-twitter h-5 w-5" />
                        </div>
                        {/* {twitterFollowers ?? ''} */}
                      </span>
                    </AOutlineButton>
                  ) : null}

                  {collection?.metadata?.links?.discord ? (
                    <AOutlineButton
                      className={hoverColor}
                      onClick={() => window.open(collection?.metadata?.links?.discord)}
                    >
                      <span className="flex items-center text-sm">
                        <div className="">
                          <FaDiscord className="text-brand-discord h-5 w-5" />
                        </div>
                        {/* {discordFollowers ?? ''} */}
                      </span>
                    </AOutlineButton>
                  ) : null}

                  {collection?.metadata?.links?.instagram ? (
                    <AOutlineButton
                      className={hoverColor}
                      onClick={() => window.open(collection?.metadata?.links?.instagram)}
                    >
                      <FaInstagram className="text-xl" />
                    </AOutlineButton>
                  ) : null}
                </>
              )}
            </div>
          </div>

          {description && isDesktop ? (
            <div className="max-w-5xl text-sm md:text-left text-center">
              <ReadMoreText text={description} min={30} ideal={60} max={100} />
            </div>
          ) : null}
        </div>
      )}

      {/* <div className="flex mt-4">
        <div className="flex text-sm items-center">
          <div className="flex pr-4 gap-2 whitespace-nowrap font-medium">
            <span className={secondaryTextColor}>Matching Engine </span>
            <span className="">
              {!isInitialLoadComplete ? (
                <StatusIcon status="pending-indefinite" label="Loading..." />
              ) : (
                <MatchingEngineStatusIcon matchingEngineStatus={matchingEngineStatus} component="matchingEngine" />
              )}
            </span>
          </div>
          <div className="flex pr-4 gap-2 whitespace-nowrap font-medium">
            <span className={secondaryTextColor}>Order Relay </span>
            <span className="">
              {!isInitialLoadComplete ? (
                <StatusIcon status="pending-indefinite" label="Loading..." />
              ) : (
                <MatchingEngineStatusIcon matchingEngineStatus={matchingEngineStatus} component="orderRelay" />
              )}
            </span>
          </div>
          <div className="flex pr-4 gap-2 whitespace-nowrap font-medium">
            <span className={secondaryTextColor}>Execution Engine </span>
            <span className="">
              {!isInitialLoadComplete ? (
                <StatusIcon status="pending-indefinite" label="Loading..." />
              ) : (
                <MatchingEngineStatusIcon matchingEngineStatus={matchingEngineStatus} component="executionEngine" />
              )}
            </span>
          </div>
        </div>
      </div> */}

      <div className="flex mt-4 text-sm gap-3">
        <div className="flex space-x-3 overflow-auto scrollbar-hide">
          {tabs.map((e) => {
            return (
              <div key={e} className={twMerge('pb-2 px-3', selectedTab === e ? `border-b-2 ${brandBorderColor}` : '')}>
                <div
                  className={twMerge(
                    selectedTab === e ? '' : secondaryTextColor,
                    hoverColorBrandText,
                    'font-medium cursor-pointer'
                  )}
                  onClick={() => {
                    setSelectedTab(e);
                    onTabChange(e);
                  }}
                >
                  {e}
                </div>
              </div>
            );
          })}
        </div>

        <Spacer />

        <div className="md:flex hidden text-sm divide-x divide-light-border dark:divide-dark-border items-center">
          {Number(floorPrice) > 0 && (
            <div className="flex pr-4 gap-2 whitespace-nowrap font-medium">
              <span className={secondaryTextColor}>Floor </span>
              <span className="">
                {floorPrice ?? '-'} {EthSymbol}
              </span>
            </div>
          )}
          <div className="flex px-4 gap-2 whitespace-nowrap font-medium">
            <span className={secondaryTextColor}>Total Vol </span>
            <span className="">
              {totalVol ?? '-'} {EthSymbol}
            </span>
          </div>
          <div className="flex px-4 gap-2 whitespace-nowrap font-medium">
            <span className={secondaryTextColor}>Owners </span>
            <span className="">{numOwners ?? '-'}</span>
          </div>
          <div className="flex pl-4 gap-2 whitespace-nowrap font-medium">
            <span className={secondaryTextColor}>Items </span>
            <span className="">{numNfts ?? '-'}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

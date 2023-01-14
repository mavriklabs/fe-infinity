import { CollectionAttributes, Erc721Token, Token } from '@infinityxyz/lib-frontend/types/core';
import { ActivityList } from 'src/components/asset';
import { OrderbookContainer } from 'src/components/orderbook/list';
import { ellipsisAddress, useFetch } from 'src/utils';
import { dropShadow } from 'src/utils/ui-constants';
import { useSWRConfig } from 'swr';
import { twMerge } from 'tailwind-merge';
import { BlueCheck, EZImage, Modal, NextLink, ReadMoreText, ShortAddress, ToggleTab, useToggleTab } from '../../common';
import { ATraitList } from '../astra-trait-list';
import { ErrorOrLoading } from '../error-or-loading';
import { BasicTokenInfo } from '../types';

interface Props {
  data: BasicTokenInfo;
  modalOpen: boolean;
  setModalOpen: (set: boolean) => void;
}

// todo: is this necessary?
const useFetchAssetInfo = (chainId: string, collection: string, tokenId: string) => {
  const { mutate } = useSWRConfig();
  const NFT_API_ENDPOINT = `/collections/${chainId}:${collection}/nfts/${tokenId}`;
  const COLLECTION_ATTRIBUTES_API_ENDPOINT = `/collections/${chainId}:${collection}/attributes`;
  const tokenResponse = useFetch<Token>(NFT_API_ENDPOINT);
  const collectionAttributes = useFetch<CollectionAttributes>(COLLECTION_ATTRIBUTES_API_ENDPOINT);

  return {
    isLoading: tokenResponse.isLoading,
    error: tokenResponse.error,
    token: tokenResponse.result,
    collectionAttributes: collectionAttributes.result,
    refreshAssetInfo: () => {
      mutate(NFT_API_ENDPOINT);
      mutate(COLLECTION_ATTRIBUTES_API_ENDPOINT);
    }
  };
};

export const TokenCardModal = ({ data, modalOpen, setModalOpen }: Props): JSX.Element | null => {
  const { options, onChange, selected } = useToggleTab(['Activity', 'Orders'], 'Activity');
  const { token, error, collectionAttributes } = useFetchAssetInfo(data.chainId, data.collectionAddress, data.tokenId);

  if (error) {
    return <ErrorOrLoading error={!!error} noData message="No Data" />;
  }

  if (!token) {
    return null;
  }

  return (
    <Modal
      isOpen={modalOpen}
      showActionButtons={false}
      onClose={() => setModalOpen(false)}
      panelClassName={twMerge('max-w-6xl', dropShadow)}
    >
      <div className="flex space-x-4 text-sm">
        <div className="flex-1">
          <div className="flex flex-col gap-10 mr-auto md:flex-row md:items-start">
            <div className="md:flex-1 ">
              <div className="flex items-center mb-2">
                <NextLink
                  href={`/collection/${token.collectionSlug || `${token.chainId}:${token.collectionAddress}`}`}
                  className="font-heading tracking-tight mr-2"
                >
                  <div>{token.collectionName || ellipsisAddress(token.collectionAddress) || 'Collection'}</div>
                </NextLink>
                {token.hasBlueCheck && <BlueCheck />}
              </div>
              <h3 className="font-body text-2xl font-bold mb-2">{token.tokenId}</h3>
              <ShortAddress
                label="Collection address:"
                address={token.collectionAddress ?? ''}
                href={`https://etherscan.io/address/${token.collectionAddress}`}
                tooltip={token.collectionAddress ?? ''}
              />
              <ShortAddress
                className="mt-2"
                label="Owned by:"
                address={token?.owner?.toString() || ''}
                href={`https://infinity.xyz/profile/${token?.owner?.toString() || ''}`}
                tooltip={token.owner?.toString() || ''}
              />

              {token.metadata.description && (
                <>
                  <div className="mt-2">
                    <ReadMoreText text={token.metadata.description ?? ''} min={100} ideal={150} max={300} />
                  </div>
                </>
              )}

              <div className="min-h-[50vh] mt-10">
                <ToggleTab
                  className="flex space-x-2 items-center relative max-w-xl font-heading text-sm"
                  options={options}
                  selected={selected}
                  onChange={onChange}
                />

                {selected === 'Activity' && (
                  <ActivityList
                    chainId={token?.chainId ?? '1'} // default
                    collectionAddress={token?.collectionAddress ?? ''}
                    token={token}
                  />
                )}

                {selected === 'Orders' && (
                  <div className="">
                    <OrderbookContainer
                      collectionId={token?.collectionAddress}
                      tokenId={token?.tokenId}
                      canShowAssetModal={false}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col">
          <EZImage
            src={token?.image?.url ?? token.alchemyCachedImage ?? token.image?.originalUrl ?? ''}
            className="h-80 w-80 rounded-lg"
          />
          <ATraitList
            traits={(token as Erc721Token).metadata.attributes ?? []}
            collectionTraits={collectionAttributes ?? {}}
          />
        </div>
      </div>
    </Modal>
  );
};

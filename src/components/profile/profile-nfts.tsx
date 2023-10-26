import { useEffect, useState } from 'react';
import { MdClose } from 'react-icons/md';
import { TokenGrid } from 'src/components/astra/token-grid/token-grid';
import { useProfileTokenFetcher } from 'src/hooks/api/useTokenFetcher';
import { useAppContext } from 'src/utils/context/AppContext';
import { SelectedCollectionType, useProfileContext } from 'src/utils/context/ProfileContext';
import { TokensFilter } from 'src/utils/types';
import { borderColor, hoverColor, hoverColorBrandText, selectedColor } from 'src/utils/ui-constants';
import { twMerge } from 'tailwind-merge';
import { Checkbox, EZImage, TextInputBox } from '../common';
import { CollectionSearchInput } from '../common/search/collection-search-input';

interface Props {
  userAddress: string;
  isOwner: boolean;
}

export const ProfileNFTs = ({ userAddress, isOwner }: Props) => {
  const { selectedCollection, setSelectedCollection } = useProfileContext();
  const {
    isNFTSelected,
    isNFTSelectable,
    listMode,
    toggleNFTSelection,
    toggleMultipleNFTSelection,
    selectedProfileTab
  } = useAppContext();
  const { selectedChain } = useAppContext();
  const [filter, setFilter] = useState<TokensFilter>({ hideSpam: false });

  const { data, error, hasNextPage, isLoading, fetch } = useProfileTokenFetcher(userAddress, selectedChain, filter);
  const [numSweep, setNumSweep] = useState('');
  const [customSweep, setCustomSweep] = useState('');

  useEffect(() => {
    const numToSelect = Math.min(data.length, parseInt(numSweep));
    const tokens = [];
    for (let i = 0; i < numToSelect; i++) {
      tokens.push(data[i]);
    }
    toggleMultipleNFTSelection(tokens);
  }, [numSweep]);

  useEffect(() => {
    fetch(false);
  }, [filter]);

  useEffect(() => {
    if (selectedCollection) {
      handleCollectionSearchResult(selectedCollection);
    } else {
      handleCollectionSearchClear();
    }
  }, [selectedCollection, selectedProfileTab]);

  const handleCollectionSearchResult = (result: SelectedCollectionType) => {
    const newFilter = { ...filter };
    newFilter.collections = [result.address];
    setFilter(newFilter);
    setSelectedCollection(result);
  };

  const handleCollectionSearchClear = () => {
    const newFilter = { ...filter };
    newFilter.collections = [];
    setFilter(newFilter);
    setSelectedCollection(undefined);
  };

  const multiSelect = () => {
    return (
      <div className={twMerge('flex md:my-0 my-2 h-10 gap-0.25 rounded-lg cursor-pointer text-sm', borderColor)}>
        {/* <div className={twMerge('md:flex hidden items-center border-r-[1px] px-6 cursor-default', borderColor)}>
          Select
        </div> */}
        <div
          className={twMerge(
            'px-4 h-full flex rounded-l-lg items-center bg-zinc-300 dark:bg-neutral-800',
            borderColor,
            hoverColor,
            numSweep === '5' && selectedColor
          )}
          onClick={() => {
            numSweep === '5' ? setNumSweep('') : setNumSweep('5');
          }}
        >
          5
        </div>
        <div
          className={twMerge(
            'px-4 h-full flex items-center bg-zinc-300 dark:bg-neutral-800',
            borderColor,
            hoverColor,
            numSweep === '10' && selectedColor
          )}
          onClick={() => {
            numSweep === '10' ? setNumSweep('') : setNumSweep('10');
          }}
        >
          10
        </div>
        <div
          className={twMerge(
            'px-4 h-full flex items-center bg-zinc-300 dark:bg-neutral-800',
            borderColor,
            hoverColor,
            numSweep === '20' && selectedColor
          )}
          onClick={() => {
            numSweep === '20' ? setNumSweep('') : setNumSweep('20');
          }}
        >
          20
        </div>
        <div
          className={twMerge(
            'px-4 h-full flex items-center bg-zinc-300 dark:bg-neutral-800',
            borderColor,
            hoverColor,
            numSweep === '50' && selectedColor
          )}
          onClick={() => {
            numSweep === '50' ? setNumSweep('') : setNumSweep('50');
          }}
        >
          50
        </div>
        <div className="px-4 h-full flex items-center bg-zinc-300 rounded-r-lg dark:bg-neutral-800">
          <TextInputBox
            autoFocus={true}
            inputClassName="text-sm font-body"
            className="border-0 w-14 p-0 text-sm "
            type="number"
            placeholder="Custom"
            value={customSweep}
            onChange={(value) => {
              setNumSweep(value);
              setCustomSweep(value);
            }}
          />
        </div>
      </div>
    );
  };
  const [hideSpam, setHideSpam] = useState(false);
  return (
    <>
      <div className="flex flex-col my-5 space-y-2 text-sm">
        <div className="md:flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <CollectionSearchInput
              expanded
              profileSearch
              setSelectedCollection={(value) => {
                const selectedColl: SelectedCollectionType = {
                  address: value.address,
                  name: value.name,
                  imageUrl: value.profileImage
                };
                handleCollectionSearchResult(selectedColl);
              }}
            />
            {isOwner && multiSelect()}
          </div>
          {/* <Spacer /> */}
          <div>
            <Checkbox boxOnLeft={false} label="Hide spam" checked={hideSpam} onChange={setHideSpam} />
          </div>
        </div>

        {selectedCollection ? (
          <div className={twMerge('flex items-center rounded-lg border p-2 w-fit', borderColor)}>
            <div className="flex items-center">
              <EZImage src={selectedCollection.imageUrl} className="w-6 h-6 rounded-full mr-2" />
              <div className="text-sm font-medium">{selectedCollection.name}</div>
            </div>
            <div className="ml-2">
              <MdClose
                className={twMerge('h-4 w-4 cursor-pointer', hoverColorBrandText)}
                onClick={() => {
                  handleCollectionSearchClear();
                }}
              />
            </div>
          </div>
        ) : null}
      </div>

      <TokenGrid
        listMode={listMode}
        // className="md:px-4 py-4"
        onClick={toggleNFTSelection}
        isSelectable={isNFTSelectable}
        isSelected={isNFTSelected}
        data={data}
        isError={!!error}
        hasNextPage={hasNextPage}
        onFetchMore={() => fetch(true)}
        isLoading={isLoading}
      />
    </>
  );
};

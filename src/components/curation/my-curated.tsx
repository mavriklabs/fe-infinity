import React from 'react';
import { ScrollLoader, Spinner } from 'src/components/common';
import { useFetchInfinite } from 'src/utils';
import { CuratedCollectionsOrderBy } from '@infinityxyz/lib-frontend/types/dto/collections/curation/curated-collections-query.dto';
import { useAppContext } from 'src/utils/context/AppContext';
import { CurationTable } from 'src/components/curation/curations-table';
import { CuratedCollectionsDto } from '@infinityxyz/lib-frontend/types/dto/collections/curation/curated-collections.dto';
import { NoResultsBox } from './no-results-box';
import { CuratedTab } from './types';

export const MyCuratedCollections: React.FC<{ orderBy: CuratedCollectionsOrderBy }> = ({ orderBy }) => {
  const { user } = useAppContext();
  const { result, setSize, error, isLoading } = useFetchInfinite<CuratedCollectionsDto>(
    user?.address ? `/user/${user.address}/curated` : null,
    {
      query: {
        orderBy,
        orderDirection: 'desc',
        limit: 10
      }
    }
  );

  const fetchMore = () => setSize((size) => size + 1);

  return (
    <div>
      {error ? <div className="flex flex-col mt-10">Unable to load curated collections.</div> : null}

      {result && result?.length > 0 && (
        <CurationTable
          collections={result?.map((result) => result.data.collections)}
          curations={result?.map((result) => result.data.curations)}
        />
      )}

      {result && result?.length === 0 && <NoResultsBox tab={CuratedTab.MyCurated} />}

      <ScrollLoader onFetchMore={fetchMore} />

      {isLoading && <Spinner />}
    </div>
  );
};

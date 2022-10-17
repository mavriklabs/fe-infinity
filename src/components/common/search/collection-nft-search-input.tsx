import { ChainId, SearchType } from '@infinityxyz/lib-frontend/types/core';
import { useSearch, useSearchState } from 'src/hooks/api/useSearch';
import { SearchInput } from './search-input';

interface Props {
  expanded?: boolean;
  slug: string;
}

export const CollectionNftSearchInput = ({ expanded, slug }: Props) => {
  const { search, setSubTypeQuery } = useSearchState<SearchType.Collection, 'slug', 'nft'>({
    type: SearchType.Collection,
    query: slug,
    searchBy: 'slug',
    limit: 10,
    subType: 'nft',
    subTypeQuery: '',
    cursor: '',
    chainId: ChainId.Mainnet,
    subTypeSearchBy: 'tokenId'
  });
  const { result } = useSearch(search);

  return (
    <SearchInput
      expanded={expanded}
      query={'subTypeQuery' in search ? search.subTypeQuery : ''}
      setQuery={setSubTypeQuery}
      data={result.data}
    />
  );
};
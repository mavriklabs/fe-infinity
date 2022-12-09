import { CenteredContent } from 'src/components/common';
import { ERC721CardData } from '@infinityxyz/lib-frontend/types/core';
import { TokensGrid } from 'src/components/astra/token-grid/token-grid';
import { useDashboardContext } from 'src/utils/context/DashboardContext';
import { GridHeader } from './grid-header';
import { useRouter } from 'next/router';

export const DashboardBase = () => {
  const { setNumTokens, tokenFetcher, isSelected, isSelectable, toggleSelection, gridWidth } = useDashboardContext();

  const router = useRouter();

  const onCardClick = (data: ERC721CardData) => {
    toggleSelection(data);
  };

  const currentPath = () => {
    let result = router.asPath;

    if (result === '/new') {
      result = '/new/items';
    }

    return result;
  };

  const findSlugMatchingCmp = () => {
    if (tokenFetcher) {
      const routes = [
        {
          slug: '/new/items',
          label: 'Items',
          component: (
            <TokensGrid
              tokenFetcher={tokenFetcher}
              className="px-8 py-6"
              onClick={onCardClick}
              wrapWidth={gridWidth}
              isSelectable={isSelectable}
              isSelected={(data) => {
                return isSelected(data);
              }}
              onLoad={(value) => setNumTokens(value)}
            />
          )
        },
        {
          slug: '/new/orders',
          label: 'Orders',
          component: <div>Orders</div>
        }
      ];

      const result = routes.find((cmp) => {
        return cmp.slug === currentPath();
      });

      if (result) {
        return result;
      }
    }

    return {
      slug: 'error',
      label: 'Error',
      component: <div>error</div>
    };
  };

  const cmp = findSlugMatchingCmp().component;
  const exten = <div className="overflow-y-auto">{cmp}</div>;

  let result;

  const emptyMessage = 'Select a Collection';

  if (tokenFetcher) {
    result = (
      <div className="flex flex-col h-full w-full">
        <GridHeader />
        {exten}
      </div>
    );
  } else {
    result = <CenteredContent>{emptyMessage}</CenteredContent>;
  }

  return result;
};

import { CuratedCollectionsOrderBy } from '@infinityxyz/lib-frontend/types/dto/collections/curation/curated-collections-query.dto';
import React from 'react';
import { Dropdown } from '../common';

export type SortProps = {
  onClick: (orderBy: CuratedCollectionsOrderBy) => void;
};

export const Sort: React.FC<SortProps> = ({ onClick }) => (
  <Dropdown
    label="Sort"
    className="pointer-events-auto ml-8"
    items={[
      {
        label: 'Most votes',
        onClick: () => onClick(CuratedCollectionsOrderBy.Votes)
      },
      {
        label: 'APR: High to low',
        onClick: () => onClick(CuratedCollectionsOrderBy.AprHighToLow)
      },
      {
        label: 'APR: Low to high',
        onClick: () => onClick(CuratedCollectionsOrderBy.AprLowToHigh)
      }
    ]}
  />
);
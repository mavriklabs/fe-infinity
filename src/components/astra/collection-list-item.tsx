import React from 'react';
import { BGImage } from 'src/components/common';
import { BLANK_IMAGE_URL } from 'src/utils';
import { CollectionSearchDto } from '../../utils/types/collection-types';
import { twMerge } from 'tailwind-merge';
import { inputBorderColor } from 'src/utils/ui-constants';

interface Props2 {
  collection: CollectionSearchDto;
  selected: boolean;
  onClick: (collection: CollectionSearchDto) => void;
}

const getAvatarUrl = (imgUrl: string) => {
  if (!imgUrl) {
    return null;
  } else {
    const index = imgUrl.indexOf('=');
    if (index) {
      return imgUrl.slice(0, index) + '=h100';
    }
    return imgUrl;
  }
};

export const CollectionListItem = ({ collection, onClick, selected }: Props2) => {
  const avatarUrl = getAvatarUrl(collection.bannerImage) || BLANK_IMAGE_URL;

  return (
    <div className="relative">
      <div
        className={twMerge(
          'w-full cursor-pointer border bg-white rounded-lg overflow-clip h-24',
          inputBorderColor,
          selected ? 'outline-4 outline-slate-400 outline-offset-1 outline' : ''
        )}
        onClick={() => onClick(collection)}
      >
        <BGImage src={avatarUrl} />

        <div className="absolute top-0 left-0 bottom-0 right-0 flex flex-col items-center justify-center">
          <div className=" text-center tracking-tight text-2xl font-bold text-white text-shadow">{collection.name}</div>
        </div>
      </div>
    </div>
  );
};

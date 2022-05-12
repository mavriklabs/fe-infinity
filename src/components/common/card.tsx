import { ReactNode } from 'react';
import { CardData } from '@infinityxyz/lib/types/core';
import { twMerge } from 'tailwind-merge';
import { AiOutlineEye } from 'react-icons/ai';
import { Dropdown, DropdownItems } from './dropdown';
import { Button } from './button';
import { NextLink } from './next-link';
import ContentLoader from 'react-content-loader';
import { inputBorderColor } from 'src/utils/ui-constants';
import { BGImage } from './bg-image';

type labelFn = (data?: CardData) => ReactNode;

type CardAction = {
  label: string | ReactNode | labelFn;
  onClick: (ev: React.MouseEvent<HTMLButtonElement, globalThis.MouseEvent>, data?: CardData) => void;
};

export interface CardProps {
  data?: CardData;
  cardActions?: CardAction[];
  dropdownActions?: DropdownItems[];
  isLoading?: boolean;
  className?: string;
}

export const Card = ({ data, cardActions, dropdownActions, isLoading, className }: CardProps): JSX.Element => {
  const title = (data?.title ?? '').length > 30 ? data?.title?.slice(0, 30) + '...' : data?.title;
  const tokenId = (data?.tokenId ?? '').length > 30 ? data?.tokenId?.slice(0, 30) + '...' : data?.tokenId;

  const buttonJsx = (
    <>
      {(cardActions ?? []).map((cardAction, idx) => {
        return (
          <Button
            key={idx}
            variant="outline"
            className="flex-1 py-3 font-medium"
            onClick={(ev) => {
              cardAction.onClick(ev, data);
            }}
          >
            {typeof cardAction.label === 'function' ? cardAction.label(data) : cardAction.label}
          </Button>
        );
      })}
    </>
  );

  if (isLoading) {
    return <LoadingCard className={className} />;
  }
  return (
    <div className={twMerge(`sm:mx-0 relative flex flex-col pointer-events-auto ${className ?? ''}`)}>
      <NextLink href={`/asset/${data?.chainId}/${data?.tokenAddress ?? data?.address}/${data?.tokenId}`}>
        <BGImage className="rounded-3xl h-[290px]" src={data?.image ?? ''} />
      </NextLink>

      {data?.rarityRank && (
        <span className="absolute bg-gray-100 top-3 right-3 py-1 px-3 rounded-full">
          {Math.round(data?.rarityRank)}
        </span>
      )}

      <div className="p-1 mt-3">
        <div className="font-bold truncate" title={data?.title}>
          {title}
        </div>
        <div className="text-secondary font-heading" title={data?.tokenId}>
          {tokenId}
        </div>
      </div>

      <footer className="text-sm flex items-center justify-between mt-3">
        {buttonJsx}

        {(dropdownActions ?? []).length > 0 ? (
          <Dropdown
            className="ml-2"
            toggler={
              <div className={twMerge(inputBorderColor, 'border rounded-full w-10 h-10 flex flex-col justify-center')}>
                <AiOutlineEye className="w-full text-lg" />
              </div>
            }
            items={dropdownActions ?? []}
          />
        ) : null}
      </footer>
    </div>
  );
};

const LoadingCard = ({ className }: { className?: string }) => (
  <ContentLoader
    speed={2}
    width={290}
    height={290}
    viewBox="0 0 400 460"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    className={className}
  >
    <rect x="5" y="394" rx="18" ry="18" width="390" height="28" />
    <rect x="6" y="7" rx="45" ry="45" width="390" height="372" />
    <rect x="5" y="431" rx="18" ry="18" width="390" height="28" />
  </ContentLoader>
);

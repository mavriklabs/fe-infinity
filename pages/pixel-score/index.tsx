import { BaseCollection, CardData } from '@infinityxyz/lib/types/core';
import { useEffect, useRef, useState } from 'react';
import { TokensGrid } from 'src/components/astra/token-grid';
import { CenteredContent, ReadMoreText, Toaster, toastSuccess } from 'src/components/common';
import { twMerge } from 'tailwind-merge';
import { AstraNavbar } from 'src/components/astra/astra-navbar';
import { AstraSidebar } from 'src/components/astra/astra-sidebar';
import { AstraCart } from 'src/components/astra/astra-cart';
import { inputBorderColor } from 'src/utils/ui-constants';

export const PixelScore = () => {
  const [collection, setCollection] = useState<BaseCollection>();
  const [selectedTokens, setSelectedTokens] = useState<CardData[]>([]);
  const [chainId, setChainId] = useState<string>();
  const [showCart, setShowCart] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const onCardClick = (data: CardData) => {
    const i = indexOfSelection(data);

    if (i === -1) {
      setSelectedTokens([...selectedTokens, data]);
      setShowCart(true);
    } else {
      removeFromSelection(data);
    }
  };

  let tokensGrid;

  if (collection && chainId) {
    tokensGrid = (
      <div className="flex flex-col">
        <div className={twMerge(inputBorderColor, 'flex flex-col items-center bg-gray-100 border-b px-8 py-3')}>
          <div className="tracking-tight font-bold text-xl text-center">{collection.metadata.name}</div>
          <div className=" max-w-3xl">
            <ReadMoreText text={collection.metadata.description} min={10} ideal={340} max={10000} />
          </div>
        </div>
        <TokensGrid
          className="p-8"
          collection={collection}
          chainId={chainId}
          onClick={onCardClick}
          isSelected={(data) => {
            const i = indexOfSelection(data);

            return i !== -1;
          }}
        />
      </div>
    );
  } else {
    tokensGrid = <CenteredContent>Select a Collection</CenteredContent>;
  }

  useEffect(() => {
    ref.current?.scrollTo({ left: 0, top: 0 });
  }, [collection]);

  const indexOfSelection = (value: CardData) => {
    const i = selectedTokens.findIndex((token) => {
      return value.id === token.id;
    });

    return i;
  };

  const removeFromSelection = (value: CardData) => {
    const i = indexOfSelection(value);

    if (i !== -1) {
      const copy = [...selectedTokens];
      copy.splice(i, 1);

      setSelectedTokens(copy);

      if (copy.length === 0) {
        setShowCart(false);
      }
    }
  };

  const handleCheckout = () => {
    setSelectedTokens([]);
    setShowCart(false);

    toastSuccess('Success', 'Your Pixel Scores has been calculated');
  };

  return (
    <div>
      <div className="h-screen w-screen grid grid-rows-[auto_1fr] grid-cols-[auto_1fr_auto]">
        <div className="col-span-3">
          <AstraNavbar />
        </div>

        <div className="row-span-2 col-span-1">
          <AstraSidebar
            selectedCollection={collection}
            onClick={(value) => {
              // avoid clicking if already selected (avoids a network fetch)
              if (value.address !== collection?.address) {
                setCollection(value);
                setChainId(value.chainId);
              }
            }}
          />
        </div>

        {tokensGrid && (
          <div ref={ref} className="row-span-2 col-span-1 overflow-y-auto overflow-x-hidden">
            {tokensGrid}
          </div>
        )}

        <div className="row-span-2 col-span-1 overflow-y-auto overflow-x-hidden">
          <div className={twMerge(showCart ? 'w-64' : 'w-0', 'transition-width duration-500 h-full')}>
            <AstraCart
              tokens={selectedTokens}
              onCheckout={handleCheckout}
              onRemove={(value) => {
                removeFromSelection(value);
              }}
            />
          </div>
        </div>
      </div>

      <Toaster />
    </div>
  );
};

export default PixelScore;

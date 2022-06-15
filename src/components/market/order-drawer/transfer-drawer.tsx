import { ERC721CardData } from '@infinityxyz/lib-frontend/types/core';
import { Button, Spacer, SVG } from 'src/components/common';
import { iconButtonStyle } from 'src/utils/ui-constants';
// import { iconButtonStyle } from 'src/utils/ui-constants';
// import { format } from 'timeago.js';
import { Drawer } from '../../common/drawer';
// import { OrderbookItem } from '../orderbook-list/orderbook-item';

interface Props {
  open: boolean;
  onClose: () => void;
  nftsForTransfer: ERC721CardData[];
  onClickRemove: (item: ERC721CardData) => void;
}

export const TransferDrawer = ({ open, onClose, nftsForTransfer, onClickRemove }: Props) => {
  return (
    <>
      <Drawer
        open={open}
        onClose={onClose}
        subtitle={'Selected NFTs for transferring:'}
        title={<div className="flex items-center">Transfer</div>}
      >
        <div className="flex flex-col h-full">
          <ul className="overflow-y-auto content-between px-12">
            {nftsForTransfer.map((cardData: ERC721CardData) => {
              return (
                <li className="py-3 flex">
                  <div className="w-full flex">
                    <div className="flex-1 truncate">{cardData.tokenId}</div>
                    <button onClick={() => onClickRemove(cardData)}>
                      <SVG.grayDelete className={iconButtonStyle} />
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
          <Spacer />

          <footer className="w-full text-center py-4">
            <Button size="large" onClick={() => alert('todo: transfer listings')}>
              Transfer
            </Button>
          </footer>
        </div>
      </Drawer>
    </>
  );
};

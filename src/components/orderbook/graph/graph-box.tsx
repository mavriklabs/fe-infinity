import { ReactNode } from 'react';
import { cardClr } from 'src/utils/ui-constants';
import { twMerge } from 'tailwind-merge';
import { graphHeight } from './graph-utils';

export enum GraphBoxTheme {
  White,
  Grey,
  Dark
}

interface GraphBoxProps {
  children: ReactNode;
  className?: string;
  noCSSStyles?: boolean;
}

export const GraphBox = ({ children, className = '', noCSSStyles: noStyle = false }: GraphBoxProps) => {
  return (
    <div
      className={twMerge('flex flex-col rounded-xl p-6 overflow-clip', cardClr, className)}
      style={noStyle ? undefined : { height: graphHeight }}
    >
      {children}
    </div>
  );
};

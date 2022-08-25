import { SignedOBOrder } from '@infinityxyz/lib-frontend/types/core';

export type GraphData = {
  isSellOrder: boolean;
  price: number;
  order: SignedOBOrder;
};

export const graphHeight = 720;

export const clamp = (num: number, min: number, max: number): number => {
  return Math.max(min, Math.min(num, max));
};

export const blueBase = '23, 203, 255';
export const barColorSolid = `rgba(${blueBase}, 1)`;
export const textColor = `rgba(${blueBase}, .6)`;
export const barColorLight = `rgba(${blueBase}, .5)`;
export const axisLineColor = `rgba(${blueBase}, .2)`;
export const orangeTextColor = '#a70';

export const blueColor = '#6af';
export const blueColorText = 'text-[#6af]';
export const orangeColor = '#F70';
export const orangeColorText = 'text-[#F70]';
export const orangeColorTextLight = 'text-[#a70]';

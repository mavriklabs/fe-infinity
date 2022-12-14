/* eslint-disable prettier/prettier */
import { TickLabelProps } from '@visx/axis';
import { TextProps } from '@visx/text';
import { labelColor, textColorLight } from '../graph-utils';

export const rateGraphMargins = {
  top: 30,
  right: 0,
  bottom: 74,
  left: 70
};

export const tickLabelStyle: TickLabelProps<string> = () =>
({
  fill: textColorLight,
  fontSize: 16,
  textAnchor: 'middle',
  dy: 6
} as const);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const verticalTickLabelStyle: TickLabelProps<any> = () =>
({
  fill: textColorLight,
  fontSize: 16,
  dx: -10,
  textAnchor: 'end',
  verticalAnchor: 'middle'
} as const);

export const labelStyle: Partial<TextProps> = {
  fill: labelColor,
  fontSize: 16,
  fontWeight: 'bold',
  textAnchor: 'middle'
};
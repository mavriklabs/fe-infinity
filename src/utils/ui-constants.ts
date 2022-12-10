const collectionIconRem = 14;

// only here so purgeCSS doesn't remove the styles we need (sync with collectionIconRem)
// see https://v2.tailwindcss.com/docs/optimizing-for-production
export const purgeCSSHack = 'h-14 w-14';

export const collectionIconHeight = `h-${collectionIconRem}`;
export const collectionIconWidth = `w-${collectionIconRem}`;
export const collectionIconStyle = `${collectionIconHeight} ${collectionIconWidth} rounded-2xl overflow-clip`;

export const collectionIconWidthInPx = (): number => {
  return pixelsPerRem() * collectionIconRem;
};

export const pixelsPerRem = () => {
  return parseFloat(getComputedStyle(document.documentElement).fontSize) * 0.25;
};

export const iconButtonStyle = 'h-6 w-6';
export const smallIconButtonStyle = 'h-5 w-5';
export const largeIconButtonStyle = 'h-8 w-8';

export const secondsPerDay = 86400;
export const weekSeconds = secondsPerDay * 7;
export const thirtyDaySeconds = secondsPerDay * 30;

// used for outline buttons, input boxes etc.
export const inputBorderColor = 'dark:border-dark-border  border-light-border';

export const drawerPx = 'px-8';

export const negativeMargin = 'mt-[-68px]';

export const selectionOutline = 'outline-4 outline-sky-500 outline-offset-1 outline';

export const cardClr = 'dark:bg-dark-card bg-light-card';
export const textClr = 'dark:text-dark-body text-light-body';

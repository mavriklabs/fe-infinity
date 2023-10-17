import React from 'react';
import { IconProps } from '.';
import { twMerge } from 'tailwind-merge';
import { sidebarIconColors } from 'src/utils/ui-constants';

export const ThemeSwitcherIcon = ({ className }: IconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="41"
    height="40"
    viewBox="0 0 41 40"
    fill="none"
    className={twMerge(sidebarIconColors, className)}
  >
    <path
      d="M20.2857 10V12.8571H21.7143V10H20.2857ZM13.1429 12.1429V13.5714H14.5714V12.1429H13.1429ZM14.5714 13.5714V15H16V13.5714H14.5714ZM27.4286 12.1429V13.5714H28.8571V12.1429H27.4286ZM27.4286 13.5714H26V15H27.4286V13.5714ZM18.1429 14.2857V15.7143H23.8571V14.2857H18.1429ZM23.8571 15.7143V17.1429H25.2857V15.7143H23.8571ZM25.2857 17.1429V22.8571H26.7143V17.1429H25.2857ZM25.2857 22.8571H23.8571V24.2857H25.2857V22.8571ZM23.8571 24.2857H18.1429V25.7143H23.8571V24.2857ZM18.1429 24.2857V22.8571H16.7143V24.2857H18.1429ZM16.7143 22.8571V17.1429H15.2857V22.8571H16.7143ZM16.7143 17.1429H18.1429V15.7143H16.7143V17.1429ZM11 19.2857V20.7143H13.8571V19.2857H11ZM28.1429 19.2857V20.7143H31V19.2857H28.1429ZM14.5714 25V26.4286H16V25H14.5714ZM14.5714 26.4286H13.1429V27.8571H14.5714V26.4286ZM26 25V26.4286H27.4286V25H26ZM27.4286 26.4286V27.8571H28.8571V26.4286H27.4286ZM20.2857 27.1429V30H21.7143V27.1429H20.2857Z"
      fill="currentColor"
    />
    <rect x="1" y="0.5" width="39" height="39" rx="19.5" stroke="#F7F7F7" className="dark:hidden" />
    <rect x="1" y="0.5" width="39" height="39" rx="19.5" stroke="#222222" className="hidden dark:block" />
  </svg>
);

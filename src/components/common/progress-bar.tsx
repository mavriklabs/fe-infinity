import React from 'react';
import { twMerge } from 'tailwind-merge';
import clsx from 'classnames';

export type ProgressBarProps = {
  percentage: number;
  className?: string;
};

export const ProgressBar: React.FC<ProgressBarProps> = ({ children, className, percentage }) => {
  return (
    <div className={twMerge('bg-gray-100 rounded-3xl w-full relative', className)}>
      <div
        className={clsx('bg-[#92DEFF] rounded-3xl text-sm font-normal py-6', { 'rounded-r-none': percentage < 100 })}
        style={{ width: `${percentage}%` }}
      ></div>

      <div className="absolute top-3 left-4 z-10">{children}</div>
      <span className="absolute top-3 right-4 z-10 font-black">{percentage}%</span>
    </div>
  );
};

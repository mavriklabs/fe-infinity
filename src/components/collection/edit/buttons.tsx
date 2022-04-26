import { AiOutlinePlus } from 'react-icons/ai';
import { Button, Props as ButtonProps } from 'src/components/common';
import { twMerge } from 'tailwind-merge';

export const PlusButton: React.FC<ButtonProps> = ({ children, className, ...props }) => (
  <Button {...props} className={twMerge('w-full border rounded-3xl border-gray-100 bg-gray-100 text-black', className)}>
    <span className="flex flex-row items-center justify-center">
      <span className="hidden md:inline">{children}</span>
      <AiOutlinePlus className="ml-1 text-lg font-bold" />
    </span>
  </Button>
);

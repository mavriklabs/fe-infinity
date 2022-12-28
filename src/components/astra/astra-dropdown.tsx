import { Menu, Transition } from '@headlessui/react';
import { ReactElement, ReactNode } from 'react';
import { BiCaretDown } from 'react-icons/bi';
import { cardClr, hoverClr, inputBorderColor, textClr } from 'src/utils/ui-constants';
import { twMerge } from 'tailwind-merge';
import { Divider } from '../common';
import { AOutlineButton, ATextButton } from './astra-button';

export type ADropdownItem = {
  label: string | ReactElement;
  icon?: ReactNode;
  onClick: () => void;
};

interface DropdownProps {
  label?: string | ReactElement;
  items: ADropdownItem[];
  className?: string;
  tooltip?: string;
  alignMenuRight?: boolean;
  hasBorder?: boolean;
}

export const ADropdownButton: React.FC = ({ children }) => {
  return (
    <div className="flex items-center gap-1">
      <div className="whitespace-nowrap">{children}</div>
      <BiCaretDown />
    </div>
  );
};

export const ADropdown = ({
  label,
  items,
  className = '',
  tooltip = '',
  hasBorder = true,
  alignMenuRight = false
}: DropdownProps) => {
  return (
    <div className={twMerge(className)}>
      <Menu>
        {({ open }) => (
          <ACustomMenuContents>
            <span>
              <ACustomMenuButton>
                {hasBorder && (
                  <AOutlineButton tooltip={tooltip}>
                    <ADropdownButton>{label}</ADropdownButton>
                  </AOutlineButton>
                )}{' '}
                {!hasBorder && (
                  <ATextButton tooltip={tooltip}>
                    <ADropdownButton>{label}</ADropdownButton>
                  </ATextButton>
                )}
              </ACustomMenuButton>
            </span>

            <ACustomMenuItems open={open} alignMenuRight={alignMenuRight}>
              <div className="">
                {items.map((item, idx) => {
                  if (item.label === '-') {
                    return <AMenuSeparator key={idx} />;
                  }

                  return (
                    <ACustomMenuItem key={idx} onClick={item.onClick}>
                      <div className={twMerge(textClr, 'flex items-center cursor-pointer')}>
                        {item.icon && <div className={twMerge('mr-4')}>{item.icon}</div>}
                        {item.label}
                      </div>
                    </ACustomMenuItem>
                  );
                })}
              </div>
            </ACustomMenuItems>
          </ACustomMenuContents>
        )}
      </Menu>
    </div>
  );
};

// =======================================================================

interface Props {
  onClick: () => void;
  children: ReactElement | string;
}

export const ACustomMenuItem = (props: Props) => {
  return (
    <Menu.Item {...props}>
      {({ active, disabled }) => (
        <div
          className={twMerge(
            'flex w-full px-4 py-4 leading-5 font-heading ',
            active ? twMerge(hoverClr, ' rounded-xl') : ' ',
            disabled && 'cursor-not-allowed opacity-50'
          )}
        >
          {props.children}
        </div>
      )}
    </Menu.Item>
  );
};

// =======================================================================

interface Props2 {
  children: ReactNode;
  open: boolean;
  alignMenuRight?: boolean;
  innerClassName?: string;
}

export const ACustomMenuItems = ({ children, open, alignMenuRight, innerClassName }: Props2) => {
  return (
    <div className={twMerge('absolute bottom-0  z-50', alignMenuRight ? 'right-0' : ' ')}>
      <Transition
        show={open}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items
          className={twMerge(
            cardClr,
            inputBorderColor,
            'absolute mt-2 p-2 w-56 rounded-2xl border shadow-2xl outline-none',
            alignMenuRight ? 'right-0' : '',
            innerClassName
          )}
        >
          {children}
        </Menu.Items>
      </Transition>
    </div>
  );
};

// =======================================================================

export const AMenuSeparator = () => {
  return <Divider className="my-1" />;
};

// =======================================================================

interface Props3 {
  children: ReactNode;
  className?: string;
}

export const ACustomMenuButton = ({ children, className = '' }: Props3) => {
  // without as="div", you get a button within button error
  return (
    <Menu.Button as="div" className={twMerge('', className)}>
      {children}
    </Menu.Button>
  );
};

// =======================================================================

interface Props4 {
  children: ReactNode;
}

export const ACustomMenuContents = ({ children }: Props4) => {
  // button needs to be relative for the menu positioning
  return <div className="relative">{children}</div>;
};

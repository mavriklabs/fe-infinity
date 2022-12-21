import React, { ReactNode } from 'react';
import { BsGrid, BsList } from 'react-icons/bs';
import { useDashboardContext } from 'src/utils/context/DashboardContext';
import { hoverClr, inputBorderColor, primaryTextColor, textClr } from 'src/utils/ui-constants';
import { twMerge } from 'tailwind-merge';

interface Props {
  onClick?: (ev: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  children: ReactNode;
  small?: boolean;
  disabled?: boolean;
  className?: string;
  highlighted?: boolean;
  primary?: boolean;
  submit?: boolean;
  tooltip?: string;
}

export const AButton = ({
  small = false,
  disabled = false,
  primary = false,
  submit = false,
  children,
  className = '',
  tooltip = '',
  highlighted = false,
  onClick
}: Props): JSX.Element => {
  return (
    <ButtonBase
      disabled={disabled}
      submit={submit}
      highlighted={highlighted}
      tooltip={tooltip}
      className={twMerge(
        small ? 'text-sm px-3 py-0.5' : 'px-4 py-1',
        'rounded-full',
        primary ? 'bg-black text-white' : '',
        className
      )}
      onClick={onClick}
    >
      {children}
    </ButtonBase>
  );
};

// ======================================================

interface BaseProps {
  onClick?: (ev: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  children: ReactNode;
  disabled?: boolean;
  className?: string;
  highlighted?: boolean;
  submit?: boolean;
  tooltip?: string;
}

const ButtonBase = ({
  disabled = false,
  submit = false,
  children,
  className = '',
  highlighted = false,
  tooltip = '',
  onClick
}: BaseProps): JSX.Element => {
  const disabledClass = 'opacity-30 cursor-not-allowed';

  return (
    <button
      type={submit ? 'submit' : 'button'}
      // don't disable here, just use the disabled style
      // otherwise a disabled buttons click will go to the parent, onClick isn't called
      // disabled={disabled}
      className={twMerge(
        highlighted ? primaryTextColor : textClr,
        'active:dark:bg-light-bg  active:dark:text-dark-bg  ',
        'active:bg-dark-bg active:text-light-bg',
        hoverClr,
        'select-none transition ease-in-out duration-300',
        'focus:outline-none focus-visible:ring focus:ring-black focus:ring-opacity-50',
        disabled ? disabledClass : '',
        className
      )}
      title={tooltip}
      onClick={(e) => {
        if (onClick) {
          e.stopPropagation();
          e.preventDefault();

          if (!disabled) {
            onClick(e);
          }
        }
      }}
    >
      <div className="whitespace-nowrap">{children}</div>
    </button>
  );
};

// ======================================================

export const ARoundButton = ({
  small = false,
  disabled = false,
  children,
  highlighted,
  tooltip = '',
  className = '',
  onClick
}: Props): JSX.Element => {
  const base = 'rounded-full p-2  ';

  return (
    <ButtonBase
      disabled={disabled}
      tooltip={tooltip}
      highlighted={highlighted}
      className={twMerge(base, small ? 'p-1' : 'p-2', className)}
      onClick={onClick}
    >
      {children}
    </ButtonBase>
  );
};

// ======================================================

export const ARoundOutlineButton = ({
  small = false,
  disabled = false,
  children,
  highlighted,
  className = '',
  tooltip = '',
  onClick
}: Props): JSX.Element => {
  return (
    <ARoundButton
      small={small}
      tooltip={tooltip}
      disabled={disabled}
      highlighted={highlighted}
      className={twMerge(inputBorderColor, 'border rounded-full', className)}
      onClick={onClick}
    >
      {children}
    </ARoundButton>
  );
};

// ==============================================================

export const AOutlineButton = ({
  small = false,
  disabled = false,
  children,
  className = '',
  tooltip = '',
  onClick
}: Props): JSX.Element => {
  return (
    <AButton
      small={small}
      tooltip={tooltip}
      disabled={disabled}
      className={twMerge(inputBorderColor, 'border rounded-full', className)}
      onClick={onClick}
    >
      {children}
    </AButton>
  );
};

// ==============================================================

export const ATextButton = ({
  small = false,
  disabled = false,
  children,
  className = '',
  tooltip = '',
  onClick
}: Props): JSX.Element => {
  return (
    <ButtonBase
      disabled={disabled}
      tooltip={tooltip}
      className={twMerge(
        small ? 'text-sm px-3 py-0.5' : 'px-4 py-1',
        '  rounded-full text-gray-900 hover:bg-theme-gray-700',
        className
      )}
      onClick={onClick}
    >
      {children}
    </ButtonBase>
  );
};

// ==============================================================

interface Props4 {
  children: ReactNode;
  onClick: () => void;
}

export const AToggleButton = ({ children, onClick }: Props4) => {
  return (
    <AButton
      onClick={() => {
        onClick();
      }}
      className={twMerge('p-2 rounded-md')}
    >
      {children}
    </AButton>
  );
};

// ==============================================================

export const AListGridButton = () => {
  const { setListMode, listMode } = useDashboardContext();

  return (
    <div className="flex items-center">
      <AToggleButton onClick={() => setListMode(true)}>
        <BsList className={twMerge(listMode ? primaryTextColor : '', 'h-4 w-4')} />
      </AToggleButton>
      <div className="  w-1  " />
      <AToggleButton onClick={() => setListMode(false)}>
        <BsGrid className={twMerge(!listMode ? primaryTextColor : '', 'h-4 w-4')} />
      </AToggleButton>
    </div>
  );
};

// ==============================================================

interface Props5 {
  left?: ReactNode;
  label?: string;
  right?: ReactNode;
}

export const AButtonContents = ({ left, right, label }: Props5) => {
  return (
    <div className="flex items-center gap-1">
      {left}
      <div className="whitespace-nowrap">{label}</div>
      {right}
    </div>
  );
};
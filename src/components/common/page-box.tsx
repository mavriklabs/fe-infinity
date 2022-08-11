import React, { useEffect, useState } from 'react';
import { Navbar, Spacer, Header } from 'src/components/common';
import { useOnboardContext } from 'src/utils/OnboardContext/OnboardContext';
import { isPasswordModalNeeded, PasswordModal } from './password-modal';

// used in the Header
export const pageStyles = 'mx-auto desktop:w-5/6 desktop-sm:w-[95%] tabloid:w-[95%] mobile:w-[98%]';

interface Props {
  children?: React.ReactNode;
  title: string;
  showTitle?: boolean;
  className?: string;
  fullWidth?: boolean;
  rightToolbar?: JSX.Element;
}

export const PageBox = ({
  children,
  title,
  showTitle = true,
  fullWidth = false,
  className = '',
  rightToolbar
}: Props): JSX.Element => {
  const { chainId } = useOnboardContext();
  const [renderPasswordModal, setRenderPasswordModal] = useState(false);

  useEffect(() => {
    setRenderPasswordModal(isPasswordModalNeeded());
  }, []);

  return (
    <div className="transition w-screen h-screen overflow-y-auto overflow-x-clip justify-items-center">
      {renderPasswordModal ? (
        <PasswordModal isOpen={true} onClose={() => console.log} />
      ) : (
        <Header title={title}>
          {chainId !== '1' && (
            <div className="text-center bg-theme-gray-100 text-red-800 py-1">You are not on Ethereum network</div>
          )}

          <Navbar />

          <div className={`transition ${fullWidth ? 'w-full' : pageStyles}`}>
            {showTitle ? <PageHeader title={title} rightToolbar={rightToolbar} /> : null}

            <div className={`w-full ${className}`}>{children}</div>

            {/* allows scroll so items aren't at the bottom of the screen  */}
            <div className="shrink-0" style={{ height: 300 }} />
          </div>
        </Header>
      )}
    </div>
  );
};

// ==================================================

type PageHeaderProps = {
  title?: string;
  rightToolbar?: JSX.Element;
};

export const PageHeader = ({ title, rightToolbar }: PageHeaderProps): JSX.Element => {
  return (
    <div className="flex flex-row items-center">
      <div className="font-medium text-6xl tracking-tight my-4">{title}</div>

      {rightToolbar && (
        <>
          <Spacer />
          <div>{rightToolbar}</div>
        </>
      )}
    </div>
  );
};

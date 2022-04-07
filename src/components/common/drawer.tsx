import { Fragment, ReactNode, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XIcon } from '@heroicons/react/outline';
import { Button } from 'src/components/common';
import { Tooltip, TooltipIcon, TooltipSpec, TooltipWrapper } from './tool-tip';

interface Props {
  open: boolean;
  onClose: () => void;
  title: string;
  tooltip?: TooltipSpec;
  children: ReactNode;
}

export function Drawer({ open, tooltip, onClose, title, children }: Props) {
  const [showTooltip, setShowTooltip] = useState(false);

  const header = (
    <div className="p-8">
      <TooltipWrapper show={showTooltip} tooltip={tooltip}>
        <div className="flex items-start justify-between">
          <Dialog.Title className="text-2xl font-bold text-gray-900">
            <div className="flex items-center">
              <div className="mr-2">{title}</div>

              {tooltip && (
                <Tooltip setShow={setShowTooltip}>
                  <TooltipIcon />
                </Tooltip>
              )}
            </div>
          </Dialog.Title>

          <div className="ml-3 flex h-7 items-center">
            <Button variant="ghost" size="small" onClick={onClose}>
              <span className="sr-only">Close panel</span>
              <XIcon className="h-6 w-6" aria-hidden="true" />
            </Button>
          </div>
        </div>
      </TooltipWrapper>
    </div>
  );

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="z-50 fixed inset-0 overflow-hidden" onClose={onClose}>
        <div className="absolute inset-0 overflow-hidden">
          <Dialog.Overlay className="absolute inset-0" />

          <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10 sm:pl-16">
            <Transition.Child
              as={Fragment}
              enter="transform transition ease-in-out duration-300 sm:duration-500"
              enterFrom="translate-x-full"
              enterTo="translate-x-0"
              leave="transform transition ease-in-out duration-300 sm:duration-500"
              leaveFrom="translate-x-0"
              leaveTo="translate-x-full"
            >
              <div className="pointer-events-auto w-screen max-w-md">
                <div className="flex h-full flex-col overflow-y-auto bg-white shadow-xl">
                  {header}
                  <div className="flex h-full flex-col">{children}</div>
                </div>
              </div>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}

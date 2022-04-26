import React from 'react';
import { GoTriangleUp } from 'react-icons/go';
import { GoTriangleDown } from 'react-icons/go';
import { AiOutlineCaretUp } from 'react-icons/ai';
import { AiOutlineCaretDown } from 'react-icons/ai';
import { AiOutlinePlus } from 'react-icons/ai';

interface Props {
  type?: string;
  value?: string | number;
  label?: string | React.ReactNode;
  sortable?: boolean;
  onSort?: ((direction: string) => void) | ((direction: string) => void) | null | undefined;
  onClick?: () => void;
}

export function Field({ onSort, sortable = false, onClick, type, label, value }: Props) {
  const styles = {
    stat: {
      container: {
        className: `
          w-full h-full overflow-hidden
          flex flex-row place-content-center
        `
      },
      field: {
        container: {
          className: `
            ${sortable ? 'w-content h-content' : 'w-full h-full '}
            overflow-hidden
            flex flex-row
          `
        }
      },
      sorting: {
        container: {
          className: `
            w-full h-full overflow-hidden
            flex flex-col ${sortable ? 'flex-[0.5]' : ''}
            place-items-center gap-0
          `
        },
        asc: {
          container: {
            className: `
              w-full h-full
              flex flex-row items-end justify-center
            `
          },
          element: {
            className: `
              text-xs hover:cursor-pointer
              transition active:translate-y-1 hover:text-green-700
            `
          }
        },
        desc: {
          container: {
            className: `
              w-full h-full
              flex flex-row items-start justify-center
            `
          },
          element: {
            className: `
              text-xs active:-translate-y-1 hover:cursor-pointer
              transition hover:text-red-600
            `
          }
        }
      }
    },
    image: {
      positioner: {
        className: `
          w-full h-full overflow-hidden
          grid items-center justify-center
        `
      },
      container: {
        className: `
          w-[50px] h-[50px] overflow-hidden
          rounded-full
        `
      },
      element: {
        className: `
          w-full h-full
        `
      }
    },
    action: {
      container: {
        className: `
          w-full h-full overflow-hidden
          grid items-center justify-center
        `
      },
      button: {
        container: {
          className: `
            w-content h-content overflow-hidden
            bg-black rounded-full p-2
            grid
          `
        },
        icon: {
          className: `
            text-white font-bold
          `
        }
      }
    },
    string: {
      container: {
        className: `
          w-full h-full overflow-hidden
          grid justify-start items-center
          cursor-pointer
        `
      },
      element: {
        className: `
          text-theme-light-900 font-bold text-md
        `
      }
    },
    number: {
      container: {
        className: `
          w-full h-full overflow-hidden
          grid justify-start items-center
        `
      },
      label: {
        className: `
          self-end
          font-bold font-mono
          text-sm text-theme-light-800
        `
      },
      value: {
        className: `
          self-start
          font-bold font-mono
          text-sm text-theme-light-900
        `
      }
    },
    change: {
      container: {
        className: `
          w-full h-full overflow-hidden
          grid justify-center items-center
        `
      },
      label: {
        className: `
          self-end
          font-bold font-mono
          text-sm text-theme-light-800
        `
      },
      value: (value: number) => ({
        className: `
          self-start
          font-bold font-mono
          text-sm text-theme-light-900
          ${value > 0 && 'text-theme-light-500'}
          ${value < 0 && 'text-theme-light-600'}
          ${value == 0 && 'text-theme-light-900'}
          flex gap-1 items-center
        `
      })
    },
    percentage: {
      container: {
        className: `
          w-full h-full overflow-hidden
          grid justify-start items-center px-4
        `
      },
      pill: {
        className: `
          w-full h-content relative overflow-hidden
          bg-theme-light-50 rounded-full
        `
      },
      progress: {
        style: { width: `${value}` },
        className: `
          absolute inset-0
          bg-blue-300 z-10
          w-full h-full justify-between
        `
      },
      grid: {
        className: `
          w-full h-full z-1
          flex items-center justify-between
          py-4 px-6 z-20
        `
      },
      label: {
        className: `
          font-mono font-normal
          text-sm z-20
        `
      },
      value: {
        className: `
          font-mono font-bold
          text-sm z-20
        `
      }
    }
  };

  return (
    <>
      <div {...styles?.stat?.container}>
        <div {...styles?.stat?.field?.container}>
          {type === 'image' && (
            <div {...styles?.image?.positioner}>
              <div {...styles?.image?.container}>
                <img src={String(value)} {...styles?.image?.element} />
              </div>
            </div>
          )}
          {type === 'string' && (
            <div {...styles?.string?.container} onClick={onClick}>
              <p {...styles?.string?.element}>{value}</p>
            </div>
          )}
          {type === 'number' && (
            <div {...styles?.number?.container}>
              <p {...styles?.number?.label}>{label}</p>
              <p {...styles?.number?.value}>{value}</p>
            </div>
          )}
          {type === 'change' && (
            <div {...styles?.change?.container}>
              <p {...styles?.change?.label}>{label}</p>
              <p {...styles?.change?.value(Number(value))}>
                {Number(value) > 0 ? (
                  <>
                    <GoTriangleUp /> {value?.toLocaleString()} %
                  </>
                ) : Number(value) < 0 ? (
                  <>
                    <GoTriangleDown /> {String(Math.abs(Number(value)))?.toLocaleString()} %
                  </>
                ) : (
                  `-`
                )}
              </p>
            </div>
          )}
          {type === 'percentage' && (
            <div {...styles?.percentage?.container}>
              <div {...styles?.percentage?.pill}>
                <div {...styles?.percentage?.progress}></div>
                <div {...styles?.percentage?.grid}>
                  <p {...styles?.percentage?.label}>{label}</p>
                  <p {...styles?.percentage?.value}>{value}</p>
                </div>
              </div>
            </div>
          )}
          {type === 'action' && (
            <div {...styles?.action?.container}>
              <button {...styles?.action?.button?.container}>
                <AiOutlinePlus {...styles?.action?.button?.icon} />
              </button>
            </div>
          )}
        </div>
        {sortable && (
          <div {...styles?.stat?.sorting?.container}>
            <button {...styles?.stat?.sorting?.asc?.container} onClick={() => onSort?.('asc')}>
              <AiOutlineCaretUp {...styles?.stat?.sorting?.asc?.element} />
            </button>
            <button {...styles?.stat?.sorting?.desc?.container} onClick={() => onSort?.('desc')}>
              <AiOutlineCaretDown {...styles?.stat?.sorting?.desc?.element} />
            </button>
          </div>
        )}
      </div>
    </>
  );
}

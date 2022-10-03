/* global WebKitCSSMatrix */

import { forwardRef, ReactNode, useRef, useImperativeHandle, useCallback, useEffect } from 'react';
import { SwiperEmitter } from './swiper-emitter';

const sleep = (ms: number) => {
  return new Promise(function (resolve) {
    setTimeout(resolve, ms);
  });
};

export type Direction = 'left' | 'right' | 'up' | 'down' | 'none';
type CardLeftScreenHandler = (direction: Direction) => void;

type Coord = {
  x: number;
  y: number;
};

type CoordTime = {
  x: number;
  y: number;
  time: number;
};

export interface API {
  swipe(dir?: Direction): Promise<void>;
  restoreCard(): Promise<void>;
}

const settings = {
  snapBackDuration: 300,
  maxTilt: 5,
  bouncePower: 0.2,
  swipeThreshold: 300 // px/s
};

const getElementSize = (element: HTMLElement) => {
  const elementStyles = window.getComputedStyle(element);
  const widthString = elementStyles.getPropertyValue('width');
  const width = Number(widthString.split('px')[0]);
  const heightString = elementStyles.getPropertyValue('height');
  const height = Number(heightString.split('px')[0]);
  return { x: width, y: height };
};

const pythagoras = (x: number, y: number) => {
  return Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
};

const normalize = (vector: Coord, multiplier = 1) => {
  const length = Math.sqrt(Math.pow(vector.x, 2) + Math.pow(vector.y, 2));
  return {
    x: (vector.x * multiplier) / length,
    y: (vector.y * multiplier) / length
  };
};

const animateOut = async (element: HTMLElement, speed: Coord, easeIn = false) => {
  const startPos = getTranslate(element);
  const bodySize = getElementSize(document.body);
  const diagonal = pythagoras(bodySize.x, bodySize.y);

  const velocity = pythagoras(speed.x, speed.y);
  const time = diagonal / velocity;
  const multiplier = diagonal / velocity;

  const translateString = translationString(speed.x * multiplier + startPos.x, -speed.y * multiplier + startPos.y);
  let rotateString = '';

  const rotationPower = 200;

  if (easeIn) {
    element.style.transition = 'ease ' + time + 's';
  } else {
    element.style.transition = 'ease-out ' + time + 's';
  }

  if (getRotation(element) === 0) {
    rotateString = rotationString((Math.random() - 0.5) * rotationPower);
  } else if (getRotation(element) > 0) {
    rotateString = rotationString((Math.random() * rotationPower) / 2 + getRotation(element));
  } else {
    rotateString = rotationString(((Math.random() - 1) * rotationPower) / 2 + getRotation(element));
  }

  element.style.transform = translateString + rotateString;

  await sleep(time * 1000);
};

const animateBack = async (element: HTMLElement) => {
  element.style.transition = settings.snapBackDuration + 'ms';
  const startingPoint = getTranslate(element);
  const translation = translationString(
    startingPoint.x * -settings.bouncePower,
    startingPoint.y * -settings.bouncePower
  );
  const rotation = rotationString(getRotation(element) * -settings.bouncePower);
  element.style.transform = translation + rotation;

  await sleep(settings.snapBackDuration * 0.75);
  element.style.transform = '';

  await sleep(settings.snapBackDuration);
  element.style.transition = '';
};

const isTouchDevice = () => {
  return 'ontouchstart' in window;
};

const getSwipeDirection = (property: Coord): Direction => {
  if (Math.abs(property.x) > Math.abs(property.y)) {
    if (property.x > settings.swipeThreshold) {
      return 'right';
    } else if (property.x < -settings.swipeThreshold) {
      return 'left';
    }
  } else {
    if (property.y > settings.swipeThreshold) {
      return 'up';
    } else if (property.y < -settings.swipeThreshold) {
      return 'down';
    }
  }
  return 'none';
};

const calcSpeed = (oldLocation: CoordTime, newLocation: CoordTime) => {
  const dx = newLocation.x - oldLocation.x;
  const dy = oldLocation.y - newLocation.y;
  const dt = (newLocation.time - oldLocation.time) / 1000;
  return { x: dx / dt, y: dy / dt };
};

const translationString = (x: number, y: number) => {
  const translation = 'translate(' + x + 'px, ' + y + 'px)';
  return translation;
};

const rotationString = (rot: number) => {
  const rotation = 'rotate(' + rot + 'deg)';
  return rotation;
};

const getTranslate = (element: HTMLElement): Coord => {
  const style = window.getComputedStyle(element);
  const matrix = new WebKitCSSMatrix(style.webkitTransform);
  const ans = { x: matrix.m41, y: -matrix.m42 };
  return ans;
};

const getRotation = (element: HTMLElement) => {
  const style = window.getComputedStyle(element);
  const matrix = new WebKitCSSMatrix(style.webkitTransform);
  const ans = (-Math.asin(matrix.m21) / (2 * Math.PI)) * 360;
  return ans;
};

const dragableTouchmove = (coordinates: Coord, element: HTMLElement, offset: Coord, lastLocation: CoordTime) => {
  const pos = { x: coordinates.x + offset.x, y: coordinates.y + offset.y };
  const newLocation = { x: pos.x, y: pos.y, time: new Date().getTime() };
  const translation = translationString(pos.x, pos.y);
  const rotCalc = calcSpeed(lastLocation, newLocation).x / 1000;
  const rotation = rotationString(rotCalc * settings.maxTilt);

  element.style.transform = translation + rotation;

  return newLocation;
};

const touchCoordinatesFromEvent = (e: TouchEvent): Coord => {
  const touchLocation = e.targetTouches[0];
  return { x: touchLocation.clientX, y: touchLocation.clientY };
};

const mouseCoordinatesFromEvent = (e: MouseEvent): Coord => {
  return { x: e.clientX, y: e.clientY };
};

interface Props {
  ref?: React.Ref<API>;
  index: number;
  emitter: SwiperEmitter;
  onCardLeftScreen?: CardLeftScreenHandler;
  swipeRequirementType?: 'velocity' | 'position';
  swipeThreshold?: number;
  className?: string;
  children?: ReactNode;
}

export const SwiperCard = forwardRef(
  (
    {
      children,
      emitter,
      index,
      onCardLeftScreen,
      className,
      swipeRequirementType = 'velocity',
      swipeThreshold = settings.swipeThreshold
    }: Props,
    ref
  ) => {
    settings.swipeThreshold = swipeThreshold;
    const swipeAlreadyReleased = useRef(false);
    const setDisplayNone = useRef(false);

    const elementRef = useRef<HTMLElement>();

    useImperativeHandle(ref, () => ({
      async swipe(dir: Direction = 'right') {
        if (!elementRef.current) {
          return;
        }

        setDisplayNone.current = true;

        emitter.emitSwipe({ dir, index });

        const power = 1000;
        const disturbance = (Math.random() - 0.5) * 100;
        if (dir === 'right') {
          await animateOut(elementRef.current, { x: power, y: disturbance }, true);
        } else if (dir === 'left') {
          await animateOut(elementRef.current, { x: -power, y: disturbance }, true);
        } else if (dir === 'up') {
          await animateOut(elementRef.current, { x: disturbance, y: power }, true);
        } else if (dir === 'down') {
          await animateOut(elementRef.current, { x: disturbance, y: -power }, true);
        }

        // can become null after animation
        if (elementRef.current && setDisplayNone.current) {
          elementRef.current.style.display = 'none';
        }

        if (onCardLeftScreen) {
          onCardLeftScreen(dir);
        }
      },
      async restoreCard() {
        if (!elementRef.current) {
          return;
        }

        // this prevents a slow animiation finishing and setting display none
        setDisplayNone.current = false;
        elementRef.current.style.display = 'block';

        await animateBack(elementRef.current);
      }
    }));

    const handleSwipeReleased = useCallback(
      async (element: HTMLElement, speed: Coord) => {
        if (swipeAlreadyReleased.current) {
          return;
        }
        swipeAlreadyReleased.current = true;
        setDisplayNone.current = true;

        const currentPostion = getTranslate(element);
        // Check if this is a swipe
        const dir = getSwipeDirection(swipeRequirementType === 'velocity' ? speed : currentPostion);

        if (dir !== 'none') {
          emitter.emitSwipe({ dir, index });

          const outVelocity = swipeRequirementType === 'velocity' ? speed : normalize(currentPostion, 600);
          await animateOut(element, outVelocity);

          if (setDisplayNone.current) {
            element.style.display = 'none';
          }

          if (onCardLeftScreen) {
            onCardLeftScreen(dir);
          }
          return;
        }

        // Card was not flicked away, animate back to start
        animateBack(element);
      },
      [swipeAlreadyReleased, onCardLeftScreen, swipeRequirementType]
    );

    useEffect(() => {
      if (!elementRef.current) {
        return;
      }

      let offset: Coord;
      let speed = { x: 0, y: 0 };
      let lastLocation = { x: 0, y: 0, time: new Date().getTime() };
      let mouseIsClicked = false;

      const resetOnMouseDown = () => {
        offset = { x: 0, y: 0 };
        speed = { x: 0, y: 0 };
        lastLocation = { x: 0, y: 0, time: new Date().getTime() };
        mouseIsClicked = false;
      };

      const handleMove = (coordinates: Coord) => {
        if (!elementRef.current) {
          return;
        }

        // Move
        const newLocation = dragableTouchmove(coordinates, elementRef.current, offset, lastLocation);
        speed = calcSpeed(lastLocation, newLocation);
        lastLocation = newLocation;
      };

      if (isTouchDevice()) {
        elementRef.current.addEventListener(
          'touchstart',
          (e) => {
            e.preventDefault();
            e.stopPropagation();

            resetOnMouseDown();

            swipeAlreadyReleased.current = false;

            offset = {
              x: -touchCoordinatesFromEvent(e).x,
              y: -touchCoordinatesFromEvent(e).y
            };
          },
          { passive: false }
        );

        elementRef.current.addEventListener(
          'touchmove',
          (e) => {
            e.preventDefault();
            e.stopPropagation();

            handleMove(touchCoordinatesFromEvent(e));
          },
          { passive: false }
        );

        elementRef.current.addEventListener(
          'touchend',
          (e) => {
            e.preventDefault();
            e.stopPropagation();

            if (elementRef.current) {
              handleSwipeReleased(elementRef.current, speed);
            }
          },
          { passive: false }
        );
      } else {
        elementRef.current.addEventListener(
          'mousedown',
          (e) => {
            e.preventDefault();
            e.stopPropagation();

            // left mouse only
            if (e.buttons === 1) {
              // console.log('mouseDown');
              resetOnMouseDown();

              mouseIsClicked = true;
              swipeAlreadyReleased.current = false;

              offset = {
                x: -mouseCoordinatesFromEvent(e).x,
                y: -mouseCoordinatesFromEvent(e).y
              };
            }
          },
          { passive: false }
        );

        elementRef.current.addEventListener(
          'mousemove',
          (e) => {
            e.preventDefault();
            e.stopPropagation();

            if (mouseIsClicked) {
              // console.log('mousemove');
              handleMove(mouseCoordinatesFromEvent(e));
            }
          },
          { passive: false }
        );

        elementRef.current.addEventListener(
          'mouseup',
          (e) => {
            e.preventDefault();
            e.stopPropagation();

            if (mouseIsClicked) {
              // console.log('mouseup');
              mouseIsClicked = false;

              if (elementRef.current) {
                handleSwipeReleased(elementRef.current, speed);
              }
            }
          },
          { passive: false }
        );

        elementRef.current.addEventListener(
          'mouseleave',
          (e) => {
            e.preventDefault();
            e.stopPropagation();

            if (mouseIsClicked) {
              // console.log('mouseleave');
              mouseIsClicked = false;
              if (elementRef.current) {
                handleSwipeReleased(elementRef.current, speed);
              }
            }
          },
          { passive: false }
        );
      }
    }, []); // TODO fix so swipeRequirementType can be changed on the fly. Pass as dependency cleanup eventlisteners and update new eventlisteners.

    return (
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      <div ref={elementRef as any} className={className}>
        {children}
      </div>
    );
  }
);

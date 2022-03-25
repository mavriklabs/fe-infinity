import { Suspense, LazyExoticComponent, ReactElement, FC } from 'react';
import LoadingScreen from 'src/components/loading-screen';

export const Loadable = (Component: LazyExoticComponent<FC>) =>
  function LoadableComponent(props: Record<string, unknown>): ReactElement {
    return (
      <Suspense fallback={<LoadingScreen />}>
        <Component {...props} />
      </Suspense>
    );
  };

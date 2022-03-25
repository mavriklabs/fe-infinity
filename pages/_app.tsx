import type { AppProps } from 'next/app';
import { ComponentType, createElement, FunctionComponent, memo, StrictMode } from 'react';
import { BrowserRouter } from 'react-router-dom';

const providers: readonly ComponentType[] = [BrowserRouter];

const Component: FunctionComponent<AppProps> = ({ Component, pageProps }) => <Component {...pageProps} />;

const MemoizedComponent = memo(Component, (p, n) => p.Component === n.Component && p.pageProps === n.pageProps);

const App: FunctionComponent<AppProps> = (props) => {
  return typeof window === 'undefined' ? null : (
    <StrictMode>
      {providers.reduceRight(
        (children, provider) => createElement(provider, undefined, children),
        <MemoizedComponent {...props} />
      )}
    </StrictMode>
  );
};

export default App;

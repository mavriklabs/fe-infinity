import LogRocket from 'logrocket';
import * as gtag from 'lib/ga/gtag';
import { useRouter } from 'next/router';
import type { AppProps } from 'next/app';
import 'src/settings/theme/globals.scss';
import { isLocalhost } from 'src/utils/commonUtils';
import { AppContextProvider } from 'src/utils/context/AppContext';
import { OrderContextProvider } from 'src/utils/context/OrderContext';
import { FilterContextProvider } from 'src/utils/context/FilterContext';
import React, { FunctionComponent, memo, StrictMode, useEffect } from 'react';
import NextNProgress from 'nextjs-progressbar';

const Page: FunctionComponent<AppProps> = ({ Component, pageProps }) => <Component {...pageProps} />;
const Memoized = memo(Page, (p, n) => p.Component === n.Component && p.pageProps === n.pageProps);
const isProduction = process.env.NODE_ENV === 'production';

if (!isLocalhost()) {
  LogRocket.init('0pu9ak/nftco');
}

const App: FunctionComponent<AppProps> = (props) => {
  // For every route change in production,
  // we inject google analytics tracker.
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url: URL) => (isProduction ? gtag.pageview(url) : null);
    router.events.on('routeChangeComplete', handleRouteChange);
    return () => router.events.off('routeChangeComplete', handleRouteChange);
  }, [router.events]);

  return (
    <StrictMode>
      <NextNProgress options={{ showSpinner: false }} />
      <AppContextProvider>
        <FilterContextProvider>
          <OrderContextProvider>
            <Memoized {...props} />
          </OrderContextProvider>
        </FilterContextProvider>
      </AppContextProvider>
    </StrictMode>
  );
};

export default App;

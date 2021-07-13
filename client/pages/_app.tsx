import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';
import AppRoot from 'index';
import { DefaultSeo } from 'next-seo';
import * as gtag from '../lib/gtag';
import SEO from '../next-seo.config';
import theme from '../theme';

import '@/styles/all.scss';
import '@/components/TextEditor/styles.scss';

const App = (props: { Component: any; pageProps: any }) => {
  const { Component, pageProps } = props;
  const router = useRouter();
  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles: HTMLElement | null = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement!.removeChild(jssStyles);
    }
  }, []);

  useEffect(() => {
    const handleRouteChange = (url: any) => {
      gtag.pageview(url);
    };
    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  return (
    <AppRoot>
      <Head>
        {/* <!-- Make the page mobile compatible --> */}
        <script src="https://cdn.jsdelivr.net/npm/pace-js@latest/pace.min.js"></script>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/pace-js@latest/pace-theme-default.min.css"
        ></link>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0"
        />
        <meta name="creator" content="MakeOwnSoftware" />
        <meta name="publisher" content="MakeOwnSoftware" />
        <meta name="mobile-web-app-capable" content="yes" />
      </Head>
      <DefaultSeo {...SEO} />
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
    </AppRoot>
  );
};

export default App;

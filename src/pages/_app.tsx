import React from 'react';
import { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import theme from '@/definitions/chakra/theme';
import { Provider } from 'next-auth/client';
import { config as swrConfig } from '@/lib/swr/config';
import { SWRConfig } from 'swr';

import 'codemirror/lib/codemirror.css';
import '../styles/editor.css';

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <SWRConfig value={swrConfig}>
      <Provider session={pageProps.session}>
        <ChakraProvider theme={theme}>
          <Component {...pageProps} />
        </ChakraProvider>
      </Provider>
    </SWRConfig>
  );
}

export default MyApp;

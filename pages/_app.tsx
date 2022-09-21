import { SessionProvider } from 'next-auth/react';
import type { AppProps } from 'next/app';
import '../styles/globals.css';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { lightTheme } from '../themes/light-theme';
import { SWRConfig } from 'swr';
import { UIProvider, CartProvider } from '../context';
import { AuthProvider } from '../context/auth/AuthProvider';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider>
      <SWRConfig
        value={{
          fetcher: (resourse, init) => fetch(resourse, init).then((res) => res.json()),
        }}
      >
        <AuthProvider>
          <CartProvider>
            <UIProvider>
              <ThemeProvider theme={lightTheme}>
                <CssBaseline />
                <Component {...pageProps} />
              </ThemeProvider>
            </UIProvider>
          </CartProvider>
        </AuthProvider>
      </SWRConfig>
    </SessionProvider>
  );
}

export default MyApp;

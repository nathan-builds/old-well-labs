import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import Layout from '@/pages/layout';
import { SessionProvider } from 'next-auth/react';
import { Inter } from 'next/font/google';


const inter = Inter({ subsets: ['latin'] });

export default function App({ Component, pageProps }: AppProps) {


    return (
        <main className={inter.className}>
            <SessionProvider>
                <Layout>
                    <Component {...pageProps} />
                </Layout>
            </SessionProvider>
        </main>);

}

import type { AppProps } from 'next/app';
import Head from 'next/head';

import '../styles/index.less';
import '../styles/ACKCS/index.less';
import '../styles/ACKCS/tailwind.less';
import '../styles/ACKCS/App.less';
import "@fortawesome/fontawesome-free/css/all.min.css";
import 'react-toastify/dist/ReactToastify.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>ACKCS</title>
      </Head>
      <div id="root">
        <Component {...pageProps} />
      </div>
    </>
  );
}

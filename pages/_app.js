import "bootstrap/dist/css/bootstrap.min.css"
import { useEffect } from "react";
import Head from "next/head";

import "@/styles/globals.css";


export default function App({ Component, pageProps }) {
  useEffect(() => {
    import('bootstrap/dist/js/bootstrap.bundle.min.js');
  }, []);

  return (
    <>
      <Head>
        <title>DDRobot</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

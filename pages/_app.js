import Head from "next/head"
import "@/styles/globals.css"
import "@/styles/so-biblia.css"

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Estudo Bíblico</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Component {...pageProps} />
    </>
  )
}

import Layout from "../component/Layout";
import "../styles/globals.css";
import "bootstrap/dist/css/bootstrap.css";
import "../public/css/productList.css"
import { useEffect, useState } from "react";

export default function App({ Component, pageProps }) {
  const [web, setWeb] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setWeb(true);
    }, 700);
  }, []);

  return (
    <>
      {web && (
        <Layout>
          <Component {...pageProps} />
        </Layout>
      )}
    </>
  );
}

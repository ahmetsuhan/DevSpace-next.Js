import React from "react";
import Head from "next/head";

const Layout = ({ title, keywords, description, children }) => {
  return (
    <div className="layout">
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="keywords" content={keywords} />
        <meta name="description" content={description} />
      </Head>

      <main className="container ">{children}</main>
    </div>
  );
};

Layout.defaultProps = {
  title: "Welcome to DevSpace",
  keywords: "development, coding, programming, code, js, c#, next",
  description: "The best info and news in development",
};

export default React.memo(Layout);

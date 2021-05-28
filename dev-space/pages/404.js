import React from "react";
import Image from "next/image";
import Layout from "@/components/Layout";

const NotFoundPage = () => {
  return (
    <Layout title="Page Not Found">
      <div className="not-found-page">
        <Image
          src="/images/logo.png"
          width={70}
          height={70}
          className="logo-img"
        />

        <h1>Whooops!</h1>
        <h2>This page does not exist</h2>
      </div>
    </Layout>
  );
};

export default React.memo(NotFoundPage);

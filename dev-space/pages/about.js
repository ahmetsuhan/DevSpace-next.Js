import Layout from "../components/Layout";
import React from "react";

const AboutPage = () => {
  return (
    <Layout title="About DevSpace">
      <div className="about-page">
        <h1>About</h1>
        <div className="a">
          <h3>DevSpace Blog</h3>

          <p>This is a blog built with Next.Js and Markdown</p>
          <span>Version 1.0.0</span>
        </div>
      </div>
    </Layout>
  );
};

export default React.memo(AboutPage);

import React from "react";
import Layout from "../../components/Layout";

const BlogPage = () => {
  return (
    <Layout>
      <h1 className="blog-page">Blog</h1>
    </Layout>
  );
};

export default React.memo(BlogPage);

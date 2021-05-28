import fs from "fs";
import path from "path";
import matter from "gray-matter";
import marked from "marked";
import React from "react";
import Link from "next/link";
import Layout from "@/components/Layout";
import CategoryLabel from "@/components/CategoryLabel";

const PostPage = ({
  frontmatter: { title, category, date, cover_image, author, author_image },
  content,
  slug,
}) => {
  return (
    <Layout title={title}>
      <div className="post-page">
        <Link href="/blog">Go Back</Link>
        <div className="container">
          <div className="top">
            <h1 className="title">{title}</h1>
            <CategoryLabel>{category}</CategoryLabel>
          </div>
          <img src={cover_image} alt={""} className="post-img" />
          <div className="author">
            <div className="author-image">
              <img src={author_image} alt="" />
              <h4>{author}</h4>
            </div>
            <div className="post-date">{date}</div>
          </div>

          <div className="post-content">
            <div
              className="blog-text"
              dangerouslySetInnerHTML={{ __html: marked(content) }}
            ></div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export async function getStaticPaths() {
  const files = fs.readdirSync(path.join("posts"));

  const paths = files.map((filename) => ({
    params: {
      slug: filename.replace(".md", ""),
    },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params: { slug } }) {
  const markdownWithMeta = fs.readFileSync(
    path.join("posts", slug + ".md"),
    "utf-8"
  );

  const { data: frontmatter, content } = matter(markdownWithMeta);

  return {
    props: {
      frontmatter,
      content,
      slug,
    },
  };
}

export default React.memo(PostPage);

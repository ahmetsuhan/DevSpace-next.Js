import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Layout from "../../components/Layout";
import Post from "../../components/Post";

import { sortByDate } from "../../utils";

export default function BlogPage({ posts }) {
  return (
    <Layout>
      <div className="blog-page">
        <h1>Blog</h1>
        <div className="blog-page-container">
          {posts.map((post, index) => {
            return (
              <div key={index} className="post-area">
                <Post post={post} />
              </div>
            );
          })}
        </div>
      </div>
    </Layout>
  );
}

export async function getStaticProps() {
  const files = fs.readdirSync(path.join("posts"));

  const posts = files.map((filename) => {
    const slug = filename.replace(".md", "");

    const markdownWithMeta = fs.readFileSync(
      path.join("posts", filename),
      "utf-8"
    );
    const { data: frontmatter } = matter(markdownWithMeta);
    return {
      slug,
      frontmatter,
    };
  });

  return {
    props: {
      posts: posts.sort(sortByDate),
    },
  };
}

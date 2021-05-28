import fs from "fs";
import path from "path";
import Link from "next/link";
import matter from "gray-matter";
import Layout from "@/components/Layout";
import Post from "@/components/Post";

import { sortByDate } from "@/utils/index";

export default function Home({ posts }) {
  //console.log(posts);
  return (
    <Layout>
      <div className="home-page">
        <h1>Latest Posts</h1>
        <div className="home-page-container">
          {posts.map((post, index) => {
            return (
              <div key={index} className="post-area">
                <Post post={post} />
              </div>
            );
          })}
        </div>
        <Link href="/blog">
          <a className="btn btn-block btn-fulled">All Posts</a>
        </Link>
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
      posts: posts.sort(sortByDate).slice(0, 6),
    },
  };
}

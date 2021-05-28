import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Layout from "@/components/Layout";
import Post from "@/components/Post";
import Pagination from "@/components/Pagination";

import { sortByDate } from "@/utils/index";
import { POSTS_PER_PAGE } from "@/config/index";

export default function BlogPage({ posts, numPages, currentPage }) {
  console.log(currentPage);
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
      <Pagination currentPage={currentPage} numPages={numPages} />
    </Layout>
  );
}

export async function getStaticPaths() {
  const files = fs.readdirSync(path.join("posts"));

  const numPages = Math.ceil(files.length / POSTS_PER_PAGE);

  let paths = [];
  for (let i = 1; i <= numPages; i++) {
    paths.push({
      params: { page_index: i.toString() },
    });
  }

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const page = parseInt((params && params.page_index) || 1);

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

  const numPages = Math.ceil(files.length / POSTS_PER_PAGE);
  const pageIndex = page - 1;
  const orderedPosts = posts
    .sort(sortByDate)
    .slice(pageIndex * POSTS_PER_PAGE, (pageIndex + 1) * POSTS_PER_PAGE);
  return {
    props: {
      posts: orderedPosts,
      numPages,
      currentPage: page,
    },
  };
}

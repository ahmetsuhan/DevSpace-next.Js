import fs from "fs";
import path from "path";
import Layout from "@/components/Layout";
import Post from "@/components/Post";
import Pagination from "@/components/Pagination";

import { POSTS_PER_PAGE } from "@/config/index";
import { getPosts } from "@/lib/posts";
import CategoryList from "@/components/CategoryList";

export default function BlogPage({ posts, numPages, currentPage, categories }) {
  //console.log(currentPage);
  return (
    <Layout>
      <div className="blog-page">
        <div className="blog-page-container">
          <div className="blog-page-container-left">
            <h1 className="blog-page-title">Blog</h1>
            <div className="blog-page-posts-container">
              {posts.map((post, index) => {
                return (
                  <div key={index} className="post-area">
                    <Post post={post} />
                  </div>
                );
              })}
              {posts.map((post, index) => {
                return (
                  <div key={index} className="post-area">
                    <Post post={post} />
                  </div>
                );
              })}
            </div>
            <Pagination currentPage={currentPage} numPages={numPages} />
          </div>

          <div className="blog-page-container-right">
            <CategoryList categories={categories} />
          </div>
        </div>
      </div>
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

  const posts = getPosts();

  const categories = posts.map((post) => post.frontmatter.category);
  const uniqueCategories = [...new Set(categories)];

  const numPages = Math.ceil(files.length / POSTS_PER_PAGE);
  const pageIndex = page - 1;
  const orderedPosts = posts.slice(
    pageIndex * POSTS_PER_PAGE,
    (pageIndex + 1) * POSTS_PER_PAGE
  );
  return {
    props: {
      posts: orderedPosts,
      numPages,
      currentPage: page,
      categories: uniqueCategories,
    },
  };
}

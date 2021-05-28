import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Layout from "@/components/Layout";
import Post from "@/components/Post";

import { getPosts } from "@/lib/posts";

export default function CategoryBlogPage({ posts, categoryName }) {
  return (
    <Layout>
      <div className="category-blog-page">
        <h1>Posts in {categoryName}</h1>
        <div className="category-blog-page-container">
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

export async function getStaticPaths() {
  const files = fs.readdirSync(path.join("posts"));

  const categories = files.map((filename) => {
    const markdownWithMeta = fs.readFileSync(
      path.join("posts", filename),
      "utf-8"
    );

    const { data: frontmatter } = matter(markdownWithMeta);
    return frontmatter.category.toLowerCase();
  });

  const paths = categories.map((category) => ({
    params: { category_name: category },
  }));

  return {
    paths: paths,
    fallback: false,
  };
}

export async function getStaticProps({ params: { category_name } }) {
  const posts = getPosts();

  const categoryPosts = posts.filter(
    (post) => post.frontmatter.category.toLowerCase() === category_name
  );

  return {
    props: {
      posts: categoryPosts,
      categoryName: category_name,
    },
  };
}

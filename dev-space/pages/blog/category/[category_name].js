import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Layout from "@/components/Layout";
import Post from "@/components/Post";
import CategoryList from "@/components/CategoryList";

import { getPosts } from "@/lib/posts";

export default function CategoryBlogPage({ posts, categoryName, categories }) {
  console.log(categories);

  return (
    <Layout>
      <div className="category-blog-page">
        <div className="category-blog-page-container">
          <div className="category-blog-page-container-left">
            <h1 className="category-blog-page-title">Blog</h1>
            <div className="category-blog-page-posts-container">
              {posts.map((post, index) => {
                return (
                  <div key={index} className="post-area">
                    <Post post={post} />
                  </div>
                );
              })}
            </div>
          </div>

          <div className="category-blog-page-container-right">
            <CategoryList categories={categories} />
          </div>
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

  const categories = posts.map((post) => post.frontmatter.category);
  const uniqueCategories = [...new Set(categories)];

  const categoryPosts = posts.filter(
    (post) => post.frontmatter.category.toLowerCase() === category_name
  );

  return {
    props: {
      posts: categoryPosts,
      categoryName: category_name,
      categories: uniqueCategories,
    },
  };
}

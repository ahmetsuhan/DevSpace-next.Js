import React from "react";
import Link from "next/link";
import Image from "next/image";
import CategoryLabel from "./CategoryLabel";

const Post = ({ post }) => {
  console.log(post);
  return (
    <div className="post">
      <Image
        src={post.frontmatter.cover_image}
        alt={post.title}
        height={420}
        width={600}
        className="post-img"
      />

      <div className="post-content">
        <span className="post-content-date">{post.frontmatter.date}</span>
        <CategoryLabel className="post-content-category">
          {post.frontmatter.category}
        </CategoryLabel>
      </div>

      <div className="post-center">
        <Link href={`/blog/${post.slug}`}>
          <a className="post-link">{post.frontmatter.title}</a>
        </Link>
        <p className="post-footer-excerpt">{post.frontmatter.excerpt}</p>
      </div>
      <div className="post-footer">
        <Link href={`/blog/${post.slug}`}>
          <a className="post-footer-link">Read More</a>
        </Link>
        <div className="post-footer-author">
          <img
            src={post.frontmatter.author_image}
            alt={post.frontmatter.author}
          />
          <h4 className="post-footer-author-name">{post.frontmatter.author}</h4>
        </div>
      </div>
    </div>
  );
};

export default Post;

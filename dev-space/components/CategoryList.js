import React from "react";
import Link from "next/link";

const CategoryList = ({ categories }) => {
  return (
    <div className="category-list">
      <h3 className="category-list-title">Blog Categories</h3>
      <ul>
        {categories.map((category, index) => (
          <Link key={index} href={`/blog/category/${category.toLowerCase()}`}>
            <li>{category}</li>
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default React.memo(CategoryList);

import React from "react";
import Link from "next/link";

const Pagination = ({ currentPage, numPages }) => {
  const isFirst = currentPage === 1;
  const isLast = currentPage === numPages;
  const prevPage = `/blog/page/${currentPage - 1}`;
  const nexPage = `/blog/page/${currentPage + 1}`;

  if (numPages === 1) return <></>;

  return (
    <div className="pagination">
      <ul className="pagination-nav">
        {!isFirst && (
          <Link href={prevPage}>
            <li className="pagination-nav-link">Previous</li>
          </Link>
        )}

        {Array.from({ length: numPages }, (_, i) => {
          return (
            <Link key={i} href={`/blog/page/${i + 1}`}>
              <li
                className={`pagination-nav-link ${
                  i === currentPage - 1 ? "disable" : ""
                }`}
              >
                {i + 1}
              </li>
            </Link>
          );
        })}

        {!isLast && (
          <Link href={nexPage}>
            <li className="pagination-nav-link">Next</li>
          </Link>
        )}
      </ul>
    </div>
  );
};

export default React.memo(Pagination);

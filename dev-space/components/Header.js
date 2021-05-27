import React from "react";
import Link from "next/link";
import Image from "next/image";

const Header = () => {
  return (
    <header className="header">
      <div className="header-container">
        <Link href="/">
          <a>
            <Image src="/images/logo.png" width={40} height={40} alt="logo" />
            <span>DevSpace</span>
          </a>
        </Link>

        <nav>
          <Link href="/blog">
            <a>Blog</a>
          </Link>

          <Link href="/about">
            <a>About</a>
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default React.memo(Header);

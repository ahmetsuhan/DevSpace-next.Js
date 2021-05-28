import Link from "next/link";
import Layout from "@/components/Layout";
import Post from "@/components/Post";

import { getPosts } from "@/lib/posts";

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
  return {
    props: {
      posts: getPosts().slice(0, 6),
    },
  };
}

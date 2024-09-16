import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";

const Home: NextPage = () => {
  return (
    <div className="flex items-center justify-center h-full">
      <Link className="btn btn-primary btn-lg" href={"/game"}>
        Play
      </Link>
    </div>
  );
};

export default Home;

import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <h1 className="h-screen w-full flex flex-col justify-center items-center text-4xl">
      <div className="">Welcome to</div>
      <div className="font-bold">IPO Listing</div>
      <span className="text-lg font-normal mt-4">
        1 step for all{" "}
        <Link to="/ipo-list" className="font-medium underline">
          Listings
        </Link>
      </span>
    </h1>
  );
};

export default Home;

"use client";

import {
  PhotoIcon,
  ChevronDownIcon,
  MagnifyingGlassIcon,
  CameraIcon,
} from "@heroicons/react/24/solid";
import React, { useEffect, useState } from "react";

const SearchSection = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = () => {
    const url = new URL(window.location.href);
    url.searchParams.set("searchQuery", searchQuery.toString());
    window.location.replace(url.toString());
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <>
      <div
        className="flex md:hidden lg:hidden justify-between p-4 pl-4 "
        style={{ borderBottom: "solid black 1px" }}
      >
        <div className="flex gap-2 w-48 ">
          <span>
            <PhotoIcon className="size-6 " />
          </span>
          <p>All images</p>
        </div>
        <span>
          <ChevronDownIcon className="size-6 " />
        </span>
      </div>
      <div className="flex w-full" style={{ borderBottom: "solid black 1px" }}>
        <div
          className="md:flex justify-between items-center w-80 p-4 pl-6 hidden"
          style={{ borderRight: "solid black 1px" }}
        >
          <div className="flex gap-2">
            <span>
              <PhotoIcon className="size-6 " />
            </span>
            <p>All images</p>
          </div>
          <span>
            <ChevronDownIcon className="size-6 " />
          </span>
        </div>
        <div className="flex md:w-full md:gap-4 items-center pl-4 gap-2 ">
          <span className="md:p-4">
            <MagnifyingGlassIcon className="size-6 " />
          </span>
          <input
            type="text"
            className="md:w-full w-36 focus:outline-none "
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={handleKeyPress}
          />
        </div>
        <div
          className="flex gap-2 md:w-80 p-4"
          style={{ borderLeft: "solid black 1px" }}
        >
          <span>
            <CameraIcon className="size-6 " />
          </span>
          <span>Search by image</span>
        </div>
      </div>
    </>
  );
};

export default SearchSection;

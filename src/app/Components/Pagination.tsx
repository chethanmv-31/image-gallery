"use client";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import React, { useEffect, useState } from "react";

type Props = {
  currentPage: any;
  totalPage: number;
  totalData: number;
  isTotalVisible: boolean;
  searchQuery: string;
};

const Pagination = ({
  currentPage,
  totalPage,
  totalData,
  isTotalVisible,
  searchQuery,
}: Props) => {
  const [pages, setPages] = useState<any>(1);
  const handleSearch = (pageData: number) => {
    const url = new URL(window.location.href);
    url.searchParams.set("pageNumber", pageData.toString());
    window.location.replace(url.toString());
  };

  const handleNextPage = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();

    const nextPage =
      (currentPage === undefined ? 1 : parseInt(currentPage)) + 1;
    handleSearch(nextPage); // Update URL with the next page number
  };

  const handlePrevPage = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    if (currentPage > 1) {
      const prevPage = currentPage - 1;
      handleSearch(prevPage); // Update URL with the previous page number
    }
  };

  const handlePageChange = () => {
    handleSearch(pages); // Update URL with the previous page number
  };

  return (
    <div className="md:m-6 m-2 grid gap-3 md:flex justify-between md:pb-0 md:pt-0 pb-4 pt-4">
      {isTotalVisible ? (
        <p className="text-[18px] font-bold">
          {searchQuery} Stock Photos and Images
          <span className=" text-[13px] font-normal">({totalData})</span>
        </p>
      ) : (
        <span className=" text-[13px] font-normal">
          Search Results for {searchQuery} Stocks Photos and Images {totalData}
        </span>
      )}
      <div className="flex gap-4">
        <div className="flex gap-2 items-center">
          <p className=" text-[13px] font-normal">
            Page <span>{currentPage ? currentPage : "1"}</span> of
            <span>
              {isNaN(Math.round(totalPage)) ? 0 : Math.round(totalPage)}
            </span>
          </p>
          <nav
            aria-label="Pagination"
            className="isolate inline-flex gap-1 rounded-md shadow-sm"
          >
            <p
              className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 cursor-pointer"
              onClick={(e: React.MouseEvent<HTMLElement>) => handlePrevPage(e)}
            >
              <span className="sr-only">Previous</span>
              <ChevronLeftIcon aria-hidden="true" className="h-4 w-4" />
            </p>
            <p
              className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 cursor-pointer"
              onClick={handleNextPage}
            >
              <span className="sr-only">Next</span>
              <ChevronRightIcon aria-hidden="true" className="h-4 w-4" />
            </p>
          </nav>
        </div>
        <div className="flex gap-2 items-center">
          <p className=" text-[13px] font-normal">Go to page</p>
          <nav
            aria-label="Pagination"
            className="isolate inline-flex gap-2 rounded-md shadow-sm"
          >
            <input
              onChange={(e) => setPages(e.target.value)}
              type="number"
              className="w-20 border-gray-200 border rounded-md outline-none pl-3"
            />
            <p
              className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 cursor-pointer focus:outline-offset-0"
              onClick={handlePageChange}
            >
              <span className="sr-only">Next</span>
              <ChevronRightIcon aria-hidden="true" className="h-4 w-4" />
            </p>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Pagination;

"use client";

import { PlusCircleIcon } from "@heroicons/react/24/outline";
import {
  ArrowDownTrayIcon,
  PhotoIcon,
  ShoppingCartIcon,
} from "@heroicons/react/24/solid";
import React, { useEffect, useState } from "react";
import { ImageDataProps } from "../types/ImagesDataProps";

const ImageGallery = ({ photos, searchParams }: ImageDataProps) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const handleDownload = async (url: any) => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = url.split("/").pop() || "download";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Clean up the blob URL
      URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error("Failed to download image", error);
    }
  };

  const handleNextPage = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();

    const nextPage =
      (searchParams === undefined ? 1 : parseInt(searchParams)) + 1;

    const url = new URL(window.location.href);
    url.searchParams.set("pageNumber", nextPage.toString());

    window.location.replace(url.toString());
  };

  // Function to handle scroll event
  const handleScroll = () => {
    // Check if user has scrolled to the bottom
    if (
      window.innerHeight + document.documentElement.scrollTop !==
      document.documentElement.offsetHeight
    ) {
      return;
    }

    // Increment scrolledData and update URL
    // Use the updater function to ensure correct value
    const nextPage =
      (searchParams === undefined ? 1 : parseInt(searchParams)) + 1;
    const url = new URL(window.location.href);
    url.searchParams.set("pageNumber", nextPage.toString());

    // Replace URL
    window.location.replace(url.toString());
  };

  // Effect to attach scroll event listener
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []); // Empty dependency array ensures effect runs only once

  return (
    <div className="h-full">
      {photos?.length || 0 > 0 ? (
        <div
          className="md:pb-16 pb-11"
          style={{ borderBottom: "solid 1px lightgray" }}
        >
          <div className="flex justify-center flex-wrap gap-2">
            {photos?.map((photo, index) => (
              <div
                key={photo.id}
                className="relative group"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                style={{
                  width: photo?.width / 10,
                }}
              >
                <div className="h-80 flex items-center relative">
                  <img
                    src={photo?.src?.medium}
                    alt={photo?.alt}
                    className="w-full h-full object-cover rounded-sm cursor-pointer transition-opacity duration-300 group-hover:opacity-75"
                  />
                  {hoveredIndex === index && (
                    <div className="absolute inset-0 bg-black bg-opacity-50 rounded-sm p-2 flex flex-col justify-between">
                      <div>
                        <p className="text-white text-sm">
                          <span>Name: </span>
                          {photo?.alt}
                        </p>
                        <p className="text-white text-sm">
                          <span>Image Id: </span>
                          {photo?.id}
                        </p>
                      </div>
                      <div
                        className={`text-white  justify-between items-center ${
                          photo?.width / 10 < 215 ? " gap-2 grid" : "flex"
                        } `}
                      >
                        <p>
                          <span className="text-[16px] font-medium">
                            Photographer:{" "}
                          </span>
                          {photo.photographer}
                        </p>
                        <div className="flex gap-1">
                          <ShoppingCartIcon className="h-6 w-6 p-1 bg-green-500 rounded-sm hover:bg-green-600" />
                          <ArrowDownTrayIcon
                            className="h-6 w-6 p-1 bg-gray-800 rounded-sm hover:bg-gray-700"
                            onClick={() => handleDownload(photo?.src?.original)}
                          />
                          <PlusCircleIcon className="h-6 w-6 p-1 bg-gray-800 rounded-sm hover:bg-gray-700" />
                          <PhotoIcon className="h-6 w-6 p-1 bg-gray-800 rounded-sm hover:bg-gray-700" />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center pt-8">
            <button
              className="w-64 p-2 rounded-sm hover:bg-gray-100"
              style={{ border: "1px solid black" }}
              onClick={handleNextPage}
            >
              Next page
            </button>
          </div>
        </div>
      ) : (
        <p className="text-2xl font-bold text-center p-4">No data found</p>
      )}
    </div>
  );
};

export default ImageGallery;

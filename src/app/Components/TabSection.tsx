import React from "react";

export const TabSection = () => {
  return (
    <div className="bg-gray-100 pt-8 pb-8">
      <div
        className="flex justify-between w-[300px] md:ml-6 ml-4 rounded-md  "
        style={{ border: "solid lightgray 1px" }}
      >
        <div className="bg-black w-[80px] text-center p-2 text-white rounded-tl-md rounded-bl-md">
          All
        </div>
        <div
          className="w-[100px] text-center pt-2 pb-2"
          style={{ borderRight: "solid lightgray 1px" }}
        >
          Creative
        </div>
        <div className="w-[100px] text-center pt-2 pb-2">Editorial</div>
      </div>
    </div>
  );
};

import React from "react";

export const Spinner = () => {
  return (
    <div
      className={
        "flex items-center justify-center w-full bg-white dark:bg-black"
      }
    >
      <div className="w-16 h-16 border-4 border-solid rounded-full animate-spin border-darkgrey border-t-transparent"></div>
    </div>
  );
};

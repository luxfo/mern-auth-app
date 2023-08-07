import React from "react";

import { MdErrorOutline } from "react-icons/md";

function NotFound() {
  return (
    <div className="flex flex-col items-center">
      <MdErrorOutline
        className="w-12 h-12 mt-8 text-mkt-200"
        aria-hidden="true"
      />
      <h1 className="text-6xl font-semibold text-gray-700 dark:text-gray-200">
        404
      </h1>
      <p className="text-gray-700 dark:text-gray-300">
        Page not found. Check the address or{" "}
        <a
          className="text-mkt-600 hover:underline dark:text-mkt-300"
          href="../"
        >
          go back
        </a>
        .
      </p>
    </div>
  );
}

export default NotFound;

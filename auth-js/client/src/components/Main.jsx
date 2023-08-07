import React from "react";

function Main({ children }) {
  return (
    <main className="w-full bg-gray-50 dark:bg-gray-900 overflow-y-auto">
      <div className="container grid p-6 mx-auto">{children}</div>
    </main>
  );
}

export default Main;

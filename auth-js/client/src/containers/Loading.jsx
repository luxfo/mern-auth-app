import { CgSpinner } from "react-icons/cg";

function Loading(p_allPage) {
  return (
    <div
      className={
        (p_allPage == true ? "fixed" : "absolute opacity-50") +
        " flex items-center justify-center w-full h-full p-6 text-lg font-medium z-50 bg-gray-100 md:inset-0 h-modal md:h-full dark:bg-gray-900"
      }
    >
      <CgSpinner className="animate-spin h-14 w-14 text-mkt-500" />
    </div>
  );
}

export default Loading;

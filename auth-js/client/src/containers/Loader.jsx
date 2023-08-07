import { useSelector } from "react-redux";

function Loader() {
  const { loader } = useSelector((state) => state);

  return (
    <>
      {loader.loading && (
        <div
          className={
            "fixed opacity-0 flex items-center justify-center w-full h-full p-6 text-lg font-medium z-50 bg-gray-100 md:inset-0 h-modal md:h-full dark:bg-gray-900"
          }
        ></div>
      )}
    </>
  );
}

export default Loader;

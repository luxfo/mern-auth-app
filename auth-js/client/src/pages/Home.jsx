import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUser } from "../store/actions/userAction";

function Home() {
  const { user, auth } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUser(auth));
  }, []);

  return (
    <>
      <div className="mx-auto">
        {user && (
          <div className="bg-gray-600 text-white py-10 px-14 rounded-md space-y-6">
            <h1 className="text-xl font-bold capitalize">
              Welcome {user.data.first_name} {user.data.last_name}
            </h1>
          </div>
        )}
      </div>
    </>
  );
}

export default Home;

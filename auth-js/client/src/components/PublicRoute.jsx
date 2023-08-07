import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

function PublicRoute({ children }) {
  const { auth } = useSelector((state) => state);

  if (auth.isAuthenticated && auth.user.activated) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default PublicRoute;

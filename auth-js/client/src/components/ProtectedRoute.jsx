import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

function ProtectedRoute({ children }) {
  const { auth } = useSelector((state) => state);

  if (auth.isAuthenticated && auth.user.activated) {
    return children;
  }

  return <Navigate to="/login" replace />;
}

export default ProtectedRoute;

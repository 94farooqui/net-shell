import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";


const PrivateRoute = () => {
  const {user, setUser, authLoading, authError} = useAuth();

  if (authLoading) return <div>Loading...</div>;

  return user ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;

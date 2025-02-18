import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../Context/useAuth";

const ProtectedRouter = () => {
  const { user } = useAuth();

  return user ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRouter;

import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router";
import { userSelector } from "../store";
import { ROUTE } from "./routes";
import { useEffect } from "react";

const ProtectedRoute = () => {
  const navigate = useNavigate();
  const user = useSelector(userSelector);

  useEffect(() => {
    if (!user) {
      navigate(ROUTE.HOME);
    }
  }, [user, navigate]);

  return user ? <Outlet /> : null;
};

export default ProtectedRoute;

import React, { useEffect } from "react";
import LoginPage from "./Login";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const LoginWrapper = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.user);

  useEffect(() => {
    if (isAuthenticated === true) {
      navigate("/homedash");
    }
  }, []);

  return (
    <div className="fixed w-full bg-white" style={{ zIndex: "1000" }}>
      <LoginPage />
    </div>
  );
};

export default LoginWrapper;

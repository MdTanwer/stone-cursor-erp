import React from "react";
import { LoginPage } from "../../Routes";

const loginWrapper = () => {
  return (
    <div className="fixed w-full bg-white" style={{ zIndex: "1000" }}>
      <LoginPage />
    </div>
  );
};

export default loginWrapper;

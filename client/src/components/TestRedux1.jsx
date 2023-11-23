import React from "react";
import { useSelector } from "react-redux";
const TestRedux1 = () => {
  const { user } = useSelector((state) => ({ ...state }));

  return (
    <div>
      <h1>{user.value}</h1>
      <h1>{user.user}</h1>
    </div>
  );
};

export default TestRedux1;

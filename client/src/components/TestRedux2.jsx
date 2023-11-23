import React from "react";
import { useDispatch } from "react-redux";
import { login, logout } from "../store/userSlice";

const TestRedux2 = () => {
  const dispatch = useDispatch();
  return (
    <div>
      <button className="btn btn-success" onClick={() => dispatch(login())}>
        Click!!
      </button>
      <button className="btn btn-success" onClick={() => dispatch(logout())}>
        Click!!
      </button>
    </div>
  );
};

export default TestRedux2;

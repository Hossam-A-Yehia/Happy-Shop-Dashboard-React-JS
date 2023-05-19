import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginFailure, loginSuccess, loginStart } from "../../store/userSlice";
import { publicRequest } from "../../Api/requestMethod";
import "./adminLogin.css";

function Login() {
  const dispatch = useDispatch();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [runn, setRuun] = useState(false);

  const [run, setRun] = useState(false);
  const [flag, setFlag] = useState(true);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(loginStart());
    setRun(true);
    setRuun(true);
    if (username === "" || password.length < 8) {
      setFlag(false);
      setRuun(false);
    }
    if (flag) {
      try {
        const res = await publicRequest.post("auth/login", {
          username,
          password,
        });
        dispatch(loginSuccess(res.data));
        setRuun(false);
      } catch (err) {
        dispatch(loginFailure());
        setRuun(false);
      }
    }
  };

  return (
    <div className="login  d-flex align-items-center justify-content-center w-100  ">
      <div style={{ width: "400px" }}>
        <form
          className=" mx-auto m-2"
          onSubmit={handleSubmit}
          style={{ position: "relative", zIndex: "4" }}
        >
          <h2 className="text-center text-light ">تسجيل دخول</h2>
          <label className=" px-2 mt-5 mb-1 text-white">اسم المستخدم</label>
          <input
            type="text"
            className="form-control  "
            placeholder="اكتب اسمك"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
          />
          {username === "" && run && (
            <p className="text-danger fs-5">يجب كتابة اسم المستخدم</p>
          )}
          <label className=" px-2 mt-4 mb-1 text-white">كلمة المرور</label>
          <input
            type="password"
            className="form-control"
            placeholder="اكتب كلمة المرور"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          {password.length < 8 && run && (
            <p className="text-danger fs-5">كلمة السر اقل من 8</p>
          )}
          <button
            className="btn btn-primary mt-3"
            disabled={runn}
            type="submit"
          >
            تسجيل دخول
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;

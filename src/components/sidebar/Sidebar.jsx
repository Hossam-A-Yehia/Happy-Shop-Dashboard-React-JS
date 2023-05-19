import React from "react";

import {
  Equalizer,
  PersonAdd,
  BlurLinear,
  PostAdd,
  MailOutline,
  Feedback,
  QuestionAnswer,
  People
} from "@material-ui/icons";
import "./sidebar.css";
import { Link } from "react-router-dom";
function Sidebar() {
  

  return (
    <div className="sidebar p-2">
      <div className="">
        <div
          className="text-secondary fw-bold "
          style={{ fontSize: "13px", opacity: "0.6" }}
        >
          الاحصائيات
        </div>
        <ul className="p-2">
          <Link to="/">
            <li
              className="d-flex align-items-center gap-1 text-secondary rounded"
              style={{ cursor: "pointer" }}
            >
              <Equalizer />
              الصفحة الرئيسية
            </li>
          </Link>
        </ul>
      </div>
      <div>
        <div
          className="text-secondary fw-bold "
          style={{ fontSize: "13px", opacity: "0.6" }}
        >
          لوحة التحكم
        </div>
        <ul className="p-2">
          <Link to="/users">
            <li
              className="d-flex align-items-center gap-1 text-secondary rounded"
              style={{ cursor: "pointer" }}
            >
              <People />
              المتسخدمين
            </li>
          </Link>
          <Link to="/newUser">
          <li
            className="d-flex align-items-center gap-1 text-secondary rounded"
            style={{ cursor: "pointer" }}
          >
            <PersonAdd />
            اضافة مستخدم
          </li>
          </Link>
          <Link to="/products">
            <li
              className="d-flex align-items-center gap-1 text-secondary rounded"
              style={{ cursor: "pointer" }}
            >
              <BlurLinear />
              المنتجات
            </li>
          </Link>
          <Link to="/newProduct">
          <li
            className="d-flex align-items-center gap-1 text-secondary rounded"
            style={{ cursor: "pointer" }}
          >
            <PostAdd />
            اضافة منتج 
          </li>
          </Link>
        </ul>
      </div>
      <div className="">
        <div
          className="text-secondary fw-bold "
          style={{ fontSize: "13px", opacity: "0.6" }}
        >
          التواصل
        </div>
        <ul className="p-2">
        <Link to="/comments">
        <li
            className="d-flex align-items-center gap-1 text-secondary rounded"
            style={{ cursor: "pointer" }}
          >
            <MailOutline />
            التعليقات
          </li>
        </Link>
        <Link to="/complaints">
        <li
            className="d-flex align-items-center gap-1 text-secondary rounded"
            style={{ cursor: "pointer" }}
          >
            <Feedback />
            الشكاوي
          </li>
        </Link>
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;

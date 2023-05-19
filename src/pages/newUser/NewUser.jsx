import { useState } from "react";
import { userRequest } from "../../Api/requestMethod";
import "./newUser.css";
export default function NewUser() {
  const [newUser, setNewUser] = useState({});
  const [admin, setAdmin] = useState(false);

  const handleChange = (e) => {
    setNewUser((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleCheck = (e) => {
    const checked = e.target.checked;
    if (checked) {
      setAdmin(true);
    } else {
      setAdmin(false);
    }
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await userRequest.post("auth/register", {
        ...newUser,
        isAdmin: admin,
      });
      window.location.replace("/users");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="p-3 my-2 newUser " style={{ flex: "4" }}>
      <h1 className="">اضافة مستخدم جديد</h1>
      <form className="row flex-wrap " data-aos="zoom-in">
        <div className="col-md-12 col-lg-6">
          <div
            className="inputs d-flex flex-column mt-2"
            style={{ width: "400px" }}
          >
            <label
              className="mb-1 fw-bold text-secondary"
              style={{ fontSize: "14px" }}
            >
              الاسم
            </label>
            <input
              className="form-control"
              type="text"
              placeholder=" اسم المستخدم بالكامل"
              name="username"
              onChange={handleChange}
            />
          </div>
          <div
            className="inputs  d-flex flex-column mt-2"
            style={{ width: "400px" }}
          >
            <label
              className="mb-1 fw-bold text-secondary"
              style={{ fontSize: "14px" }}
            >
              البريد الالكتروني
            </label>
            <input
              className="form-control"
              type="email"
              placeholder="البريد الالكتروني"
              name="email"
              onChange={handleChange}
            />
          </div>
          <div
            className=" inputs d-flex flex-column mt-2"
            style={{ width: "400px" }}
          >
            <label
              className="mb-1 fw-bold text-secondary"
              style={{ fontSize: "14px" }}
            >
              العنوان
            </label>
            <input
              className="form-control"
              type="text"
              placeholder="العنوان بالكامل"
              name="address"
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="col-md-12 col-lg-6">
          <div
            className="inputs d-flex flex-column mt-2"
            style={{ width: "400px" }}
          >
            <label
              className="mb-1 fw-bold text-secondary"
              style={{ fontSize: "14px" }}
            >
              الهاتف
            </label>
            <input
              className="form-control"
              type="number"
              placeholder="رقم الهاتف"
              name="phone"
              onChange={handleChange}
            />
          </div>
          <div
            className="inputs d-flex flex-column mt-2"
            style={{ width: "400px" }}
          >
            <label
              className="mb-1 fw-bold text-secondary"
              style={{ fontSize: "14px" }}
            >
              كلمة السر
            </label>
            <input
              className="form-control"
              type="password"
              placeholder="اكتب كلمة المرور"
              name="password"
              onChange={handleChange}
            />
          </div>
          <div
            className="inputs d-flex flex-column mt-2"
            style={{ width: "400px" }}
          >
            <label
              className="mb-1 fw-bold text-secondary"
              style={{ fontSize: "14px" }}
            >
              تأكيد كلمة السر
            </label>
            <input
              className="form-control"
              type="password"
              placeholder="اكتب كلمة المرور"
            />
          </div>
          <div class="input-group-text my-2" style={{ width: "fit-content" }}>
            <input
              class="form-check-input"
              type="checkbox"
              onChange={handleCheck}
            />
            <label
              className="fw-bold text-secondary me-2"
              style={{ fontSize: "14px" }}
            >
              مسؤول
            </label>
          </div>
        </div>
        <div className="col-3">
          <button className="btn btn-primary" onClick={handleClick}>
            اضافة
          </button>
        </div>
      </form>
    </div>
  );
}

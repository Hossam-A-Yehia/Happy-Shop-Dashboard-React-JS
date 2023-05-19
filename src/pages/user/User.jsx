import {
  CalendarToday,
  LocationSearching,
  MailOutline,
  PermIdentity,
  PhoneAndroid,
  Publish,
} from "@material-ui/icons";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import "./user.css";
import { Link, useParams } from "react-router-dom";
import { userRequest } from "../../Api/requestMethod";
import { useEffect, useState } from "react";
import { format } from "timeago.js";
import app from "../../firebase";
import Loader3 from "../loader/Loader3";

export default function User() {
  const { userId } = useParams();
  const [user, setUser] = useState({});
  const [updateUser, setUpdateUser] = useState({});
  const [file, setFile] = useState(null);
  const [img, setImg] = useState("");
  const [admin, setAdmin] = useState(false);
  const [load, setLoad] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      setLoad(true);
      try {
        const res = await userRequest.get(`users/find/${userId}`);
        setUser(res.data);
        setLoad(false);
      } catch (err) {
        console.log(err);
        setLoad(false);
      }
    };
    fetchUser();
    if (file !== null) {
      const fileName = new Date().getTime() + file?.name;
      const storage = getStorage(app);
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
        },
        (error) => {
          console.log("IMG Erorr ");
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setImg(downloadURL);
          });
        }
      );
    }
  }, [userId, file]);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setUpdateUser((prev) => {
      return { ...prev, [name]: value };
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
      await userRequest.put(`users/${userId}`, {
        ...updateUser,
        img: img ? img : user.img,
        isAdmin: admin,
      });
      window.location.replace("/users");
    } catch (err) {
      console.log(err);
    }
  };
  console.log(user);
  return (
    <div className="m-3 p-3" style={{ flex: "4" }}>
      <div className="d-flex align-items-center justify-content-between">
        <h1>تحديث معلومات المستخدم</h1>
        <Link to="/newUser">
          <button className="btn btn-primary">اضافة مستخدم جديد</button>
        </Link>
      </div>
      <div className="container__info d-flex mt-3 gap-3">
        <div
          className="shadow p-3 position-relative"
          style={{ flex: "1", minHeight: "500px" }}
        >
          {load ? (
            <Loader3 width="100px" height="100px" />
          ) : (
            <>
              <div className="d-flex align-items-center" data-aos="fade-up">
                <img
                  src={img ? img : user.img}
                  alt=""
                  className="rounded-circle"
                  style={{ width: "40px", height: "40px", objectFit: "cover" }}
                />
                <div className="d-flex flex-column me-3" data-aos="fade-up">
                  <span className="fw-bold">{user.username}</span>
                  <span
                    data-aos="fade-up"
                    className="text-secondary fw-bold"
                    style={{ fontSize: "14px" }}
                  >
                    {user.isAdmin ? "مسؤول" : "مستخدم"}
                  </span>
                </div>
              </div>
              <div className="mt-3" data-aos="fade-up">
                <span
                  className="fw-bold text-secondary"
                  style={{ fontSize: "14px" }}
                >
                  معلومات المستخدم
                </span>
                <div className="d-flex align-items-center mx-0 my-3">
                  <PermIdentity className="fs-5" />
                  <span className="me-2">{user.username}</span>
                </div>
                <div className="d-flex align-items-center mx-0 my-3">
                  <CalendarToday className="fs-5" />
                  <span className="me-2" style={{ direction: "ltr" }}>
                    {format(user.createdAt)}
                  </span>
                </div>
                <span
                  className="fw-bold text-secondary"
                  style={{ fontSize: "14px" }}
                >
                  وسائل التواصل
                </span>
                <div className="d-flex align-items-center mx-0 my-3">
                  <PhoneAndroid className="fs-5" />
                  <span className="me-2"> {user.phone} +20</span>
                </div>
                <div className="d-flex align-items-center mx-0 my-3">
                  <MailOutline className="fs-5" />
                  <span className="me-2">{user.email}</span>
                </div>
                <div className="d-flex align-items-center mx-0 my-3">
                  <LocationSearching className="fs-5" />
                  <span className="me-2">{user.address}</span>
                </div>
              </div>
            </>
          )}
        </div>
        <div
          className="shadow p-3  position-relative"
          style={{ flex: "2", minHeight: "500px" }}
        >
          {load ? (
            <Loader3 width="100px" height="100px" />
          ) : (
            <>
              <span className="fw-bold fs-4">تحديث</span>
              <form
                className="d-flex justify-content-between mt-3"
                data-aos="fade-up"
              >
                <div className="w-50">
                  <div className="d-flex flex-column mt-1">
                    <label style={{ marginBottom: "5px", fontSize: "14px" }}>
                      اسم المتسخدم
                    </label>
                    <input
                      name="username"
                      type="text"
                      placeholder={user.username}
                      className="form-control"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="d-flex flex-column mt-1">
                    <label style={{ marginBottom: "5px", fontSize: "14px" }}>
                      البريد الالكتروني
                    </label>
                    <input
                      name="email"
                      type="text"
                      placeholder={user.email}
                      className="form-control "
                      onChange={handleChange}
                    />
                  </div>
                  <div className="d-flex flex-column mt-1">
                    <label style={{ marginBottom: "5px", fontSize: "14px" }}>
                      العنوان
                    </label>
                    <input
                      name="address"
                      type="text"
                      placeholder={user.address}
                      onChange={handleChange}
                      className="form-control "
                    />
                  </div>
                  <div className="d-flex flex-column mt-1">
                    <label style={{ marginBottom: "5px", fontSize: "14px" }}>
                      رقم الهاتف
                    </label>
                    <input
                      name="phone"
                      type="text"
                      placeholder={user.phone}
                      className="form-control "
                      onChange={handleChange}
                    />
                  </div>
                  <div className="d-flex flex-column mt-1">
                    <label style={{ marginBottom: "5px", fontSize: "14px" }}>
                      كلمة السر
                    </label>
                    <input
                      name="password"
                      type="text"
                      placeholder="يجب كتابة كلمة السر"
                      className="form-control "
                      onChange={handleChange}
                    />
                  </div>
                  <div
                    class="input-group-text mt-2"
                    style={{ width: "fit-content" }}
                  >
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
                <div className="d-flex flex-column justify-content-between">
                  <div className="d-flex align-items-center">
                    <img
                      src={img ? img : user.img}
                      alt=""
                      className="rounded ms-3"
                      style={{
                        width: "100px",
                        height: "100px",
                        objectFit: "cover",
                      }}
                    />
                    <label htmlFor="file">
                      <Publish style={{ cursor: "pointer" }} />
                    </label>
                    <input
                      type="file"
                      id="file"
                      onChange={(e) => setFile(e.target.files[0])}
                      style={{ display: "none" }}
                    />
                  </div>
                  <button
                    className="btn btn-success mt-2"
                    onClick={handleClick}
                  >
                    تحديث
                  </button>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

import React, { useEffect, useState } from "react";
import { userRequest } from "../../Api/requestMethod";
import Loader from "../loader/Loader";
import { Search } from "@material-ui/icons";
import "./comment.css";
function Comments() {
  const [comments, setComments] = useState([]);
  const [reload, setReload] = useState(1);
  const [load, setLoad] = useState(false);
  const [searchByProduct, setSearchByProduct] = useState("");
  const [searchByUser, setSearchByUser] = useState("");
  const [newData, setNewData] = useState([]);

  useEffect(() => {
    const fetchComments = async () => {
      setLoad(true);
      try {
        const res = await userRequest.get("comments");
        setComments(res.data);
        setLoad(false);
      } catch (err) {
        console.log(err);
        setLoad(false);
      }
    };
    fetchComments();
  }, [reload]);

  useEffect(() => {
    setNewData(
      comments.filter((comment) => {
        if (
          searchByProduct.toLowerCase() === "" &&
          searchByUser.toLowerCase() === ""
        ) {
          return comment;
        } else if (searchByProduct.toLowerCase() !== "") {
          return comment.productTitle.toLowerCase().includes(searchByProduct);
        } else if (searchByUser.toLowerCase() !== "") {
          return comment.username.toLowerCase().includes(searchByUser);
        }
      })
    );
  }, [searchByProduct, searchByUser, comments]);

  const handleDelete = async (e) => {
    try {
      await userRequest.delete(`comments/${e}`);
    } catch (err) {
      console.log(err);
    }
    setReload(reload + 1);
  };

  return (
    <div className=" comments p-3 my-3 position-relative" style={{ flex: "4" }}>
      <h1 className="mb-3">التعليقات</h1>
      <div className="d-flex  align-items-center flex-wrap justify-content-around">
        <form
          className=" position-relative col-12 col-md-5 mb-2"
          role="search"
          data-aos="fade-up"
        >
          <input
            className="form-control bg-white fw-bold"
            type="search"
            placeholder="اسم المستخدم"
            onChange={(e) => setSearchByUser(e.target.value)}
            style={{ fontFamily: "inherit " }}
          />
          <Search
            className=" fs-3  position-absolute top-50"
            style={{
              fontSize: "30",
              left: "25px",
              transform: "translatey(-50%)",
            }}
          />
        </form>
        <form
          className="position-relative col-12 col-md-5 "
          role="search"
          data-aos="fade-up"
        >
          <input
            className="form-control bg-white fw-bold"
            type="search"
            placeholder="اسم المنتج"
            onChange={(e) => setSearchByProduct(e.target.value)}
            style={{ fontFamily: "inherit " }}
          />
          <Search
            className=" fs-3  position-absolute top-50"
            style={{
              fontSize: "30",
              left: "25px",
              transform: "translatey(-50%)",
            }}
          />
        </form>
      </div>
      {load ? (
        <Loader width="150px" height="150px" />
      ) : (
        <table class="table table-info table-striped mt-3" data-aos="fade-up">
          <thead>
            <tr>
              <th scope="col">المستخدم</th>
              <th scope="col">المنتج</th>
              <th scope="col">التعليق</th>
              <th scope="col">حذف</th>
            </tr>
          </thead>
          <tbody>
            {newData.map((e) => (
              <tr>
                <td className="">
                  <img
                    className="rounded-circle ms-2"
                    style={{
                      width: "32px",
                      height: "32px",
                      objectFit: "cover",
                    }}
                    src={e.img}
                    alt=""
                  />
                  <span className="fw-bold">{e.username}</span>
                </td>
                <td>
                  <img
                    className="rounded-circle ms-2"
                    style={{
                      width: "32px",
                      height: "32px",
                      objectFit: "cover",
                    }}
                    src={e.productImg}
                    alt=""
                  />
                  <span className="fw-bold">{e.productTitle}</span>
                </td>
                <td
                  className="fw-bold text-secondary"
                  style={{ fontSize: "14px" }}
                >
                  {e.comment}
                </td>
                <td>
                  <button
                    onClick={() => handleDelete(e._id)}
                    className="btn btn-danger"
                  >
                    حذف
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Comments;

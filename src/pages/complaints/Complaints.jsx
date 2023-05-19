import React, { useEffect, useState } from "react";

import "./complaints.css";
import axios from "axios";
import { userRequest } from "../../Api/requestMethod";
import { format } from "timeago.js";
import Loader from "../loader/Loader";

function Complaints() {
  const [data, setData] = useState([]);
  const [reload, setReload] = useState(1);
  const [load, setLoad] = useState(false);

  useEffect(() => {
    const fetchComplaints = async () => {
      setLoad(true);
      try {
        const res = await userRequest.get("complaints");
        setData(res.data);
        setLoad(false);
      } catch (err) {
        console.log(err);
        setLoad(false);
      }
    };
    fetchComplaints();
  }, [reload]);

  const handleDelete = async (id) => {
    try {
      await userRequest.delete(`complaints/${id}`);
    } catch (err) {
      console.log(err);
    }
    setReload(reload + 1);
  };
  console.log(data);

  return (
    <div className=" complaintsBox p-3 my-3 position-relative" data-aos="zoom-in" style={{ flex: "4" }}>
      <h1 className="mb-3">الشكاوي</h1>
      {load ? (
        <Loader height="150px" width="150px" />
      ) : (
        <div className=" my-5 ">
          <div className="container">
            <div className="boxs">
              {data ? (
                data.map((e) => (
                  <div
                    key={e._id}
                    className="shadow p-3 rounded text-right my-2 position-relative"
                    data-aos="zoom-in"
                    style={{ background: "#eee" }}
                  >
                    <img src={e.img} alt="" />
                    <h2 className="fs-5">{e.username}</h2>
                    <p className=" text-secondary fw-bold">{e.complaint}</p>
                    <div className="d-flex align-items-center justify-content-between">
                      <button
                        onClick={() => handleDelete(e._id)}
                        className="btn btn-danger"
                      >
                        حذف
                      </button>
                      <span
                        className="d-inline-block fw-bold text-secondary "
                        style={{
                          fontSize: "15px",
                          direction: "ltr",
                          cursor: "pointer",
                        }}
                      >
                        {format(e.createdAt)}
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <h1>لا يوجد شكاوي</h1>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Complaints;

import { Visibility } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import { userRequest } from "../../../Api/requestMethod";
import Loader2 from "../../../pages/loader/Loader2";

function NewMember() {
  const [member, setMember] = useState([]);
  const [load, setLoad] = useState(false);

  useEffect(() => {
    const fetchNewMember = async () => {
      setLoad(true);

      try {
        const res = await userRequest.get("users/?new=true");
        setMember(res.data);
        setLoad(false);
      } catch (err) {
        console.log(err);
        setLoad(false);
      }
    };
    fetchNewMember();
  }, []);

  return (
    <div
      className="newMember my-2 p-3 shadow ms-4 position-relative"
      data-aos="fade-up"
      style={{ flex: "1", minHeight: "200px" }}
    >
      {load ? (
        <Loader2 width={"300px"} height={"200px"} />
      ) : (
        <>
          <div className="fs-5 fw-bold mb-3 ">مستخدمين جدد</div>
          <div className="d-flex flex-column gap-3">
            {member.map((e) => (
              <div className="d-flex align-items-center justify-content-between">
                <div className="d-flex align-items-center gap-2">
                  <img
                    src={
                      e.img ||
                      "https://i.pinimg.com/564x/f1/0f/f7/f10ff70a7155e5ab666bcdd1b45b726d.jpg"
                    }
                    className="rounded-circle"
                    alt=""
                    style={{ width: "45px", height: "45px" }}
                  />
                  <div className="d-flex flex-column">
                    <h6 className="m-0 fw-bold">{e.username}</h6>
                    <span
                      className="text-secondary fw-bold"
                      style={{ fontSize: "14px" }}
                    >
                      {e.isAdmin ? "ادمن" : "مستخدم"}
                    </span>
                  </div>
                </div>
                <button
                  className="btn fw-bold d-flex align-items-center gap-1 text-secondary"
                  style={{
                    backgroundColor: "#2196f33b",
                    padding: "5px 12px",
                    fontSize: "13px",
                  }}
                >
                  <Visibility fontSize="small" /> اخفاء
                </button>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default NewMember;

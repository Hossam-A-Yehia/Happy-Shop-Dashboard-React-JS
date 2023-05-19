import "./latsetTrans.css";
import { useEffect, useState } from "react";
import { userRequest } from "../../../Api/requestMethod";
import { format } from "timeago.js";
import Loader2 from "../../../pages/loader/Loader2";

function LatsetTrans() {
  const [trans, setTrans] = useState([]);
  const [load, setLoad] = useState(false);

  const Button = ({ type }) => {
    return <button className={`status__button ${type}`}>{type}</button>;
  };

  useEffect(() => {
    const fetchTrans = async () => {
      setLoad(true);
      try {
        const res = await userRequest.get("order");
        setTrans(res.data);
        setLoad(false);
      } catch (err) {
        console.log(err);
        setLoad(false);
      }
    };
    fetchTrans();
  }, []);

  console.log(trans);
  return (
    <div
      className=" latesTrans my-2 p-3 shadow position-relative h-100"
      data-aos="fade-up"
      style={{ flex: "2", minHeight: "200px" }}
    >
      <div className="fs-5 fw-bold mb-3">احدث المعاملات</div>
      {load ? (
        <Loader2 width={"100px"} height={"100px"} />
      ) : (
        <table class="table">
          <thead>
            <tr>
              <th scope="col">المستخدمين</th>
              <th scope="col">التاريخ</th>
              <th scope="col">المبلغ</th>
              <th scope="col">الحالة</th>
            </tr>
          </thead>
          <tbody>
            {trans.map((e) => (
              <tr>
                <td className="d-flex align-items-center gap-3 td__latest">
                  {e.userId}
                </td>
                <td className="td__latest text-secondary">
                  {format(e.createdAt)}
                </td>
                <td className="td__latest text-secondary">{e.amount}</td>
                <td className="td__latest">
                  <Button type={e.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default LatsetTrans;

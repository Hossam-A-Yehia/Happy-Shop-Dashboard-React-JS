import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { userRows } from "../../dummyData/dummyData";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { userRequest } from "../../Api/requestMethod";
import Loader from "../loader/Loader";
import {Search} from "@material-ui/icons"
export default function UserList() {
  const [users, setUsers] = useState([]);
  const [load, setLoad] = useState(false);
  const [searchByTitle, setSearchByTitle] = useState("");
  const [newData, setNewData] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoad(true);
      try {
        const res = await userRequest.get("users");
        setUsers(res.data);
        setLoad(false);
      } catch (err) {
        setLoad(false);

        console.log(err);
      }
    };
    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    setUsers(users.filter((item) => item._id !== id));
    try {
      const res = await userRequest.delete(`users/${id}`);
    } catch (err) {
      console.log(err);
    }
  };

  const columns = [
    {
      field: "user",
      headerName: "اسم المستخدم",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="d-felx align-items-center" >
            <img
              className="rounded-circle ms-2"
              style={{ width: "32px", height: "32px", objectFit: "cover" }}
              src={
                params.row.img ||
                "https://i.pinimg.com/564x/f1/0f/f7/f10ff70a7155e5ab666bcdd1b45b726d.jpg"
              }
              alt=""
            />
            {params.row.username}
          </div>
        );
      },
    },
    { field: "email", headerName: "البريد الالكتروني", width: 200 },

    {
      field: "address",
      headerName: "العنوان",
      width: 160,
    },
    {
      field: "phone",
      headerName: "الهاتف",
      width: 160,
    },
    {
      field: "action",
      headerName: "تحديث / حذف",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/user/" + params.row._id}>
              <button className="btn btn-success ms-2" >
                تحديث
              </button>
            </Link>
            <button
              
              className="btn btn-danger"
              onClick={() => handleDelete(params.row._id)}
            >
              حذف
            </button>
          </>
        );
      },
    },
  ];
  useEffect(() => {
    const filterUsers = () => {
      setNewData(users.filter(user => {
        if(searchByTitle.toLowerCase() === "") {
          return user
        }else  {
          return user.username.toLowerCase().includes(searchByTitle)
        }
      }))
    }
    filterUsers()
  }, [searchByTitle,users])
  return (
    <div className="p-3 m-3 position-relative" style={{ flex: "4" }}>
      <h1 className="mb-3">قائمة المستخدمين</h1>
      <form className="w-100 position-relative my-3" role="search" data-aos="fade-up">
        <input
          className="form-control bg-white fw-bold"
          type="search"
          placeholder="اسم المستخدم"
          onChange={(e) => setSearchByTitle(e.target.value)}
          style={{  fontFamily: "inherit " }}
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
      {load ? (
        <Loader width={"150px"} height={"150px"} />
      ) : (
        <DataGrid
          rows={newData}
          disableSelectionOnClick
          columns={columns}
          getRowId={(row) => row._id}
          pageSize={8}
          checkboxSelection
        />
      )}
    </div>
  );
}

// import "./productList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline, Search } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { userRequest } from "../../Api/requestMethod";
import { format } from "timeago.js";
import Loader from "../loader/Loader";

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [load, setLoad] = useState(false);
  const [searchByTitle, setSearchByTitle] = useState("");
  const [newData, setNewData] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoad(true);
      try {
        const res = await userRequest.get("products");
        setProducts(res.data);
        setLoad(false);
      } catch (err) {
        console.log(err);
        setLoad(false);
      }
    };
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    setProducts(products.filter((item) => item._id !== id));
    try {
      const res = await userRequest.delete(`products/${id}`);
    } catch (err) {
      console.log(err);
    }
  };

  const columns = [
    {
      field: "product",
      headerName: "المنتج",
      width: 300,
      renderCell: (params) => {
        return (
          <div className="d-flex align-items-center">
            <img
              className="rounded-circle ms-2"
              style={{ width: "32px", height: "32px", objectFit: "cover" }}
              src={params.row.img}
              alt=""
            />
            {params.row.title}
          </div>
        );
      },
    },
    {
      field: "price",
      headerName: "السعر",
      width: 150,
      renderCell: (params) => {
        return (
          <div className="d-flex align-items-center gap-1">
            {params.row.price} <sup className="fw-bold">جنيه</sup>
          </div>
        );
      },
    },
    {
      field: "createdAt",
      headerName: "تاريخ الاضافة",
      width: 150,
      renderCell: (params) => {
        return (
          <div className="fw-bold" style={{ direction: "ltr" }}>
            {format(params.row.createdAt)}
          </div>
        );
      },
    },
    {
      field: "rate",
      headerName: "التقييم",
      width: 120,
    },
    {
      field: "action",
      headerName: "حذف / تحديث",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/product/" + params.row._id}>
              <button className="btn btn-success">تحديث</button>
            </Link>
            <button
              className="btn btn-danger me-3"
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
    const filterProducts = () => {
      setNewData(
        products.filter((product) => {
          if (searchByTitle.toLowerCase() === "") {
            return product;
          } else {
            return product.title.toLowerCase().includes(searchByTitle);
          }
        })
      );
    };
    filterProducts();
  }, [searchByTitle, products]);
  return (
    <div className="p-3 my-2 position-relative" style={{ flex: "4" }}>
      <h1 className="mb-3">قائمة المنتجات</h1>
      <form
        className="w-100 position-relative my-3"
        role="search"
        data-aos="fade-up"
      >
        <input
          className="form-control bg-white fw-bold"
          type="search"
          placeholder="اسم المنتج"
          onChange={(e) => setSearchByTitle(e.target.value)}
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
      {load ? (
        <Loader height="150px" width="150px" />
      ) : (
        <DataGrid
          rows={newData}
          disableSelectionOnClick
          columns={columns}
          getRowId={(row) => row._id}
          pageSize={20}
          checkboxSelection
        />
      )}
    </div>
  );
}

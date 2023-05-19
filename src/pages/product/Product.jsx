import { Link, useParams } from "react-router-dom";
import { Publish } from "@material-ui/icons";
import { useEffect, useState } from "react";
import { userRequest } from "../../Api/requestMethod";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../../firebase";
import Loader3 from "../loader/Loader3";

export default function Product() {
  const [product, setProduct] = useState({});
  const { productId } = useParams();
  const [newProduct, setNewProduct] = useState({});
  const [file, setFile] = useState(null);
  const [cat, setCat] = useState([]);
  const [newColor, setNewColor] = useState([]);
  const [newSize, setNewSize] = useState([]);
  const [img, setImg] = useState("");
  const [load, setLoad] = useState(false);
  const [prog, setProg] = useState();
  

  const category = product.categories?.join(" - ");
  const color = product.color?.join(" - ");
  const size = product.size?.join(" - ");
  useEffect(() => {
    const fetchProduct = async () => {
      setLoad(true);
      try {
        const res = await userRequest.get(`products/find/${productId}`);
        setProduct(res.data);
        setLoad(false);
      } catch (err) {
        console.log(err);
        setLoad(false);
      }
    };
    fetchProduct();

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
          setProg(progress)
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
  }, [file]);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setNewProduct((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const handleCat = (e) => {
    setCat(e.target.value.split("-"));
  };
  const handleColor = (e) => {
    setNewColor(e.target.value.split("-"));
  };
  const handleSize = (e) => {
    setNewSize(e.target.value.split("-"));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await userRequest.put(`products/${productId}`, {
        ...newProduct,
        img: img ? img : product.img,
        categories: cat.length > 0 ? cat : product.categories,
        color: newColor.length > 0 ? newColor : product.color,
        size: newSize.length > 0 ? newSize : product.size,
      });
      window.location.replace("/products");
    } catch (err) {
      console.log(err);
    }
  };
console.log(prog);
  return (
    <div className="p-3 my-2 " style={{ flex: "4" }}>
      <div className="d-flex align-items-center justify-content-between">
        <h1 className="">تحديث المنتج</h1>
        <Link to="/newproduct">
          <button className="btn btn-primary">اضافة منتج جديد</button>
        </Link>
      </div>
      <div className="d-flex position-relative" style={{ minHeight: "300px" }}>
        {load ? (
          <Loader3 height="100px" width="100px" />
        ) : (
          <div className="shadow p-3 m-3" style={{ flex: "1" }} data-aos="fade-up">
            <div className="d-flex align-items-center">
              <img
                src={product.img}
                alt=""
                className="rounded-circle ms-3"
                style={{ width: "40px ", height: "40px" }}
              />
              <span className="fw-bold">{product.title}</span>
            </div>
            <div className="mt-2">
              <div className="d-flex align-items-center gap-2 my-2">
                <span className="fw-bold">اسم المنتج :</span>
                <span className="text-secondary fw-bold">{product.title}</span>
              </div>
              <div className="d-flex align-items-center gap-2 my-2">
                <span className="fw-bold">السعر : </span>
                <span className="text-secondary fw-bold">
                  {product.price} <sup>جنيه</sup>
                </span>
              </div>
              <div className="d-flex align-items-center gap-2 my-2">
                <span className="fw-bold">الفئات : </span>
                <span className="text-secondary fw-bold"> [ {category} ]</span>
              </div>
              {product.color?.length > 0 && (
                <div className="d-flex align-items-center gap-2 my-2">
                  <span className="fw-bold">اللون : </span>
                  <span className="text-secondary fw-bold">[ {color} ] </span>
                </div>
              )}
              {product.size?.length > 0 && (
                <div className="d-flex align-items-center gap-2 my-2">
                  <span className="fw-bold">الحجم : </span>
                  <span className="text-secondary fw-bold">[ {size} ] </span>
                </div>
              )}
              {product.rate && (
                <div className="d-flex align-items-center gap-2 my-2">
                  <span className="fw-bold">التقييم : </span>
                  <span className="text-secondary fw-bold">
                    {product.rate}
                  </span>
                </div>
              )}
              <div className="d-flex align-items-center gap-2 my-2">
                <span className="fw-bold">الوصف: </span>
                <span className="text-secondary fw-bold">
      
                  "{product.desc}"
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
      <div
        className="shadow p-3 m-3 position-relative"
        style={{ minHeight: "300px" }}
      >
        {load ? (
          <Loader3 height="100px" width="100px" />
        ) : (
          <form className="d-flex justify-content-between "         data-aos="zoom-in"
          >
            <div className="d-flex align-items-center justify-content-center gap-2 flex-column ">
              <div className="d-flex gap-5">
                <div className="d-flex flex-column">
                  <div className="d-flex align-items-start flex-column gap-1 mb-1">
                    <label className=" text-secondary">اسم المنتج</label>
                    <input
                      name="title"
                      onChange={handleChange}
                      className="form-control"
                      type="text"
                      placeholder={product.title}
                    />
                  </div>
                  <div className="d-flex align-items-start flex-column gap-1 mb-1">
                    <label className=" text-secondary">السعر</label>
                    <input
                      name="price"
                      onChange={handleChange}
                      className="form-control"
                      type="number"
                      placeholder={product.price}
                    />
                  </div>
                  <div className="d-flex align-items-start flex-column gap-1 mb-1">
                    <label className=" text-secondary">الفئات</label>
                    <input
                      onChange={handleCat}
                      className="form-control"
                      type="text"
                      placeholder={category}
                    />
                  </div>
                </div>
                <div className="d-flex flex-column">
                  <div className="d-flex align-items-start flex-column gap-1 mb-1">
                    <label className=" text-secondary">اللون</label>
                    <input
                      onChange={handleColor}
                      className="form-control"
                      type="text"
                      placeholder={color}
                    />
                  </div>

                  <div className="d-flex align-items-start flex-column gap-1 mb-1">
                    <label className=" text-secondary">الحجم</label>
                    <input
                      onChange={handleSize}
                      className="form-control"
                      type="text"
                      placeholder={size}
                    />
                  </div>

                  <div className="d-flex align-items-start flex-column gap-1 mb-1">
                    <label className=" text-secondary">التقييم</label>
                    <input
                      name="rate"
                      onChange={handleChange}
                      className="form-control"
                      type="text"
                      placeholder={product.rate}
                    />
                  </div>
                </div>
              </div>
              <div className="d-flex align-items-start flex-column gap-1 mb-1 w-100">
                <label className=" text-secondary">الوصف</label>
                <textarea
                  name="desc"
                  onChange={handleChange}
                  className="form-control"
                  placeholder={product.desc}
                  style={{ height: "100px" }}
                ></textarea>
              </div>
            </div>

            <div className="d-flex flex-column justify-content-center gap-5">
              <div className="d-flex align-items-center">
                <img
                  src={img ? img : product.img}
                  alt=""
                  className="rounded ms-2"
                  style={{ width: "100px", height: "100px" }}
                />
                <label for="file">
                  <Publish />
                </label>
                <input
                  type="file"
                  id="file"
                  onChange={(e) => setFile(e.target.files[0])}
                  style={{ display: "none" }}
                />
              </div>
              <button className="btn btn-success" onClick={handleClick}>
                تحديث
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

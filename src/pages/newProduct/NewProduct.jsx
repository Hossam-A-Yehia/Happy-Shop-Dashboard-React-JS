import "./newProduct.css";
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

export default function NewProduct() {
  const [newProduct, setNewProduct] = useState({});
  const [file, setFile] = useState(null);
  const [cat, setCat] = useState([]);
  const [newColor, setNewColor] = useState([]);
  const [newSize, setNewSize] = useState([]);
  const [img, setImg] = useState(
    "https://firebasestorage.googleapis.com/v0/b/shop-209b2.appspot.com/o/no-image-available-like-missing-picture-vector-43938299.jpg?alt=media&token=d4479b26-dcfe-475e-b7c6-ddd36dfbe5a4"
  );

  useEffect(() => {
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
      const res = await userRequest.post("products", {
        ...newProduct,
        img: img,
        categories: cat,
        color: newColor,
        size: newSize,
      });
      window.location.replace("/products");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className=" new__product p-3 my-2" style={{ flex: "4" }}>
      <h1 className="">اضافة منتج جديد</h1>
      <div className="shadow p-3 m-3 " data-aos="zoom-in">
        <form className="d-flex justify-content-between ">
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
                    placeholder=""
                  />
                </div>
                <div className="d-flex align-items-start flex-column gap-1 mb-1">
                  <label className=" text-secondary">السعر</label>
                  <input
                    name="price"
                    onChange={handleChange}
                    className="form-control"
                    type="number"
                    placeholder=""
                  />
                </div>
                <div className="d-flex align-items-start flex-column gap-1 mb-1">
                  <label className=" text-secondary">الفئات</label>
                  <input
                    onChange={handleCat}
                    className="form-control"
                    type="text"
                    placeholder=""
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
                    placeholder=""
                  />
                </div>

                <div className="d-flex align-items-start flex-column gap-1 mb-1">
                  <label className=" text-secondary">الحجم</label>
                  <input
                    onChange={handleSize}
                    className="form-control"
                    type="text"
                    placeholder=""
                  />
                </div>

                <div className="d-flex align-items-start flex-column gap-1 mb-1">
                  <label className=" text-secondary">التقييم</label>
                  <input
                    name="rate"
                    onChange={handleChange}
                    className="form-control"
                    type="text"
                    placeholder=""
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
                placeholder=""
                style={{ height: "100px" }}
              ></textarea>
            </div>
          </div>

          <div className="d-flex flex-column justify-content-center gap-5">
            <div className="d-flex align-items-center">
              <img
                src={
                  img
                    ? img
                    : "https://firebasestorage.googleapis.com/v0/b/shop-209b2.appspot.com/o/no-image-available-like-missing-picture-vector-43938299.jpg?alt=media&token=d4479b26-dcfe-475e-b7c6-ddd36dfbe5a4"
                }
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
            <button className="btn btn-primary" onClick={handleClick}>
              اضافة
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

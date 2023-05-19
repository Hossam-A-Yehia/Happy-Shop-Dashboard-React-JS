import { useDispatch } from "react-redux";
import { logout } from "../../store/userSlice";
import { Link } from "react-router-dom";

function Topbar() {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <nav class="navbar navbar-expand-lg " style={{ height: "50px" }}>
      <div class="container d-flex align-items-center justify-content-between">
        <Link to="/" class="fw-bold fs-4 text-primary">
          EreYehia
        </Link>
        <div className="d-flex align-items-center justify-content-center m-0 ">
          <img
            src={JSON.parse(localStorage.getItem("admin")).img}
            alt=""
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              cursor: "pointer",
            }}
          />
          <button
            onClick={handleLogout}
            className="btn btn-outline-primary me-2"
          >
            تسجيل خروج
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Topbar;

import Load from "../../assets/gif/loading-buffering.gif";
import "./loader.css";

function Loader2({width, height}) {
  return (
    <div style={{ flex: "4" }}>
    <div className="loa">
      <img src={Load} alt="" style={{maxHeight: height, maxWidth: width}} />
    </div>
  </div>
  )
}

export default Loader2
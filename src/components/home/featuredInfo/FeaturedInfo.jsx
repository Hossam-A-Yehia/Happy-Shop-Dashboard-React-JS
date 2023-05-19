import {ArrowDownward,ArrowUpward} from "@material-ui/icons"
import React from "react";

function FeaturedInfo() {
  return (
    <div className="d-flex flex-wrap gap-3 " data-aos="fade-up">
    <div className="d-flex gap-2 flex-column p-3 shadow rounded-2 col-12 col-lg-4   " >
    <h3 style={{fontWeight:"normal"}}>ارباح</h3>
      <div className="d-flex align-items-center gap-4">
      <span className="fw-bold fs-3">$2,454 </span>
      <div className="d-flex align-items-center gap-1">
        -11.4 
        <ArrowDownward className="text-danger fw-bold"/>
      </div>
      </div>
      <p className="text-secondary fw-bold opacity-75">مقارنة بالشهر الماضي </p>
    </div>
    <div className="d-flex gap-2 flex-column p-3 shadow rounded-2 col-12 col-lg-3  " >
    <h3 style={{fontWeight:"normal"}}>المبيعات</h3>
      <div className="d-flex align-items-center gap-4">
      <span className="fw-bold fs-3">$4,454 </span>
      <div className="d-flex align-items-center gap-1">
        -1.4 
        <ArrowDownward className="text-danger fw-bold"/>
      </div>
      </div>
      <p className="text-secondary fw-bold opacity-75">مقارنة بالشهر الماضي </p>
    </div>
    <div className="d-flex gap-2 flex-column p-3 shadow rounded-2 col-12 col-lg-4 " >
    <h3 style={{fontWeight:"normal"}}>التكاليف</h3>
      <div className="d-flex align-items-center gap-4">
      <span className="fw-bold fs-3">$2,023 </span>
      <div className="d-flex align-items-center gap-1">
        +2.4 
        <ArrowUpward className="text-success fw-bold"/>
      </div>
      </div>
      <p className="text-secondary fw-bold opacity-75">مقارنة بالشهر الماضي </p>
    </div>
  </div>
  )
}

export default FeaturedInfo
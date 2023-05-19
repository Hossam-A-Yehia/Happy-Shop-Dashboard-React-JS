import Chart from "../../components/home/chart/Chart";
import FeaturedInfo from "../../components/home/featuredInfo/FeaturedInfo";
import "./home.css";
import React from "react";

import { userData } from "../../dummyData/dummyData.js";
import NewMember from "../../components/home/newMember/NewMember";
import LatsetTrans from "../../components/home/latsetTrans/LatsetTrans";
function Home() {
  return (
    <div className="home p-3 my-2">
      <FeaturedInfo />
      {
        <Chart
          title="تفاصيل المتسخدمين النشيطين"
          grid
          data={userData}
          dataKey="مستخدم نشط"
        />
      }
      <div className="d-flex ">
        <NewMember />
        <LatsetTrans />
      </div>
    </div>
  );
}

export default Home;

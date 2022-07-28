import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { adminSelector, fetchMusicInsight } from "../../features/Admin/AdminSlice";
import "../../styles/allUser.css";
import LineChart from "../../components/Charts/LineChart";
import AdminMusicCard from "../../components/Admin/AdminMusicCard";
import { Rings } from "react-loader-spinner";

const MusicDashboard = () => {
  const dispatch = useDispatch();

  const { isError, isFetching, isSuccess, isMusicInsightSuccess, musicInsight } =
  useSelector(adminSelector);

useEffect(() => {
  dispatch(fetchMusicInsight({ token: localStorage.getItem("token") }));
}, []);

    const [musicData, setMusicData] = useState({
        labels: musicInsight.map((data) => data._id.month),
        datasets: [
          {
            label: "Musics",
            data: musicInsight.map((data) => data.count),
            backgroundColor: "#3d85a3",
            borderColor: "#3d85a3",
            borderWidth: 2,
          },
        ],
      });
  return (
    <div className="main-container">
      <AdminMusicCard/>
      <h4 className="mt-3">New Music Upload per Month</h4>
      <div className="m-5">
      {isMusicInsightSuccess?(
          <LineChart chartData={musicData} />
          ) : (
            <Rings />
          )}
        </div>
    </div>
  );
};

export default MusicDashboard;

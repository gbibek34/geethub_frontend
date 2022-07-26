import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { adminSelector, fetchUserInsight } from "../features/Admin/AdminSlice";
import { Rings } from "react-loader-spinner";
import { userSelector } from "../features/User/UserSlice";
import LineChart from "../components/Charts/LineChart";
import "../styles/allUser.css";
import AdminUserCard from "../components/Admin/AdminUserCard";
import AdminUserTable from "../components/Admin/AdminUserTable";

const AllUsersScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isError, isFetching, isSuccess, isUserInsightSuccess, userInsight } =
    useSelector(adminSelector);

  useEffect(() => {
    dispatch(fetchUserInsight({ token: localStorage.getItem("token") }));
  }, []);

  const [musicData, setMusicData] = useState({
    labels: userInsight.map((data) => data._id.month),
    datasets: [
      {
        label: "New Users",
        data: userInsight.map((data) => data.count),
        backgroundColor: "#3d85a3",
        borderColor: "#3d85a3",
        borderWidth: 2,
      },
    ],
  });

  return (
    <div className="main-container monetization-container">
      <AdminUserCard />
      <h4 className="mt-3">New User Registered per Month</h4>
      <div className="m-5">
      {isUserInsightSuccess?(
        <LineChart chartData={musicData} />
        ) : (
          <Rings />
        )}
      </div>
      <h4 className="mt-3">User Details</h4>
      <AdminUserTable />
    </div>
  );
};

export default AllUsersScreen;

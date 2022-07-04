import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import LineChart from "../../components/Charts/LineChart";
import MonetizationTransactionCard from "../../components/Monetization/MonetizationTransactionCard";
import MonetizationTransactionTable from "../../components/Monetization/MonetizationTransactionTable";
import {
  fetchMonetizationData,
  monetizationSelector,
} from "../../features/Admin/MonetizationSlice";
import "../../styles/Monetization.css";

function Monetization() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchMonetizationData(localStorage.getItem("token")));
  }, []);

  const { isFetching, isError, isSuccess, loadData, withdrawData, tipData } =
    useSelector(monetizationSelector);

  // let dt = new Date();
  // let mth = dt.getMonth(); // 0 to 11
  // mth += 1;
  // let start1 = mth + 1;
  // let end1 = 12;
  // const range1 = [...Array(end1 - start1 + 1).keys()].map((x) => x + start1);
  // let start2 = 1;
  // let end2 = mth;
  // const range2 = [...Array(end2 - start2 + 1).keys()].map((x) => x + start2);
  // const month = [...range1, ...range2];
  // console.log(month);

  const [transactionData, setTransactionData] = useState({
    labels: loadData.map((data) => data._id.month),
    datasets: [
      {
        label: "Withdraw Transaction",
        data: withdrawData.map((data) => data.totalAmount),
        backgroundColor: "red",
        borderColor: "red",
        borderWidth: 2,
      },
      {
        label: "Load Transaction",
        data: loadData.map((data) => data.totalAmount),
        backgroundColor: "green",
        borderColor: "green",
        borderWidth: 2,
        fill: true,
      },
    ],
  });

  const [tipChartData, setTipChartData] = useState({
    labels: tipData.map((data) => data._id.month),
    datasets: [
      {
        label: "Tip Transaction",
        data: tipData.map((data) => data.totalAmount),
        backgroundColor: "#3d85a3",
        borderColor: "#3d85a3",
        borderWidth: 2,
      },
    ],
  });

  return (
    <div className="monetization-container">
      <MonetizationTransactionCard />
      <div>
        <div className="m-5">
          <LineChart chartData={transactionData} />
        </div>
        <div className="m-5">
          <LineChart chartData={tipChartData} />
        </div>
      </div>

      <MonetizationTransactionTable />
    </div>
  );
}

export default Monetization;

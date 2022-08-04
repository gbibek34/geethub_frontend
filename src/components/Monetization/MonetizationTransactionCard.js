import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchMonetizationTotal,
  monetizationSelector,
} from "../../features/Admin/MonetizationSlice";

function MonetizationTransactionCard() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchMonetizationTotal(localStorage.getItem("token")));
  }, []);

  const {
    isFetching,
    isError,
    isSuccess,
    amount,
    load_count,
    withdraw_count,
    tip_count,
  } = useSelector(monetizationSelector);

  return (
    <div className="row p-3">
      <div className="col-sm-12 col-md-6 col-xl-3 px-1">
        <div className="card mt-2 rounded">
          <div className="card-body">
            <h6>Geethub Balance</h6>
            <h4>Rs. {amount}</h4>
            <div className="text-sm">
              <span className="badge badge-pill bg-soft-success text-success mr-2">
              <i className="fa fa-arrow-up mr-1"></i>
                0%
              </span>
              <span>from last month</span>
            </div>
          </div>
        </div>
      </div>
      <div className="col-sm-12 col-md-6 col-xl-3 px-1">
        <div className="card mt-2 rounded">
          <div className="card-body">
            <h6>Tip Transactions</h6>
            <h4>{tip_count}</h4>
            <div className="text-sm">
              <span className="badge badge-pill bg-soft-success text-success mr-2">
              <i className="fa fa-arrow-up mr-1"></i>
                0%
              </span>
              <span>from last month</span>
            </div>
          </div>
        </div>
      </div>
      <div className="col-sm-12 col-md-6 col-xl-3 px-1">
        <div className="card mt-2 rounded">
          <div className="card-body">
            <h6>Load Transactions</h6>
            <h4>{load_count}</h4>
            <div className="text-sm">
              <span className="badge badge-pill bg-soft-danger text-danger mr-2">
              <i className="fa fa-arrow-down mr-1"></i>
                -50%
              </span>
              <span>from last month</span>
            </div>
          </div>
        </div>
      </div>
      <div className="col-sm-12 col-md-6 col-xl-3 px-1">
        <div className="card mt-2 rounded">
          <div className="card-body">
            <h6>Withdraw Transactions</h6>
            <h4>{withdraw_count}</h4>
            <div className="text-sm">
              <span className="badge badge-pill bg-soft-danger text-danger mr-2">
              <i className="fa fa-arrow-down mr-1"></i>
                -50%
              </span>
              <span>from last month</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MonetizationTransactionCard;

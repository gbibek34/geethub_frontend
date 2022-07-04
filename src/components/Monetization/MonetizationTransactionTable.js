import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchMonetizationTransaction,
  monetizationSelector,
} from "../../features/Admin/MonetizationSlice";
import { Link } from "react-router-dom";
import { Rings } from "react-loader-spinner";

function MonetizationTransactionTable() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchMonetizationTransaction(localStorage.getItem("token")));
  }, []);

  const { isFetching, isError, isSuccess, monetizationTransaction } =
    useSelector(monetizationSelector);

  return (
    <div>
      <table className="table table-striped ">
        <thead>
          <tr>
            <th>Date</th>
            <th>User</th>
            <th>Amount</th>
            <th>Type</th>
          </tr>
        </thead>
        <tbody>
          {isSuccess ? (
            monetizationTransaction.map((data) => {
              return (
                <tr key={data._id}>
                  <td>{data.date}</td>

                  <td>
                    <Link
                      to={`/artist/${data.sentBy._id}`}
                      className="text-dark"
                    >
                      {data.sentBy.name}
                    </Link>
                  </td>
                  <td>{data.amount}</td>
                  <td>{data.type}</td>
                </tr>
              );
            })
          ) : (
            <Rings />
          )}
        </tbody>
      </table>
    </div>
  );
}

export default MonetizationTransactionTable;

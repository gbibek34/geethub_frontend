import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  adminSelector,
  fetchUserNumbers,
} from "../../features/Admin/AdminSlice";
import { Rings } from "react-loader-spinner";

function AdminUserCard() {
  const dispatch = useDispatch();

  const {
    isError,
    isFetching,
    isSuccess,
    total_user,
    total_artist,
    verified_artist,
    unaunticated_user,
  } = useSelector(adminSelector);
  useEffect(() => {
    dispatch(fetchUserNumbers({ token: localStorage.getItem("token") }));
  }, []);
  return (
    <div>
      {isSuccess ? (
        <div class="row p-3 transaction-card-container">
          <div class="col-sm-12 col-md-6 col-xl-3 px-1">
            <div class="card mt-2 rounded gra-blue">
              <div class="card-body text-center">
                <h2>{total_user}</h2>
                <h6>Total Users</h6>
              </div>
            </div>
          </div>
          <div class="col-sm-12 col-md-6 col-xl-3 px-1">
            <div class="card mt-2 rounded gra-yellow">
              <div class="card-body text-center">
                <h2>{total_artist}</h2>
                <h6>Total Artist</h6>
              </div>
            </div>
          </div>
          <div class="col-sm-12 col-md-6 col-xl-3 px-1">
            <div class="card mt-2 rounded gra-green">
              <div class="card-body text-center">
                <h2>{verified_artist}</h2>
                <h6>Verified Artists</h6>
              </div>
            </div>
          </div>
          <div class="col-sm-12 col-md-6 col-xl-3 px-1">
            <div class="card mt-2 rounded gra-red">
              <div class="card-body text-center">
                <h2>{unaunticated_user}</h2>
                <h6>Unaunenticated Users</h6>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Rings />
      )}
    </div>
  );
}

export default AdminUserCard;

import { fetchMyProfile, userSelector } from "../features/User/UserSlice";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect } from "react";

const adminCheck = () => {
  const { isAdmin } = useSelector(userSelector);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchMyProfile(localStorage.getItem("token")));
  }, []);

  return isAdmin ? true : false;
};

export default adminCheck;

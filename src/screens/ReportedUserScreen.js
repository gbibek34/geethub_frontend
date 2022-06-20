import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Rings } from "react-loader-spinner";
import {
  pendingReportedUser,
  rejectedReportedUser,
  reportedUserSelector,
  resolvedReportedUser,
} from "../features/Admin/ReportedUserSlice";
import { clearState } from "../features/Music/MusicsSlice";
import "../styles/ReportedMusic.css";
import ReportedUserCard from "../components/Admin-Report/ReportedUserCard";
import { fetchReportedUser, usersSelector } from "../features/User/UsersSlice";

const ReportedUserScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    isFetchingUserReport,
    isSuccess,
    pendingUsers,
    rejectedUsers,
    resolvedUsers,
  } = useSelector(reportedUserSelector);

  const { isFetching, reportedusers } = useSelector(usersSelector);

  useEffect(() => {
    dispatch(pendingReportedUser({ token: localStorage.getItem("token") }));
    dispatch(resolvedReportedUser({ token: localStorage.getItem("token") }));
    dispatch(rejectedReportedUser({ token: localStorage.getItem("token") }));
  }, []);

  useEffect(() => {
    dispatch(fetchReportedUser({ token: localStorage.getItem("token") }));
  }, []);

  return (
    <div className="music-reports">
      <div className="pending-reports">
        <div className="report-status-header">Pending</div>
        <div className="all-music-reports">
          {!isFetchingUserReport && !isFetching ? (
            pendingUsers.map((report, index) => {
              return (
                <ReportedUserCard
                  key={report._id}
                  report={report}
                  reporteduser={reportedusers[index]}
                />
              );
            })
          ) : (
            <Rings />
          )}
        </div>
      </div>
      <div className="resolved-reports">
        <div className="report-status-header">Resolved</div>
        <div className="all-music-reports">
          {!isFetchingUserReport ? (
            resolvedUsers.map((report) => {
              return <ReportedUserCard key={report._id} report={report} />;
            })
          ) : (
            <Rings />
          )}
        </div>
      </div>
      <div className="rejected-reports">
        <div className="report-status-header">Rejected</div>
        <div className="all-music-reports">
          {!isFetchingUserReport ? (
            rejectedUsers.map((report) => {
              return <ReportedUserCard key={report._id} report={report} />;
            })
          ) : (
            <Rings />
          )}
        </div>
      </div>
    </div>
  );
};

export default ReportedUserScreen;

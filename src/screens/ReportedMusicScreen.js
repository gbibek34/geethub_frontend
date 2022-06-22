import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Rings } from "react-loader-spinner";
import {
  pendingReportedMusic,
  rejectedReportedMusic,
  reportedMusicSelector,
  resolvedReportedMusic,
} from "../features/Admin/ReportedMusicSlice";
import {
  clearState,
  fetchReportedMusic,
  musicsSelector,
} from "../features/Music/MusicsSlice";
import "../styles/ReportedMusic.css";
import ReportedMusicCard from "../components/Admin-Report/ReportedMusicCard";

const ReportedMusicScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isFetchingReport, resolvedMusic, pendingMusic, rejectedMusic } =
    useSelector(reportedMusicSelector);

  const { isFetching, reportedmusic } = useSelector(musicsSelector);

  useEffect(() => {
    dispatch(pendingReportedMusic({ token: localStorage.getItem("token") }));
    dispatch(resolvedReportedMusic({ token: localStorage.getItem("token") }));
    dispatch(rejectedReportedMusic({ token: localStorage.getItem("token") }));
  }, []);

  useEffect(() => {
    dispatch(fetchReportedMusic({ token: localStorage.getItem("token") }));
  }, []);

  return (
    <div className="music-reports">
      <div className="pending-reports">
        <div className="report-status-header">Pending</div>
        <div className="all-music-reports">
          {!isFetchingReport && !isFetching ? (
            pendingMusic.map((report, index) => {
              return (
                <ReportedMusicCard
                  key={report._id}
                  report={report}
                  reportedmusic={reportedmusic[index]}
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
          {!isFetchingReport ? (
            resolvedMusic.map((report) => {
              return <ReportedMusicCard key={report._id} report={report} />;
            })
          ) : (
            <Rings />
          )}
        </div>
      </div>
      <div className="rejected-reports">
        <div className="report-status-header">Rejected</div>
        <div className="all-music-reports">
          {!isFetchingReport ? (
            rejectedMusic.map((report, index) => {
              return <ReportedMusicCard key={report._id} report={report} />;
            })
          ) : (
            <Rings />
          )}
        </div>
      </div>
    </div>
  );
};

export default ReportedMusicScreen;

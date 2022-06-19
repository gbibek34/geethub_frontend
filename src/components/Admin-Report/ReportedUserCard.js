import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  rejectReportedUser,
  resolveReportedUser,
} from "../../features/Admin/ReportedUserSlice";

import {
  fetchMusicById,
  loadMusicById,
  musicSelector,
} from "../../features/Music/MusicSlice";
import { clearState } from "../../features/Music/MusicsSlice";
import { updateNowPlayingState } from "../../features/Music/NowPlayingSlice";
import "../../styles/ReportedMusicCard.css";

export default function ReportedUserCard({ report, reporteduser }) {
  const dispatch = useDispatch();
  const { isFetching, loadedmusic } = useSelector(musicSelector);
  const date = new Date(report.reportedOn).toLocaleDateString("en-us", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  function onRejectHandler() {
    dispatch(
      rejectReportedUser({
        token: localStorage.getItem("token"),
        reportid: report._id,
      })
    );
  }

  function onResolveHandler() {
    dispatch(
      resolveReportedUser({
        token: localStorage.getItem("token"),
        reportid: report._id,
      })
    );
  }

  return (
    <div className="music-report-card">
      <div
        className="report-status-color"
        style={{ backgroundColor: "gold" }}
      ></div>
      <div className="music-report-information">
        <div className="reported-music">
          <div>
            {!report.isResolved && !report.isRejected ? (
              <div>{reporteduser.name}</div>
            ) : report.isRejected ? (
              <div>No violation</div>
            ) : (
              <div>Action Taken</div>
            )}
          </div>
        </div>
        <hr />
        <div className="music-reported-by">{report.reportedByUser}</div>
        <div className="music-reported-on">{date}</div>
        <div className="description">{report.text}</div>
        <hr />
        {!report.isResolved && !report.isRejected ? (
          <div className="music-report-actions">
            <div className="report-reject-btn" onClick={onRejectHandler}>
              Reject
            </div>
            <div className="report-resolve-btn" onClick={onResolveHandler}>
              Resolve
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}

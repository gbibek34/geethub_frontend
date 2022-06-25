import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchUserVerificationRequest,
  acceptUserVerificationRequest,
  rejectUserVerificationRequest,
  userVerificationRequestSelector,
} from "../../features/admin/userVerificationSlice.js";
import {Link} from 'react-router-dom';
import { Rings } from "react-loader-spinner";

const UserVerification = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUserVerificationRequest(localStorage.getItem("token")));
  }, []);

  const { isFetching, isError, isSuccess, userVerificationRequest } =
    useSelector(userVerificationRequestSelector);

  const handleAccept = (id) => {
    const token = localStorage.getItem("token");
    dispatch(acceptUserVerificationRequest({id:id, token: token}));
  };

  const handleReject = (id) => {
    const token = localStorage.getItem("token");
    dispatch(rejectUserVerificationRequest({id:id, token: token}));
  };

  return (
    <div className="main-container">
      <div className="page-header">User Verification Request</div>
      <div className="table-responsive-xl">
        <table className="table table-striped ">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {isSuccess ? (
              userVerificationRequest.map((user) => {
                return (
                  <tr key={user._id}>
                    <td>
                      <Link to={`/artist/${user._id}` } className='text-dark'>
                      {user.name}
                      </Link>
                    </td>
                    <td>{user.email}</td>
                    <td>
                      <span
                        className="material-symbols-rounded text-success btn"
                        type="button"
                        data-toggle="tooltip"
                        data-placement="top"
                        title="Accept"
                        onClick={() => handleAccept(user._id)}
                      >
                        done
                      </span>
                      <span
                        className="material-symbols-rounded text-danger btn"
                        type="button"
                        data-toggle="tooltip"
                        data-placement="top"
                        title="Reject"
                        onClick={() => handleReject(user._id)}
                      >
                        close
                      </span>
                    </td>
                  </tr>
                );
              })
            ) : (
              <Rings />
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserVerification;

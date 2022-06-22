import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { adminSelector, fetchUsersDetails } from '../features/Admin/AdminSlice';
import { Rings } from 'react-loader-spinner';
import { userSelector } from '../features/User/UserSlice';

const AllUsersScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isError, users, isFetching } = useSelector(adminSelector);

  useEffect(() => {
    dispatch(fetchUsersDetails({ token: localStorage.getItem('token') }));
  }, []);

  return (
    <div className='main-container'>
      <div className='table-responsive'>
        <table className='table table-sm table-striped table-hover'>
          <thead>
            <tr>
              <th scope='col'>#</th>
              <th scope='col'>Name</th>
              <th scope='col'>Email</th>
              <th scope='col'>Uploads</th>
              <th scope='col'>Playlists</th>
              <th scope='col'>Status</th>
              <th scope='col'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {!isFetching ? (
              users.map((user, index) => {
                return (
                  <tr key={user._id}>
                    <th scope='row'>{index + 1}</th>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>5</td>
                    <td>2</td>
                    <td>
                      {user.is_authenticated ? (
                        <span className='badge badge-success'>
                          <span className='material-symbols-rounded mr-1'>
                            verified_user
                          </span>
                          Authenticated
                        </span>
                      ) : (
                        <span />
                      )}

                      {user.is_verified ? (
                        <span className='badge badge-info'>
                          <span className='material-symbols-rounded mr-1 f-20'>
                            verified
                          </span>
                          Verified
                        </span>
                      ) : (
                        <span />
                      )}
                    </td>
                    <td className='text-center'>
                      <button
                        type='button'
                        className='btn btn-sm material-symbols-rounded bg-danger'
                      >
                        delete_forever
                      </button>
                      <button
                        type='button'
                        className='btn btn-sm  material-symbols-rounded bg-warning'
                      >
                        warning
                      </button>
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
    // <div>
    //   {!isFetching ? (
    //     users.map((user) => {
    //       return <h2>{user.name}</h2>;
    //     })
    //   ) : (
    //     <Rings />
    //   )}
    // </div>
  );
};

export default AllUsersScreen;

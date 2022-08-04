import React, { useState } from "react";
import axios from "axios";
import useLogout from "../helpers/Logout";

const ChangePassword = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleCurrentPassword = (e) => setCurrentPassword(e.target.value);
  const handleNewPassword = (e) => setNewPassword(e.target.value);

  const { logout } = useLogout();

  const handleSubmit = (e) => {
    e.preventDefault();
    const changePassword = async () => {
      try {
        const url = `http://localhost:3000/change-password`;
        const response = await axios.post(
          url,
          {
            oldPassword: currentPassword,
            newPassword: newPassword,
          },
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        );
        if (response.data.success === true) {
          logout();
        }
        else{
          console.log(response.data.msg);
        }
      } catch (error) {
        console.log(error.response.data.msg);
      }
    };
    changePassword();
  };

  return (
    <div>
      <div className="container-fluid">
        <div className="col-lg-6 col-xl-6 mx-auto">
          <h1>Change Password</h1>
          <form method="POST" onSubmit={handleSubmit}>
            <div className="form-group mb-3">
              <input
                id="current-password"
                name="current-password"
                value={currentPassword}
                onChange={handleCurrentPassword}
                type="password"
                placeholder="Current Password"
                required
                autoFocus
                className="form-control rounded-pill border-0 shadow-sm px-4"
              />
            </div>
            <div className="form-group mb-3">
              <input
                id="new-password"
                name="new-password"
                value={newPassword}
                onChange={handleNewPassword}
                type="password"
                placeholder="New Password"
                required
                className="form-control rounded-pill border-0 shadow-sm px-4"
              />
            </div>
            <div className="form-group mb-3">
              <button
                type="submit"
                disabled={currentPassword && newPassword ? false : true}
                className="btn submit-btn text-uppercase mb-2 rounded-pill shadow-sm col-12"
              >
                Change
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;

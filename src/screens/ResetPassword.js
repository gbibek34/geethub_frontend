import React, { useEffect, useState, Fragment } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../styles/ForgotPassword.css";
import NotFound from "./NotFound";

const ResetPassword = () => {
  const [validUrl, setValidUrl] = useState(false);
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");
  const params = useParams();
  const url = `http://localhost:3000/reset-password/${params.userId}/${params.uniqueString}`;

  useEffect(() => {
    const verifyUrl = async () => {
      try {
        await axios.get(url);
        setValidUrl(true);
      } catch (error) {
        setValidUrl(false);
      }
    };
    verifyUrl();
  }, [params, url]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(url, { password });
      console.log(data);
      setMsg(data.msg);
      setError("");
      window.location = "/login";
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setError(error.response.data.msg);
        setMsg("");
      }
    }
  };

  return (
    <Fragment>
      {validUrl ? (
        <div className="password-container">
          <form className="form-container" onSubmit={handleSubmit}>
            <h1>Add New Password</h1>
            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              required
              className="input"
            />
            {error && <div className="error-msg">{error}</div>}
            {msg && <div className="success-msg">{msg}</div>}
            <button type="submit" className="submit-btn">
              Submit
            </button>
          </form>
        </div>
      ) : (
        <NotFound />
      )}
    </Fragment>
  );
};

export default ResetPassword;

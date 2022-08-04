import React, { useState } from "react";
import axios from "axios";
import "../styles/ForgotPassword.css";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = `http://localhost:3000/forgot-password`;
      const { data } = await axios.post(url, { email });
      console.log(data);
      setMsg(data.msg);
      setError("");
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
    <div className="password-container">
      <form className="form-container" onSubmit={handleSubmit}>
        <h1>Forgot Password</h1>
        <input
          type="email"
          placeholder="Email"
          name="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
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
  );
};

export default ForgotPassword;

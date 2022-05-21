import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import tick from '../images/tick.png';
import error from '../images/error.png';
import './EmailVerify.css';

const EmailVerify = () => {
  const [isSuccess, setSuccess] = useState(false);
  const [message, setMessage] = useState('');
  const params = useParams();

  useEffect(() => {
    const verifyEmailUrl = async () => {
      try {
        const url = `http://localhost:3000/verify/${params.userId}/${params.uniqueString}`;
        const { data } = await axios.get(url);
        setSuccess(data.success);
        setMessage(data.msg);
      } catch (error) {
        setSuccess(false);
        setMessage('Invalid URL Please Try Again');
      }
    };
    verifyEmailUrl();
  }, [params]);

  return (
    <div class='verify-card'>
      <div class='verify-status'>
        {isSuccess ? (
          <div>
            <img src={tick} className='verify-img' alt='success' />
          </div>
        ) : (
          <div>
            <img src={error} className='verify-img' alt='failed' />
          </div>
        )}
      </div>
      <div className='verify-action'>
        <h3>{message}</h3>
        <Link to='/login'>
          <button className='btn verify-login-btn'>Go to Login</button>
        </Link>
      </div>
    </div>
  );
};

export default EmailVerify;

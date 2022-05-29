import React, { Fragment, useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import toast from 'react-hot-toast';
import loginbg from '../images/login-bg.jpg';
import './LoginScreen.css';
import {
  loginUser,
  userSelector,
  clearState,
} from '../features/User/UserSlice';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state ? location.state.from : '/';
  const { isFetching, isSuccess, isError, errorMessage } =
    useSelector(userSelector);

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);

  const onSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(
      loginUser({
        email,
        password,
      })
    );
  };

  useEffect(() => {
    return () => {
      dispatch(clearState());
    };
  }, []);

  useEffect(() => {
    if (isError) {
      toast.error(errorMessage);
      dispatch(clearState());
    }
    if (isSuccess) {
      dispatch(clearState());
      navigate(from, { replace: true });
    }
  }, [isError, isSuccess]);

  return (
    <div>
      <div
        className='position-relative overflow-hidden py-0 px-5 px-md-5 m-0 text-center'
        style={{ backgroundColor: '#F0F7FA' }}
      >
        <div className='my-4 row p-0 justify-content-center'>
          <div className='col-lg-2'></div>

          <div
            className='container row col-lg-8 p-0 shadow mt-5'
            style={{ backgroundColor: 'white' }}
          >
            <div className='col-lg-6 p-0 m-0 align-content-center'>
              <div className=' text-center w-100 py-5 h-100 rounded-0 justify-content-center'>
                <form
                  className='loginInputCard form-signin mt-5'
                  method='POST'
                  onSubmit={onSubmitHandler}
                >
                  <h1 className='loginHeader h1 font-weight-bold'>Login</h1>

                  <div className='form-group mb-4'>
                    <input
                      type='email'
                      className='loginTextInput form-control-lg border'
                      placeholder='email or username'
                      value={email}
                      onChange={handleEmail}
                    />
                  </div>

                  <div className='form-group mb-5'>
                    <input
                      type='password'
                      className='loginTextInput form-control-lg border'
                      placeholder='password'
                      value={password}
                      onChange={handlePassword}
                    />
                  </div>

                  <button
                    className='loginContinue btn btn-lg btn-info btn-block border-0 btn-purple'
                    type='submit'
                  >
                    Continue
                  </button>
                </form>
                <div className='loginButtonGroup form-group mb-4'>
                  <Link
                    to='/signup'
                    type='button'
                    className='gotoSignup btn btn-link'
                  >
                    New here? Create an account
                  </Link>
                </div>
              </div>
            </div>

            <div className='col-lg-6 p-0 m-0 loginPic'>
              <div className='text-center p-0 m-auto rounded-0'>
                <img
                  className='w-100 h-100'
                  src={loginbg}
                  alt='a happy picture'
                />
              </div>
            </div>
          </div>
          <div className='col-lg-2'></div>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;

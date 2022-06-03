import React, { Fragment, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import {
  signupUser,
  userSelector,
  clearState,
} from '../features/User/UserSlice';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import '../styles/Signup.css';
import signupPicture from '../images/signup.png';

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [enteredName, setName] = useState('');
  const [fieldError, setFieldError] = useState('');
  const [enteredPassword, setPassword] = useState('');
  const [enteredEmail, setEmail] = useState('');
  const [enteredRePassword, setRePassword] = useState('');
  const { isFetching, isSuccess, isError, errorMessage } =
    useSelector(userSelector);

  const onNameChangeHandler = (e) => {
    setName(e.target.value);
  };
  const onPasswordChangeHandler = (e) => {
    setPassword(e.target.value);
    if (e.target.value !== enteredRePassword) {
      setFieldError('Passwords do not match');
    } else {
      setFieldError('');
    }
  };
  const onEmailChangeHandler = (e) => {
    setEmail(e.target.value);
  };
  const onRePasswordChangeHandler = (e) => {
    setRePassword(e.target.value);
    if (e.target.value !== enteredPassword) {
      setFieldError('Passwords do not match');
    } else {
      setFieldError('');
    }
  };
  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (enteredPassword !== enteredRePassword) {
      setFieldError('Passwords do not match');
    } else {
      setFieldError('');
      dispatch(
        signupUser({
          name: enteredName,
          email: enteredEmail,
          password: enteredPassword,
        })
      );
      if (isSuccess) {
        dispatch(clearState);
        navigate('/login');
      }
      if (isError) {
        toast.error(errorMessage);
      }
    }
  };

  useEffect(() => {
    return () => {
      dispatch(clearState());
    };
  }, []);

  useEffect(() => {
    if (isSuccess) {
      dispatch(clearState());
      navigate('/login');
    }
    if (isError) {
      toast.error(errorMessage);
      dispatch(clearState());
    }
  });

  return (
    <div className='position-relative overflow-hidden py-0 px-5 px-md-5 m-0 text-center mainBodyRegis'>
      <div className='my-4 row p-0 justify-content-center'>
        <div className='col-lg-2'></div>

        <div className='container row col-lg-8 col-sm-11 p-0 shadow bg-white'>
          <div className='col-lg-6 p-0 m-0 loginPic'>
            <div className='text-center p-0 m-auto rounded-0'>
              <img
                className='w-100 h-100'
                src={signupPicture}
                alt='a happy picture'
              />
            </div>
          </div>

          <div className='col-lg-6 p-0 m-0 align-content-center'>
            <div className=' text-center w-100 py-5 h-100 rounded-0 justify-content-center'>
              <form
                action='post'
                onSubmit={onSubmitHandler}
                className='form-signin mt-5'
              >
                <h1 className='signupHeader h1 font-weight-bold'>Signup</h1>

                <div className='mb-3 px-4'>
                  <div className='form-group mb-3'>
                    <input
                      type='text'
                      id='inputName'
                      value={enteredName}
                      onChange={onNameChangeHandler}
                      className=' form-control border'
                      placeholder='name'
                      required
                    />
                  </div>

                  <div className='form-group mb-3'>
                    <input
                      type='email'
                      id='inputEmail'
                      value={enteredEmail}
                      onChange={onEmailChangeHandler}
                      className=' form-control border'
                      placeholder='email'
                      required
                    />
                  </div>

                  <div className='form-group mb-5 mx-1 row p-0'>
                    <input
                      type='password'
                      id='inputPassword'
                      value={enteredPassword}
                      onChange={onPasswordChangeHandler}
                      className='form-control border col-lg-6 halfEntry'
                      placeholder='password'
                      required
                    />
                    <input
                      type='password'
                      id='inputPassword'
                      value={enteredRePassword}
                      onChange={onRePasswordChangeHandler}
                      className=' form-control border col-lg-6'
                      placeholder='re-password'
                      required
                    />
                  </div>
                  <div>{fieldError}</div>

                  <div className='loginButtonGroup form-group mb-4'>
                    <button
                      className='loginContinue btn btn-lg  btn-info btn-cyan btn-block border-0'
                      type='submit'
                    >
                      Continue
                    </button>
                    <Link to='/login' className='gotoSignup btn btn-link'>
                      Already have an account?
                    </Link>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className='col-lg-2'></div>
      </div>
    </div>
  );
};

export default Signup;

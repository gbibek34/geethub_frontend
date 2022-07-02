import React from 'react';
import { useDispatch } from 'react-redux';
import '../styles/mainCSS.css';
import { loadCoins } from '../features/User/UserSlice';
import { useState } from 'react';

const LoadMoney = () => {
  const amountTable = [
    { id: 1, coins: 500, price: 100 },
    { id: 2, coins: 1000, price: 195 },
    { id: 3, coins: 5000, price: 800 },
  ];
  const dispatch = useDispatch();
  const onCardClickHandler = (amount) => {
    dispatch(loadCoins({ token: localStorage.getItem('token'), amount }));
  };

  return (
    <div className='main-container'>
      <div>Load Coins</div>
      <div className='amount-container'>
        {amountTable.map((values) => (
          <div key={values.id}>
            <div
              className='coin-box'
              type='button'
              data-toggle='modal'
              data-target={`#exampleModalCenter${values.id}`}
            >
              {values.coins} coins <br /> Rs. {values.price}
            </div>
            <div
              className='modal fade'
              id={`exampleModalCenter${values.id}`}
              tabIndex='-1'
              role='dialog'
              aria-labelledby='exampleModalCenterTitle'
              aria-hidden='true'
            >
              <div
                className='modal-dialog modal-dialog-centered modal-dialog-scrollable'
                role='document'
              >
                <div className='modal-content'>
                  <div className='modal-header'>
                    Are you sure you want to load {values.coins} coins?
                    <button
                      type='button'
                      className='close'
                      data-dismiss='modal'
                      aria-label='Close'
                    >
                      <span aria-hidden='true'>&times;</span>
                    </button>
                  </div>
                  <div className='modal-body overflow-auto maxH_200 d-flex justify-content-end'>
                    <button
                      type='button'
                      className='btn btn-secondary'
                      data-dismiss='modal'
                    >
                      Close
                    </button>
                    <button
                      onClick={() => onCardClickHandler(values.coins)}
                      className='btn btn-primary ml-2'
                      type='button'
                      data-dismiss='modal'
                    >
                      Load
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LoadMoney;

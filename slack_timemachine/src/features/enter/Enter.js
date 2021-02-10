import React, { useState, useCallback } from 'react';
import { chooseWelcomeMessages } from '../../config';
import { useSelector, useDispatch } from 'react-redux';
import { fetchEnter, selectIsEntered } from './enterSlice';

function LockIcon({ onClick }) {
  return (
    <div className="w-10 h-10 cursor-pointer" onClick={onClick}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
        />
      </svg>
    </div>
  );
}

const welcomeMessage = chooseWelcomeMessages()

export function Enter() {
  const dispatch = useDispatch();
  const isEntered = useSelector(selectIsEntered);
  const [pass, setPass] = useState('');
  const handleChange = useCallback((event) => {
    setPass(event.target.value);
  }, []);
  const handleClick = useCallback(() => {
    dispatch(fetchEnter(pass));
  }, [pass, dispatch]);
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleClick();
    }
  };

  return (
    <div className="flex items-center justify-center h-screen flex-col bg-gray-700">
      <h2 className="flex m-4">
        <img className="w-16 m-2" src="logo.jpg" alt="" />
        <div className="flex items-center text-3xl text-gray-300">
          {welcomeMessage}
        </div>
      </h2>
      <div className="flex items-center">
        <input
          className="p-4 mx-2 rounded-lg"
          type="password"
          placeholder="Password"
          value={pass}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        />
        <LockIcon onClick={handleClick} />
      </div>
      {isEntered === false && (
        <div className="text-3xl text-red-700 m-4 font-bold">大P拉幹</div>
      )}
    </div>
  );
}

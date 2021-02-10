import React, { useState, useEffect, useCallback } from 'react';
import { chooseWelcomeMessages, countingMessage } from '../../config';
import { useSelector, useDispatch } from 'react-redux';
import { fetchEnter, selectIsEntered, fetchVisitCount } from './enterSlice';

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

const welcomeMessage = chooseWelcomeMessages();

export function Enter() {
  const dispatch = useDispatch();
  const isEntered = useSelector(selectIsEntered);
  const visitCount = useSelector((state) => state.enter.visitCount);
  const [pass, setPass] = useState('');
  useEffect(() => {
    dispatch(fetchVisitCount());
  }, [dispatch]);
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
      <header>
        <h2 className="flex m-4">
          <img className="w-16 m-2" src="logo.jpg" alt="" />
          <div className="flex items-center text-3xl text-gray-300">
            {welcomeMessage}
          </div>
        </h2>
      </header>
      <main>
        <div className="flex items-center bg-white rounded-lg">
          <input
            className="mx-2 px-2 h-12 focus:outline-none"
            type="password"
            placeholder="Password"
            value={pass}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
          />
          <LockIcon className="m-2" onClick={handleClick} />
        </div>
        {isEntered === false && (
          <div className="text-3xl text-red-700 m-4 font-bold">大P拉幹</div>
        )}
      </main>
      <footer>
        {visitCount !== null && (
          <div className="text-white text-xl m-2">
            {visitCount} {countingMessage}
          </div>
        )}
      </footer>
    </div>
  );
}

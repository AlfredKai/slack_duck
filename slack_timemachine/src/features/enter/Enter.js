import React, { useState, useCallback } from 'react';
import { chooseWelcomeMessages } from '../../config';
import { useSelector, useDispatch } from 'react-redux';
import { fetchEnter, selectIsEntered } from './enterSlice';

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
    <div className="ui middle aligned center aligned grid">
      <div className="enterColumn">
        <h2 className="ui image header">
          <img className="image" src="logo.jpg" alt="" />
          <div className="content">{chooseWelcomeMessages()}</div>
        </h2>
        <div className="ui large form error">
          <div className="ui stacked segment">
            <div className={'field' + (isEntered === false ? ' error' : '')}>
              <div className="ui right icon input">
                <input
                  type="password"
                  placeholder="Password"
                  value={pass}
                  onChange={handleChange}
                  onKeyDown={handleKeyDown}
                />
                <i
                  className="inverted circular unlock alternate link icon"
                  onClick={handleClick}
                ></i>
              </div>
            </div>
          </div>
          <div className="ui error message">
            {isEntered === false && <div>大P拉幹</div>}
          </div>
        </div>
      </div>
    </div>
  );
}

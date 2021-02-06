import React, { useEffect, createRef, forwardRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchMessages, selectMessages } from './conversationSlice';
import { fetchUsers, selectUsers } from './userSlice';
import { Message } from './Message';

const Loader = forwardRef((_, ref) => (
  <div ref={ref} className="ui active centered inline loader"></div>
));

export function Conversation() {
  const messages = useSelector(selectMessages);
  const isEnd = useSelector((state) => state.conversation.isEnd);
  const users = useSelector(selectUsers);
  const usersStatus = useSelector((state) => state.user.status);
  const loaderRef = createRef();
  const dispatch = useDispatch();
  const getUser = (user_id) => users.filter((x) => x.user_id === user_id)[0];

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  useEffect(() => {
    let callback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && usersStatus === 'fetched') {
          dispatch(fetchMessages(messages.length));
        }
      });
    };

    let cacheRef;
    let observer;
    if (loaderRef.current) {
      observer = new IntersectionObserver(callback, {});
      observer.observe(loaderRef.current);
      cacheRef = loaderRef.current;
    }
    return () => {
      if (cacheRef) {
        observer.unobserve(cacheRef);
      }
    };
  }, [loaderRef, dispatch, messages.length, usersStatus]);

  let messageBlocks = messages.map((x) => (
    <Message
      key={x.ts}
      text={x.text}
      img={(x.img_64 || (x.user_id && getUser(x.user_id).img_48))}
      user={(x.username || (x.user_id && getUser(x.user_id).name))}
    />
  ));
  return (
    <div>
      <div>{messageBlocks}</div>
      {!isEnd && <Loader ref={loaderRef} />}
    </div>
  );
}

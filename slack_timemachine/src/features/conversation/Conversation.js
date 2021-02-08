import React, { useEffect, createRef, forwardRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchMessages,
  selectMessages,
  fetchReplies,
  selectReplies,
} from './conversationSlice';
import { fetchUsers, selectUsers } from './userSlice';
import { Message } from './Message';

const Loader = forwardRef((_, ref) => (
  <div ref={ref} className="ui active centered inline loader"></div>
));

export function Conversation() {
  const messages = useSelector(selectMessages);
  const replies = useSelector(selectReplies);
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

  function handleClick(o) {
    console.log('The link was clicked.', o);
    dispatch(fetchReplies(o));
  }

  let messageSection = (messages) =>
    messages.map((x) => (
      // console.log((x.reply_users && x.reply_users.map((x) => getUser(x).img_48) || [])) ????
      <Message
        key={x.ts}
        thread_ts={x.thread_ts}
        text={x.text}
        img={x.img_64 || (x.user_id && getUser(x.user_id).img_48)}
        user={x.username || (x.user_id && getUser(x.user_id).name)}
        replyUserImgs={
          (x.reply_users && x.reply_users.map((x) => getUser(x).img_48)) || []
        }
        replyCount={x.reply_count}
        onReplyClick={handleClick}
      />
    ));
  return (
    <div className="ui three column grid">
      <div className="column"></div>
      <div className="column">
        <div className="ui segment">
          <div className="ui comments">{messageSection(messages)}</div>
          {!isEnd && <Loader ref={loaderRef} />}
        </div>
      </div>
      <div className="column">
        <div class="ui right fixed massive vertical menu">
          <div className="ui top fixed">
            {replies && messageSection(replies)}
          </div>
        </div>
      </div>
    </div>
  );
}

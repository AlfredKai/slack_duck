import React, { useEffect, createRef, forwardRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchChannelInfo,
  fetchMessages,
  selectMessages,
  fetchReplies,
  selectReplies,
} from './conversationSlice';
import { fetchUsers, selectUsers } from './userSlice';
import { Message, MessageLoader } from './Message';
import { fetchVisit } from '../enter/enterSlice';

const Loader = forwardRef((_, ref) => (
  <div ref={ref}>
    <MessageLoader />
  </div>
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
    dispatch(fetchChannelInfo());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchVisit());
  }, [dispatch]);

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

  function handleReplyClick(thread_ts) {
    dispatch(fetchReplies(thread_ts));
  }

  let messageSection = (messages, thread = false) =>
    messages.map((x, index) => (
      <div key={x.ts}>
        {index === 1 && thread && (
          <div className="flex mx-4 text-gray-500">
            <div>replies</div>
            <div className="border-t border-gray-500 border-solid mt-3 w-full mx-2"></div>
          </div>
        )}
        <Message
          thread_ts={x.thread_ts}
          text={x.text}
          img={x.img_64 || (x.user_id && getUser(x.user_id).img_48)}
          user={x.username || (x.user_id && getUser(x.user_id).name)}
          replyUserImgs={
            (x.reply_users && x.reply_users.map((x) => getUser(x).img_48)) || []
          }
          replyCount={x.reply_count}
          onReplyClick={handleReplyClick}
        />
      </div>
    ));
  return (
    <div className="flex">
      <div
        className={
          'h-screen overflow-y-auto' + (replies.length !== 0 ? ' w-3/4' : '')
        }
      >
        {messageSection(messages)}
        {!isEnd && <Loader ref={loaderRef} />}
      </div>
      {replies.length !== 0 && (
        <div className="w-1/4 h-screen overflow-y-auto">
          {messageSection(replies, true)}
        </div>
      )}
    </div>
  );
}

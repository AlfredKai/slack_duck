export function Message({
  thread_ts,
  user,
  img,
  text,
  replyUserImgs,
  replyCount,
  onReplyClick,
}) {
  const replyUserAvatars = replyUserImgs.map((x) => (
    <div className="label" href="/" key={x}>
      <img src={x} alt="" />
    </div>
  ));
  return (
    <div className="comment">
      <a className="avatar" href="/">
        <img src={img} alt="" />
      </a>
      <div className="content">
        <a className="author" href="/">
          {user}
        </a>
        <div className="text">{text}</div>
      </div>
      <div className="comments">
        <div className="ui feed">
          <div className="event">
            {replyUserAvatars}
            {replyCount && (
              <div className="content">
                <div className="summary">
                  <a
                    href="/"
                    onClick={(e) => {
                      e.preventDefault();
                      onReplyClick(thread_ts);
                    }}
                  >
                    {replyCount} replies
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

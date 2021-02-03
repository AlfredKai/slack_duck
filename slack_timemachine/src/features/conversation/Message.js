export function Message({ user, img, text }) {
  return (
    <div className="ui comments">
      <div className="comment">
        <a className="avatar" href="/">
          <img src={img} alt=''/>
        </a>
        <div className="content">
          <a className="author" href="/">{user}</a>
          <div className="text">{text}</div>
        </div>
      </div>
    </div>
  );
}

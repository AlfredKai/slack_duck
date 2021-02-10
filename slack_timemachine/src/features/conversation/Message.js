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
    <img className="w-8 h-8 m-2" src={x} alt="" key={x} />
  ));
  return (
    <div className="flex flex-col">
      <div className="m-4 flex">
        <img className="w-12 h-12 m-2" src={img} alt="" />
        <div className="flex flex-col">
          <div className="m-2 font-bold">{user}</div>
          <div className="mx-2 break-all">{text}</div>
        </div>
      </div>
      <div
        className="flex items-center ml-12 cursor-pointer"
        onClick={() => {
          onReplyClick(thread_ts);
        }}
      >
        {replyUserAvatars}
        {replyCount && (
          <div className="text-blue-500 mx-2">{replyCount} replies</div>
        )}
      </div>
    </div>
  );
}

export function MessageLoader() {
  return (
    <div className="flex flex-col animate-pulse">
      <div className="m-4 flex">
        <div className="w-12 h-12 m-2 bg-gray-300"></div>
        <div className="flex flex-col flex-grow">
          <div className="m-2 h-4 w-full bg-gray-300 rounded"></div>
          <div className="mx-2 my-1 h-2 w-full bg-gray-300 rounded"></div>
          <div className="mx-2 my-1 h-2 w-full bg-gray-300 rounded"></div>
          <div className="mx-2 my-1 h-2 w-full bg-gray-300 rounded"></div>
        </div>
      </div>
    </div>
  );
}

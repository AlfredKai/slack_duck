import { Conversation } from '../features/conversation/Conversation';
import { useSelector } from 'react-redux';

export function Home() {
  const channelInfo = useSelector((state) => state.conversation.channel);
  return (
    <div className="grid grid-cols-6 grid-rows-12 h-screen divide-gray-300 divide-y">
      <header className="col-span-full row-span-1">
        {
          <div className="flex flex-col m-4">
            <div className="text-md">{'#' + channelInfo.name}</div>
            <div className="text-md text-gray-500">{channelInfo.topic}</div>
          </div>
        }
      </header>
      <main className="col-span-full row-span-11">
        <Conversation />
      </main>
    </div>
  );
}

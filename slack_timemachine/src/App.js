import React from 'react';
import { Conversation } from './features/conversation/Conversation';
import { Enter } from './features/enter/Enter';
import { selectIsEntered } from './features/enter/enterSlice';
import { useSelector } from 'react-redux';

function App() {
  const channelInfo = useSelector((state) => state.conversation.channel);

  const isEntered = useSelector(selectIsEntered);
  return (
    <>
      <header>
        {isEntered && (
          <div className="flex flex-col m-4">
            <div className="text-md">{'#' + channelInfo.name}</div>
            <div className="text-md text-gray-500">{channelInfo.topic}</div>
          </div>
        )}
      </header>
      <main>
        {!isEntered && <Enter />}
        {isEntered && <Conversation />}
      </main>
    </>
  );
}

export default App;

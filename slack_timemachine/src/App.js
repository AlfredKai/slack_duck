import React from 'react';
import { Conversation } from './features/conversation/Conversation';

function App() {
  return (
    <div>
      <header></header>
      <main>
        <div className="ui very padded text container segment">
          <Conversation />
        </div>
      </main>
    </div>
  );
}

export default App;

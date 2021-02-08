import React from 'react';
import { Conversation } from './features/conversation/Conversation';
import { Enter } from './features/enter/Enter';
import { selectIsEntered } from './features/enter/enterSlice';
import { useSelector } from 'react-redux';

function App() {
  const isEntered = useSelector(selectIsEntered);
  return (
    <>
      <header></header>
      <main>
        {!isEntered && <Enter />}
        {isEntered && <Conversation />}
      </main>
    </>
  );
}

export default App;

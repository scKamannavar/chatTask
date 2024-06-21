import React, { useEffect, useRef } from 'react';
import MyMessage from './MyMessage';
import BotMessage from './BotMessage';

const Conversation = ({ conversation, typing }) => {
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [conversation]);

  return (
    <div className='p-2 h-[80%] overflow-y-scroll hide-scrollbar'>
      <div className='flex flex-1 flex-col'>
        {
          conversation.map((m, index) => (
            m.name === 'user'
              ? <MyMessage key={index} message={m.message} />
              : typing? <BotMessage key={index} message='Typing...' /> : <BotMessage key={index} message={m.message} /> 
          ))
        }
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
}

export default Conversation;

import React, { useState } from 'react';
import Header from './Header';
import { sendMessageApi } from '../Service';
import InputContainer from './InputContainer';
import Conversation from './Conversation';

const ChatScreen = () => {
    const [conversation, setConversation] = useState([]);
    const [typing, setTyping] = useState('true')

    

    const sendMessage = async (mes) => {
        try {
            const { data } = await sendMessageApi(mes);

            if (data.status === 200) {
              // const   botMes = data.payLoad;
              // console.log(botMes)
                const newConversation = [...conversation,{ message: mes, name: 'user' }, data.payLoad];
                setTyping(false)
                setConversation(newConversation);
                // console.log('saving Bot message', conversation);
            }
        } catch (error) {
            console.log('ERR', error);
        }
    }

    const handleSend = async (mes) => {
        const newConversation = [...conversation, { message: mes, name: 'user' }];
        setConversation(newConversation);
        // console.log('saving User message', conversation);
        setTimeout(() => {
          sendMessage(mes); 
        }, 1000);
    };

    return (
        <div className="flex flex-col h-[90vh] w-[320px] rounded-2xl bg-slate-800 overflow-hidden">
            <Header />
            <Conversation conversation={conversation} typing={typing} />
            <InputContainer handleSend={handleSend} />
        </div>
    );
}

export default ChatScreen;

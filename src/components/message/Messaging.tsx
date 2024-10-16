import React from 'react';
import { ListMsg } from './ListMsg';
import { MessageThread } from './MessageThread';
import { MessagingProps } from 'types';

// Define the Messaging component with typed props
export const Messaging: React.FC<MessagingProps> = ({
  chats,
  chatWith,
  messagesToShow,
  setMessagesToShow,
  chosenChatId,
  setChosenChatId,
  setChatWith,
  getTheNotLoggedUserChat,
  setTheNotLoggedUserChat,
  theNotLoggedUserChat,
  onSendMsg,
}) => {
  return (
    <section className="messaging">
      <div className="container">
        <ListMsg
          chats={chats}
          setMessagesToShow={setMessagesToShow}
          setChatWith={setChatWith}
          chatWith={chatWith}
          chosenChatId={chosenChatId}
          getTheNotLoggedUserChat={getTheNotLoggedUserChat}
          setTheNotLoggedUserChat={setTheNotLoggedUserChat}
          theNotLoggedUserChat={theNotLoggedUserChat}
        />
        {messagesToShow && (
          <MessageThread
            messagesToShow={messagesToShow}
            chatWith={chatWith}
            onSendMsg={onSendMsg}
            setMessagesToShow={setMessagesToShow}
          />
        )}
      </div>
    </section>
  );
};

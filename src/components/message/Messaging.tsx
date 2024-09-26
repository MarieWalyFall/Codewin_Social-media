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
  chooseenChatId,
  setChooseenChatId,
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
          setChooseenChatId={setChooseenChatId}
          chooseenChatId={chooseenChatId}
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

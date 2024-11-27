import React from 'react';
import { Conversations } from './Conversations';
import { MessageThread } from './MessageThread';
import { MessagingProps } from 'types';
import { StyledMessaging } from '../style/StyledMessage';

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
    <StyledMessaging className="messaging">
      <Conversations
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
    </StyledMessaging>
  );
};

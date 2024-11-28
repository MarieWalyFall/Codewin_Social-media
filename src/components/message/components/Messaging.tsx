import React from 'react';
import { Conversations } from './Conversations';
import { MessageThread } from './MessageThread';
import { MessagingProps } from 'types';
import { StyledMessaging } from '../style/StyledMessage';

// Define the Messaging component with typed props
export const Messaging: React.FC<MessagingProps> = ({
  onSendMessage,
  chats,
  chatWith,
  messagesToShow,
  setchats,
  // setChatWith,
  // getTheNotLoggedUserChat,
  // setTheNotLoggedUserChat,
  // theNotLoggedUserChat,
}) => {
  return (
    <StyledMessaging className="messaging">
      {messagesToShow && (
        <MessageThread
          messagesToShow={messagesToShow}
          chatWith={chatWith}
          onSendMessage={onSendMessage}
          setchats={setchats}
        />
      )}
    </StyledMessaging>
  );
};

import { ThreadMessageList } from './ThreadMessageList';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { SendMessageForm } from './SendMessageForm';
import { Message, MessageThreadProps } from 'types';
import { StyledMessageThread } from '../style/StyledMessage';

export const MessageThread: React.FC<MessageThreadProps> = ({
  messagesToShow,
  setchats,
  chatWith,
  onSendMessage,
}) => {
  const navigate = useNavigate();

  useEffect(() => {
    scrollToBottom();
  }, [messagesToShow]);

  const scrollToBottom = () => {
    const msgsContainer = document.querySelector(
      '.user-profile-details'
    ) as HTMLElement;
    if (msgsContainer) {
      msgsContainer.scrollTop = msgsContainer.scrollHeight;
    }
  };

  if (!chatWith) return null;
  console.log(messagesToShow);
  return (
    <StyledMessageThread className="message-thread">
      <header className="header-message-thread">
        <div>
          <div
            className="img-profile"
            onClick={() => navigate(`/profile/${chatWith.id}`)}
          >
            <img src={chatWith.imgUrl} alt={chatWith.name} className="img" />
          </div>
          <div className="name">{chatWith.name}</div>
        </div>
        <div className="container-logo">
          <span className="logo-menu">icon</span>
        </div>
      </header>

      <div className="user-profile-details scroll-area">
        <ThreadMessageList messagesToShow={messagesToShow || []} />
      </div>

      <SendMessageForm
        onSendMessage={onSendMessage}
        messagesToShow={messagesToShow || []}
      />
    </StyledMessageThread>
  );
};

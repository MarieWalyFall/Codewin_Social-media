import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ThreadMsgList } from './ThreadMsgList';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { SendMessageForm } from './SendMessageForm';
import { Message, MessageThreadProps,  } from 'types';


export const MessageThread: React.FC<MessageThreadProps> = ({
  messagesToShow,
  setMessagesToShow,
  chatWith,
  onSendMsg,
}) => {
  const navigate = useNavigate();

  useEffect(() => {
    scrollToBottom();
  }, [messagesToShow]);

  const scrollToBottom = () => {
    const msgsContainer = document.querySelector('.user-profile-details') as HTMLElement;
    if (msgsContainer) {
      msgsContainer.scrollTop = msgsContainer.scrollHeight;
    }
  };

  if (!chatWith) return null;

  return (
    <section className="message-thread">
      <header className="header-message-thread">
        <div>
          <div
            className="img-profile"
            onClick={() => navigate(`/main/profile/${chatWith.id}`)}
          >
            <img src={chatWith.imgUrl} alt={chatWith.name} className="img" />
          </div>
          <div className="fullname">{chatWith.name}</div>
        </div>
        <div className="container-logo">
          <span className="logo-menu">
            icon
          </span>
        </div>
      </header>

      <div className="user-profile-details scroll-area">
        <ThreadMsgList messagesToShow={messagesToShow || []} />
      </div>

      <SendMessageForm onSendMsg={onSendMsg} messagesToShow={messagesToShow || []} />
    </section>
  );
};

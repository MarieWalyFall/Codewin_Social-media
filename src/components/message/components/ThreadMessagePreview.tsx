import { useState, useEffect } from 'react';
import { userService } from '../../../services/user/userService';
import TimeAgo from 'react-timeago';
import { useNavigate } from 'react-router-dom';
import { LoadingIndicator } from 'components/LoadingIndicator';
import { Message, User } from 'types';

interface ThreadMessagePreviewProps {
  msg: Message;
}

export const ThreadMessagePreview: React.FC<ThreadMessagePreviewProps> = ({
  msg,
}) => {
  const [userMessage, setUserMessage] = useState<User | null>(null);
  const navigate = useNavigate();

  const loadUserMessage = async (id: string) => {
    if (!msg) return;
    const user = await userService.getById(id);
    setUserMessage(user);
  };

  useEffect(() => {
    loadUserMessage(msg.userId ? msg.userId : '');
  }, [msg.userId]);

  return (
    <section className="thread-msg-preview">
      <div className="container-msg">
        <div
          className="img-container"
          onClick={() => userMessage && navigate(`/profile/${userMessage.id}`)}
        >
          {userMessage?.imgUrl ? (
            <img src={userMessage.imgUrl} alt="" className="img" />
          ) : (
            <LoadingIndicator />
          )}
        </div>

        <div className="name-time-container">
          <div className="name">
            <h3>{userMessage?.name}</h3>
          </div>
          <div className="time">
            <span>
              <TimeAgo date={msg.createdAt} />
            </span>
          </div>
        </div>
      </div>
      <div className="the-msg">
        <p>{msg.body ? msg.body : ''}</p>
      </div>
    </section>
  );
};

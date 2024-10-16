import { useState, useEffect } from 'react';
import { userService } from '../../../services/user/userService';
import TimeAgo from 'react-timeago';
import { useNavigate } from 'react-router-dom';
import { LoadingIndicator } from 'components/LoadingIndicator';
import { Message, User } from 'types';

interface ThreadMsgPreviewProps {
  msg: Message;
}

export const ThreadMsgPreview: React.FC<ThreadMsgPreviewProps> = ({ msg }) => {
  const [userMsg, setUserMsg] = useState<User | null>(null);
  const navigate = useNavigate();

  const loadUserMsg = async (id: string) => {
    if (!msg) return;
    const user = await userService.getById(id);
    setUserMsg(user);
  };

  useEffect(() => {
    loadUserMsg(msg.userId ? msg.userId : '');
  }, [msg.userId]);

  return (
    <section className="thread-msg-preview">
      <div className="container-msg">
        <div
          className="img-container"
          onClick={() => userMsg && navigate(`/profile/${userMsg.id}`)}
        >
          {userMsg?.imgUrl ? (
            <img src={userMsg.imgUrl} alt="" className="img" />
          ) : (
            <LoadingIndicator />
          )}
        </div>

        <div className="name-time-container">
          <div className="fullname">
            <h3>{userMsg?.name}</h3>
          </div>
          <div className="time">
            <span>
              <TimeAgo date={msg.createdAt} />
            </span>
          </div>
        </div>
      </div>
      <div className="the-msg">
        <p>{msg.content ? msg.content : ''}</p>
      </div>
    </section>
  );
};

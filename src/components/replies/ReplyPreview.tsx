import { useSelector } from 'react-redux';
import { useEffect, useState, FC } from 'react';
import { userService } from '../../services/user/userService';
import TimeAgo from 'react-timeago';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ReplyPreviewProps, User } from 'types';

// Define interfaces for props and state

export const ReplyPreview: FC<ReplyPreviewProps> = ({ reply, updateReply }) => {
  const { userId } = reply;
  const loggedInUser = useSelector(
    (state: any) => state.userModule.loggedInUser
  ) as User;
  const [userReply, setUserReply] = useState<User | null>(null);

  const onLikeReply = () => {
    const replyToUpdate = { ...reply };
    const isAlreadyLike = replyToUpdate.reactions.some(
      (reaction) => reaction.userId === loggedInUser.id
    );
    if (isAlreadyLike) {
      replyToUpdate.reactions = replyToUpdate.reactions.filter(
        (reaction) => reaction.userId !== loggedInUser.id
      );
    } else {
      replyToUpdate.reactions.push({
        userId: loggedInUser.id,
        name: loggedInUser.name,
        reaction: 'like',
      });
    }
    updateReply(replyToUpdate);
  };

  const loadUser = async () => {
    const userReply = await userService.getById(userId);
    setUserReply(userReply);
  };

  useEffect(() => {
    loadUser();
  }, []);

  if (!userReply) return null; // Return null if userReply is not loaded yet

  const isLogedInUserLikeReply = reply?.reactions.some(
    (reaction) => loggedInUser.id === reaction.userId
  );

  const likeBtnStyle = isLogedInUserLikeReply ? 'liked' : '';

  return (
    <section className="reply-preview">
      <div className="img-profile-reply">
        <img src={userReply.imgUrl} alt="" className="img" />
      </div>
      <div className="user-container">
        <div className="user-details">
          <div className="details-user-container">
            <div>
              <h3>{userReply.name}</h3>
              <p>{userReply.profession}</p>
            </div>
            <div>
              <TimeAgo date={reply.createdAt}></TimeAgo>
              <span className="logo-dots">icon</span>
            </div>
          </div>
          <p className="reply-txt">{reply.body}</p>
        </div>
        <div className="reply-actions">
          <span>{reply.reactions?.length || ''}</span>
          <button className={'like ' + likeBtnStyle} onClick={onLikeReply}>
            Like
          </button>
        </div>
      </div>
    </section>
  );
};

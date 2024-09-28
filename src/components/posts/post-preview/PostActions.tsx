import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FaComment, FaShare, FaThumbsUp } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { LoggedInUser, Post } from 'types';
import { IoIosSend } from 'react-icons/io';

interface PostActionsProps {
  post: Partial<Post>;
  onToggleShowComment: () => void;
  onLikePost: () => void;
  onSharePost: () => void;
  loggedInUser: LoggedInUser | null;
}

export const PostActions: React.FC<PostActionsProps> = ({
  post,
  onToggleShowComment,
  onLikePost,
  onSharePost,
  loggedInUser,
}) => {
  const navigate = useNavigate();

  const isLogedInUserLikePost = post?.reactions?.some((reaction) => {
    return (
      loggedInUser && loggedInUser.id && loggedInUser.id === reaction.userId
    );
  });

  const likeBtnStyle = isLogedInUserLikePost ? 'liked' : '';

  return (
    <section className="post-actions">
      <button className={'like ' + likeBtnStyle} onClick={onLikePost}>
        <FaThumbsUp />
        <span>J'aime</span>
      </button>

      <button className="comment" onClick={onToggleShowComment}>
        <FaComment />
        <span>Commenter</span>
      </button>

      <button className="share" onClick={() => onSharePost()}>
        <FaShare />
        <span>Partager</span>
      </button>

      <button
        className="send"
        onClick={() => navigate(`/main/message/${post.userId}`)}
      >
        <IoIosSend />
        <span>Envoyer</span>
      </button>
    </section>
  );
};

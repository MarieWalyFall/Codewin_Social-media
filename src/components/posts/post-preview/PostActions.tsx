import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';
import { LoggedInUser, Post } from 'types';



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
    return loggedInUser && loggedInUser.id && loggedInUser.id === reaction.userId;
  });

  const likeBtnStyle = isLogedInUserLikePost ? 'liked' : '';

  return (
    <section className="post-actions">
      <button className={'like ' + likeBtnStyle} onClick={onLikePost}>
        Icon
        <span>Like</span>
      </button>

      <button className="comment" onClick={onToggleShowComment}>
        Icon
        <span>Comment</span>
      </button>

      <button className="share" onClick={() => onSharePost()}>
        Icon
        <span>Share</span>
      </button>

      <button className="send" onClick={() => navigate(`/main/message/${post.userId}`)}>
        Icon
        <span>Send</span>
      </button>
    </section>
  );
};

import { FaComment, FaPaperPlane, FaShare, FaThumbsUp } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { LoggedInUser, Post } from 'types';
import { StyledPostActions } from '../style/StyledPostPreview';

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
    <StyledPostActions className="post-actions">
      <button className={'like ' + likeBtnStyle} onClick={onLikePost}>
        <FaThumbsUp className="icon like-icon" />
        <span>J'aime</span>
      </button>

      <button className="comment" onClick={onToggleShowComment}>
        <FaComment className="icon comment-icon" />
        <span>Commenter</span>
      </button>

      <button className="share" onClick={() => onSharePost()}>
        <FaShare className="icon share-icon" />
        <span>Partager</span>
      </button>

      <button
        className="send"
        onClick={() => navigate(`/message/${post.userId}`)}
      >
        <FaPaperPlane className="icon share-icon" />
        <span>Envoyer</span>
      </button>
    </StyledPostActions>
  );
};

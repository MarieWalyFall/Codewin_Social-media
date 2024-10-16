import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { removeComment } from 'store/actions/postActions';
import { userService } from 'services/user/userService';
import { makeId } from 'utils/utilFuncs';
import { CommentMenu } from './CommentMenu';
import { ReplyList } from 'components/replies/ReplyList';
import TimeAgo from 'react-timeago';
import { CommentPreviewProps, LoggedInUser, Reply } from 'types';

export const CommentPreview: React.FC<CommentPreviewProps> = ({
  comment,
  onSaveComment,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userId, createdAt, postId, reactions, replies } = comment;
  const [userComment, setUserComment] = useState<LoggedInUser | null>(null);
  const [isShowinputComment, setIsShowinputComment] = useState<boolean>(false);
  const [isShowreplyList, setIsShowReplyList] = useState<boolean>(false);
  const [isShowMenu, setIsShowMenu] = useState<boolean>(false);
  const [isFirstFocus, setIsFirstFocus] = useState<boolean>(true);
  const [replyField, setReplyField] = useState<{ txt: string }>({ txt: '' });
  const { loggedInUser } = useSelector((state: any) => state.userModule); // Adjust the state type if you have a specific type

  const toggleMenu = () => {
    setIsShowMenu((prevVal) => !prevVal);
  };

  const loadUserComment = async (userId: string) => {
    if (!userId) return;
    const userCommentData = await userService.getById(userId);
    setUserComment(userCommentData);
  };

  const onLikeComment = () => {
    const commentToSave = { ...comment };
    if (!commentToSave.reactions) {
      commentToSave.reactions = [];
    }
    const isAlreadyLike = commentToSave.reactions.some(
      (reaction) => reaction.userId === loggedInUser.id
    );
    if (isAlreadyLike) {
      commentToSave.reactions = commentToSave.reactions.filter(
        (reaction) => reaction.userId !== loggedInUser.id
      );
    } else {
      commentToSave.reactions.push({
        userId: loggedInUser.id,
        fullname: loggedInUser.fullname,
        reaction: 'like',
      });
    }
    onSaveComment(commentToSave);
  };

  const onRemoveComment = () => {
    // dispatch(removeComment(comment));
  };

  const addReply = () => {
    if (!replyField.txt.trim()) return; // Check for empty reply text
    const commentToSave = { ...comment };
    if (!commentToSave.replies) {
      commentToSave.replies = [];
    }
    setIsShowReplyList(true);
    const newReply: Reply = {
      id: makeId(24),
      userId: loggedInUser.id,
      postId: postId,
      commentId: comment.id,
      txt: replyField.txt,
      reactions: [],
      createdAt: Date.now(),
    };
    commentToSave.replies.unshift(newReply);
    onSaveComment(commentToSave);
    setReplyField({ txt: '' });
  };

  const updateReply = (replyToUpdate: Reply) => {
    const commentToSave = { ...comment };
    if (!commentToSave.replies) {
      commentToSave.replies = [];
    }
    const idx = commentToSave.replies.findIndex(
      (reply) => reply.id === replyToUpdate.id
    );
    if (idx > -1) {
      commentToSave.replies[idx] = replyToUpdate;
      onSaveComment(commentToSave);
    }
  };

  const handleChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    const field = target.name as keyof typeof replyField;
    const value = target.type === 'number' ? +target.value || '' : target.value;
    setReplyField({ [field]: String(value) });
  };

  useEffect(() => {
    loadUserComment(userId);
  }, [userId]);

  if (!userComment) return <div>Loading...</div>;

  const isLogedInUserLikeComment = comment?.reactions?.some((reaction) => {
    return loggedInUser.id === reaction.userId;
  });

  const likeBtnStyle = isLogedInUserLikeComment ? 'liked' : '';

  const { profession, imgUrl } = userComment;

  const inputRef = (elInput: HTMLInputElement) => {
    if (elInput && isFirstFocus) elInput.focus();
    setIsFirstFocus(false);
  };

  if (!comment) return <div>Loading</div>;

  return (
    <section className="comment-preview">
      <div
        className="img-container"
        onClick={() => navigate(`/profile/${userComment?.id}`)}
      >
        <img src={imgUrl} alt="" className="img-profile" />
      </div>
      <div className="container">
        <div className="comment-header">
          <div className="comment-details">
            <div className="name">
              <h3>{userComment.name}</h3>
              <p>{profession}</p>
            </div>
            <div>
              <span>{/* <TimeAgo date={createdAt} /> */}</span>
              icon
            </div>
          </div>
          <div className="comment-text">
            <p>{comment.txt}</p>
          </div>
        </div>
        <div className="comment-action">
          <span>{reactions?.length || ''}</span>
          <button className={`like ${likeBtnStyle}`} onClick={onLikeComment}>
            Like
          </button>
          |
          <button onClick={() => setIsShowinputComment((prev) => !prev)}>
            Reply
          </button>
          |
          {comment.replies?.length ? (
            <button onClick={() => setIsShowReplyList((prev) => !prev)}>
              {isShowreplyList
                ? `Hide ${comment.replies.length} replies`
                : `Show ${comment.replies.length} replies`}
            </button>
          ) : null}
        </div>

        {isShowinputComment && (
          <div className="input-reply">
            <div className="img-loggedUser">
              <img src={loggedInUser.imgUrl} alt="" className="img" />
            </div>
            <div className="input-container">
              <input
                ref={inputRef}
                type="text"
                placeholder="Add a reply..."
                onChange={handleChange}
                name="txt"
                value={replyField.txt}
              />
            </div>
          </div>
        )}

        {replyField.txt && (
          <button className="reply-btn" onClick={addReply}>
            Reply
          </button>
        )}

        {isShowreplyList && replies && (
          <ReplyList replies={replies} updateReply={updateReply} />
        )}

        {isShowMenu && (
          <CommentMenu
            toggleMenu={toggleMenu}
            onRemoveComment={onRemoveComment}
            commentUserId={comment.userId ?? 'oop'}
          />
        )}
      </div>
    </section>
  );
};

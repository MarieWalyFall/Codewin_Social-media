import { InputComment } from './InputComment';
import { CommentsList } from './CommentsList';
import { useDispatch, useSelector } from 'react-redux';
import { saveComment } from 'store/actions/postActions';
import { saveActivity } from '../../store/actions/activityAction';
import { Comment, CommentsProps } from 'types';


export const Comments: React.FC<CommentsProps> = ({ postId, comments, userPostId }) => {
  const dispatch = useDispatch();
  const { loggedInUser } = useSelector((state: any) => state.userModule); // Adjust state typing if needed

  const onSaveComment = async (comment: Comment) => {
    const commentToSave = { ...comment, postId };
    const savedComment = await dispatch(saveComment(commentToSave));

    if (savedComment) {
      const newActivity = {
        type: commentToSave.id ? 'update-comment' : 'add-comment',
        description: '',
        createdBy: loggedInUser.id,
        createdTo: userPostId,
        commentId: savedComment.id,
        postId: savedComment.postId,
      };
      dispatch(saveActivity(newActivity));
    }
    return savedComment;
  };

  if (!comments) return <div>No comments BOZO</div>;

  return (
    <section className="comments">
      <InputComment onSaveComment={onSaveComment} />
      <CommentsList postId={postId} comments={comments} onSaveComment={onSaveComment} />
    </section>
  );
};

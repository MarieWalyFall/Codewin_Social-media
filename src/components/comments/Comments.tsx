import { InputComment } from './InputComment';
import { CommentsList } from './CommentsList';
import { useSelector } from 'react-redux';
import { saveComment } from 'store/actions/postActions';
import { saveActivity } from '../../store/actions/activityAction';
import { CommentData, CommentsProps, NewActivity } from 'types';
import { useAppDispatch } from 'hooks/useAppDispatch';


export const Comments: React.FC<CommentsProps> = ({ postId, comments, userPostId }) => {
  const dispatch = useAppDispatch();
  const { loggedInUser } = useSelector((state: any) => state.userModule); // Adjust state typing if needed

  const onSaveComment = async (comment: CommentData) => {
    const commentToSave = { ...comment, postId };
    const savedComment = await dispatch(saveComment(commentToSave));

    if (savedComment) {
      const newActivity: NewActivity = {
        type: commentToSave.id ? 'update-comment' : 'add-comment',
        createdAt: new Date(),
        description: '',
        createdBy: loggedInUser.id,
        createdTo: userPostId,
        commentId: savedComment.id,
        postId: savedComment.postId??'',
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

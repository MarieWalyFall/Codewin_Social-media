import { CommentsListProps } from 'types';
import { CommentPreview } from './CommentPreview';

export const CommentsList: React.FC<CommentsListProps> = ({ comments, onSaveComment }) => {
  if (!comments) return <section className="list-comments">Loading...</section>;

  return (
    <section className="list-comments">
      {comments.map((comment) => (
        <CommentPreview
          key={comment.id}
          comment={comment}
          onSaveComment={onSaveComment}
        />
      ))}
    </section>
  );
};

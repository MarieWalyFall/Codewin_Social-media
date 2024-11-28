import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { Comment, InputCommentProps, CommentData } from 'types';

export const InputComment: React.FC<InputCommentProps> = ({
  onSaveComment,
}) => {
  const { loggedInUser } = useSelector((state: any) => state.userModule); // Adjust typing if necessary
  const { imgUrl, id } = loggedInUser;

  const [isFirstFocus, setIsFirstFocus] = useState(true);
  const [newComment, setNewComment] = useState<CommentData>({
    body: '',
    userId: id,
  });

  const handleChange = async ({
    target,
  }: React.ChangeEvent<HTMLInputElement>) => {
    const field = target.name;
    let value = target.type === 'number' ? +target.value || '' : target.value;
    setNewComment((prevCred) => ({ ...prevCred, [field]: value }));
  };

  const doSubmit = () => {
    onSaveComment(newComment);
    setNewComment({ body: '', userId: id });
  };

  const inputRef = (elInput: HTMLInputElement) => {
    if (elInput && isFirstFocus) elInput.focus();
    setIsFirstFocus(false);
  };

  return (
    <section>
      <form className="input-comment" action="">
        <div>
          <div className="img-profile">
            <img src={imgUrl} alt="" className="img" />
          </div>

          <div className="input-container">
            <input
              ref={inputRef}
              type="text"
              placeholder="Add a Comment..."
              required
              onChange={handleChange}
              id="body"
              name="body"
              value={newComment.body}
            />
            <span>icon</span>
            <span>icon</span>
          </div>
        </div>
        <div className="post-btn-container">
          {newComment.body && (
            <button
              onClick={(ev) => {
                ev.preventDefault();
                doSubmit();
              }}
            >
              Post
            </button>
          )}
        </div>
      </form>
    </section>
  );
};

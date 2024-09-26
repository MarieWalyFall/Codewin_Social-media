import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { CommentMenuProps } from 'types';

export const CommentMenu: React.FC<CommentMenuProps> = ({ toggleMenu, onRemoveComment, commentUserId }) => {
  const [isAskAgain, setIsAskAgain] = useState<boolean>(false);
  const { loggedInUser } = useSelector((state: any) => state.userModule); // Use a proper type for the state

  const isLoggedInUserCanDelete = loggedInUser?.id === commentUserId;

  return (
    <section>
      <div
        className="bg-menu"
        onClick={(ev) => {
          ev.stopPropagation();
          toggleMenu();
        }}
      ></div>
      <section className="comment-menu">
        <div className="container">
          {isLoggedInUserCanDelete && (
            <button
              className="delete-container"
              onClick={() => setIsAskAgain((prev) => !prev)}
            >
              <p>Delete comment</p>
            </button>
          )}
        </div>
        {isAskAgain && (
          <div className="ask-again">
            <p>Are you sure?</p>
            <div className="opts">
              <p className="yes opt-btn" onClick={onRemoveComment}>
                yes
              </p>
              <p className="no opt-btn" onClick={() => setIsAskAgain(false)}>
                no
              </p>
            </div>
          </div>
        )}
      </section>
    </section>
  );
};

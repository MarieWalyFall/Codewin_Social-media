import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface PostMenuProps {
  toggleMenu: () => void;
  onRemovePost: () => void;
  postUserId?: string;
  copyToClipBoard: () => void;
}

interface RootState {
  userModule: {
    loggedInUser: {
      id: string;
    };
  };
}

export const PostMenu: React.FC<PostMenuProps> = ({
  toggleMenu,
  onRemovePost,
  postUserId,
  copyToClipBoard,
}) => {
  const { loggedInUser } = useSelector((state: RootState) => state.userModule);
  const [isAskAgain, setIsAskAgain] = useState(false);

  const isLoggedInUserCanDelete = loggedInUser.id === postUserId;

  return (
    <section>
      <div
        className="bg-menu"
        onClick={(ev) => {
          ev.stopPropagation();
          toggleMenu();
        }}
      ></div>
      <section className="post-menu">
        {isLoggedInUserCanDelete && (
          <div className="container">
            <button
              className="delete-container"
              onClick={() => setIsAskAgain((prev) => !prev)}
            >
              Icon
              <p>Delete post</p>
            </button>
          </div>
        )}
        {isAskAgain && (
          <div className="ask-again">
            <p>Are you sure?</p>
            <div className="opts">
              <p className="yes opt-btn" onClick={onRemovePost}>
                yes
              </p>
              <p className="no opt-btn" onClick={() => setIsAskAgain(false)}>
                no
              </p>
            </div>
          </div>
        )}

        <div className="copy-to-clip-board">
          <button
            onClick={(ev) => {
              ev.stopPropagation();
              toggleMenu();
              copyToClipBoard();
            }}
          >
            Icon
            <p>Copy link to post</p>
          </button>
        </div>
      </section>
    </section>
  );
};

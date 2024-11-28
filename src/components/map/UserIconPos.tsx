import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface UserIconPosProps {
  url: string;
  userId: string; // Change to number if userId is a number
  name: string;
  isCloseUserIcon: boolean;
}

export const UserIconPos: React.FC<UserIconPosProps> = ({
  url,
  userId,
  name,
  isCloseUserIcon,
}) => {
  const [isUserIconOpen, setIsUserIconOpen] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (isCloseUserIcon) {
      setIsUserIconOpen(false);
    }
    return () => {};
  }, [isCloseUserIcon]);

  return (
    <div
      className="user-icon-pos-container"
      onClick={(ev) => {
        ev.stopPropagation();
        setIsUserIconOpen((prev) => !prev);
      }}
    >
      <img className="user-icon-pos" src={url} alt={name} title={name} />
      {isUserIconOpen && (
        <div className="menu-container">
          <div className="opts-btns">
            <div className="name">
              <p>{name}</p>
            </div>
            <div
              className="go-to-profile opt"
              onClick={() => navigate(`/profile/${userId}`)}
            >
              <p>Go to profile</p>
            </div>
            <div
              className="send-message opt"
              onClick={() => navigate(`/message/${userId}`)}
            >
              <p>Send a message</p>
            </div>
          </div>

          <div
            className="close"
            onClick={(ev) => {
              ev.stopPropagation();
              setIsUserIconOpen(false);
            }}
          >
            <span>Close</span>
          </div>
        </div>
      )}
    </div>
  );
};

import { userService } from '../../services/user/userService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import TimeAgo from 'react-timeago';
import { Link, useNavigate } from 'react-router-dom';
import { MyConnectionPreviewProps, User } from 'types';

export const MyConnectionPreview: React.FC<MyConnectionPreviewProps> = ({
  connection,
}) => {
  const [user, setUser] = useState<User | null>(null); // State to hold the user or null
  const navigate = useNavigate();

  const loadUser = async () => {
    const user = await userService.getById(connection.id);
    setUser(user);
  };

  useEffect(() => {
    loadUser();
  }, [connection.id]); // Added connection.id as a dependency to avoid stale closure

  if (!user) return null; // Return null instead of undefined to avoid rendering issues

  return (
    <section className="my-connection-preview">
      <div className="container">
        <div className="img-profile">
          <img src={user.imgUrl} alt={user.name} className="img" />
        </div>
        <div className="fullname">
          <Link to={`/profile/${user.id}`}>
            <h3>{user.name}</h3>
            <p>{user.profession || ' '}</p>
            {connection.connected && (
              <p>
                connected <TimeAgo date={connection.connected} />
              </p>
            )}
          </Link>
        </div>
        <div className="btns">
          <button onClick={() => navigate(`/message/${user.id}`)}>
            Message
          </button>
          icon
        </div>
      </div>
    </section>
  );
};

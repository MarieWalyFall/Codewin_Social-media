import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { updateUser } from '../../store/actions/userActions';
import { Connection, LoggedInUser } from 'types';
import { useAppDispatch } from 'hooks/useAppDispatch';

interface ConnectionPreviewProps {
  user: LoggedInUser | null; // or User depending on your implementation
}

export function ConnectionPreview({ user }: ConnectionPreviewProps) {
  const dispatch = useAppDispatch();
  const [isConnected, setIsConnected] = useState<boolean | null>(null);
  const { loggedInUser } = useSelector((state: any) => state.userModule); // Replace `any` with your root state type

  useEffect(() => {
    checkIsConnected();
  }, [user, loggedInUser]);

  const checkIsConnected = () => {
    const isConnected = loggedInUser?.connections?.some(
      (connection: Connection) => connection.id === user?.id
    );

    setIsConnected(isConnected || false);
  };

  const connectProfile = async () => {
    if (!user || !user.fullname) return; // Ensure fullname is present
    if (isConnected) {
      // Remove connection logic
      const connectionToRemove = { ...user };
      const loggedInUserToUpdate = { ...loggedInUser };

      loggedInUserToUpdate.connections =
        loggedInUserToUpdate.connections.filter(
          (connection: Connection) => connection.id !== connectionToRemove.id
        );

      connectionToRemove.connections = connectionToRemove.connections?.filter(
        (connection: Connection) => connection.id !== loggedInUserToUpdate.id
      );

      dispatch(updateUser(loggedInUserToUpdate));
      dispatch(updateUser(connectionToRemove));
    } else if (isConnected === false) {
      // Add connection logic
      const connectionToAdd = { ...user };
      const loggedInUserToUpdate = { ...loggedInUser };

      connectionToAdd.connections = connectionToAdd.connections || [];
      connectionToAdd.connections.unshift({
        id: loggedInUserToUpdate.id,
        name: loggedInUserToUpdate.fullname,
      });

      loggedInUserToUpdate.connections.push({
        id: connectionToAdd.id, // Ensure you use the correct properties
        fullname: connectionToAdd.fullname, // This should be available
      });

      dispatch(updateUser(loggedInUserToUpdate));
      dispatch(updateUser(connectionToAdd));
    }
  };

  if (!user) return null;

  return (
    <li className="connection-preview">
      <Link to={`/profile/${user.id}`}>
        <div className="bg">
          {user.imgUrl ? (
            <img src={user.imgUrl} alt="" className="img-profile" />
          ) : (
            <img src="loadingCircle" alt="Loading" /> // Replace with actual loading image
          )}
        </div>
        <div className="fullname">
          <p>{user.fullname}</p>
        </div>
        <div className="profession">
          <p>{user.profession}</p>
        </div>
      </Link>
      <div className="followers-count">
        <p>{user.connections?.length} connections</p>
      </div>
      <div className="btn-container" onClick={connectProfile}>
        <button>{!isConnected ? 'Connect' : 'Disconnect'}</button>
      </div>
    </li>
  );
}

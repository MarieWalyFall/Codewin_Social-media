import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { userService } from '../services/user/userService';
import { PostsList } from 'components/posts/PostsList';
import { ImgPreview } from '../components/profile/ImgPreview';
import { EditModal } from 'components/profile/EditModal';
import {
  getPostsLength,
  loadPosts,
  setCurrPageAction as setCurrPage,
  setFilterByPosts,
} from '../store/actions/postActions';
import { updateUser } from '../store/actions/userActions';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { FilterByPosts } from 'types';
import { LoadingIndicator } from 'components/LoadingIndicator';
import { FaConnectdevelop } from 'react-icons/fa';
import { FaMessage } from 'react-icons/fa6';

const Profile: React.FC = () => {
  const params = useParams<{ userId: string }>(); // specify parameter type
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [user, setUser] = useState<any>(null); // Adjust to your user type
  const [isShowImgProfile, setIsShowImgProfile] = useState<boolean>(false);
  const [isShowEditModal, setIsShowEditModal] = useState<boolean>(false);
  const [isConnected, setIsConnected] = useState<boolean | null>(null);

  const { posts } = useSelector((state: any) => state.postModule); // Adjust to your state type
  const { loggedInUser } = useSelector((state: any) => state.userModule); // Adjust to your state type

  const checkIsConnected = () => {
    const isConnected = loggedInUser?.connections?.some(
      (connection: { userId: string }) => connection?.userId === user?.id
    );
    setIsConnected(isConnected);
  };

  useEffect(() => {
    checkIsConnected();
  }, [user]);

  const loadUser = async () => {
    const fetchedUser = await userService.getById(params.userId ?? '');
    setUser(fetchedUser);
  };

  const toggleShowImgProfile = () => {
    setIsShowImgProfile((prev) => !prev);
  };

  const toggleShowEditModal = () => {
    setIsShowEditModal((prev) => !prev);
  };

  const onShowProfile = () => {
    toggleShowImgProfile();
  };

  const connectProfile = async () => {
    if (!user) return;
    if (isConnected) {
      // Remove connection
      const connectionToRemove = { ...user };
      const loggedInUserToUpdate = { ...loggedInUser };

      loggedInUserToUpdate.connections =
        loggedInUserToUpdate.connections.filter(
          (connection: { userId: string }) =>
            connection.userId !== connectionToRemove.id
        );

      connectionToRemove.connections = connectionToRemove.connections.filter(
        (connection: { userId: string }) =>
          connection.userId !== loggedInUserToUpdate.id
      );

      dispatch(updateUser(loggedInUserToUpdate));
      dispatch(updateUser(connectionToRemove));

      setUser((prev: any) => ({ ...prev, ...connectionToRemove }));
    } else if (isConnected === false) {
      // Add connection
      const connectionToAdd = { ...user };
      const loggedInUserToUpdate = { ...loggedInUser };

      connectionToAdd.connections.unshift({
        userId: loggedInUserToUpdate.id,
        fullname: loggedInUserToUpdate.fullname,
      });

      loggedInUserToUpdate.connections.push({
        userId: connectionToAdd.id,
        fullname: connectionToAdd.fullname,
      });

      dispatch(updateUser(loggedInUserToUpdate));
      dispatch(updateUser(connectionToAdd));
      setUser(connectionToAdd);
    }
  };

  const moveToChat = () => {
    navigate(`/message/${user?.id}`);
  };

  useEffect(() => {
    const filterBy: FilterByPosts = {
      userId: params.userId,
    };
    dispatch(setCurrPage('profile'));
    dispatch(setFilterByPosts(filterBy));
    loadUser();
    dispatch(loadPosts());
    dispatch(getPostsLength());

    return () => {
      dispatch(setFilterByPosts({}));
    };
  }, [params.userId, loggedInUser]);

  if (!user) {
    return (
      <section className="feed-load">
        <span className="gif-container">
          <LoadingIndicator />
        </span>
      </section>
    );
  }

  const isLoggedInUserProfile = loggedInUser?.id === user?.id;

  return (
    <section className="profile-page">
      <div className="left">
        <div className="user-profile">
          <div className="bg" style={{ backgroundImage: `url(${user.bg})` }}>
            <div className="img-container" onClick={onShowProfile}>
              <img src={user.imgUrl} alt="Profile" className="img" />
            </div>
          </div>

          <div className="user-details">
            <div>
              <div className="name">
                <h1>{user.fullname}</h1>
              </div>
              <div className="profession">
                <p>{user.profession}</p>
              </div>
              <div className="profession">
                <p>{user.email}</p>
              </div>
              <div className="btns-container">
                {isLoggedInUserProfile && (
                  <button className="add-details" onClick={toggleShowEditModal}>
                    Edit profile
                  </button>
                )}
                {!isLoggedInUserProfile && (
                  <button className="connect" onClick={connectProfile}>
                    <FaConnectdevelop />
                    <p>{!isConnected ? 'Connect' : 'Disconnect'}</p>
                  </button>
                )}

                <button className="message" onClick={moveToChat}>
                  <FaMessage />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="user-posts">
          {posts?.length ? (
            <PostsList postsList={posts} />
          ) : (
            <div>
              <p>{user.fullname} has not published any posts yet.</p>
            </div>
          )}
        </div>
      </div>
      <div className="right">
        <div className="top-div"></div>
        <div className="bottom-div"></div>
      </div>
      {isShowImgProfile && (
        <ImgPreview
          toggleShowImg={toggleShowImgProfile}
          imgUrl={user.imgUrl}
          title="Profile photo"
        />
      )}

      {isShowEditModal && (
        <EditModal toggleShowEditModal={toggleShowEditModal} user={user} />
      )}
    </section>
  );
};

export default Profile;

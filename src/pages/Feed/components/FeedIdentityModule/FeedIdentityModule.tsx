import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { login, logout, getLoggedinUser } from 'store/actions/userActions';
import { LoadingIndicator } from 'components/LoadingIndicator';

import { useAppDispatch } from 'hooks/useAppDispatch';
import { CiLogout } from 'react-icons/ci';
import { StyledFeedIdentityModule } from '../../style/StyledLeftSideBar';

export const FeedIdentityModule: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(true);

  const user = useSelector((state: any) => state.userModule.loggedInUser);
  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      try {
        const loggedInUser = await dispatch(getLoggedinUser());
      } catch (error) {
        console.error('Error fetching user:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [dispatch]);

  const handleLogout = async () => {
    await dispatch(logout());
    navigate('/');
  };

  if (loading) {
    return (
      <section className="feed-identity-module">
        <LoadingIndicator />
      </section>
    );
  }

  if (!user) {
    return (
      <section className="feed-identity-module">
        <p>No user found. Please log in.</p>
      </section>
    );
  }

  const { name, imgUrl, profession, id, connections } = user;

  return (
    <StyledFeedIdentityModule className="feed-identity-module">
      <div>
        <div className="bg">
          <div
            className="profile-container"
            onClick={() => navigate(`/profile/${id}`)}
          >
            {imgUrl && name ? (
              <img src={imgUrl} alt={name} className="img" />
            ) : null}
          </div>
        </div>

        <div className="profile-name">
          <h1>{name}</h1>
          <p className="professional">{profession}</p>
        </div>

        <div className="views">
          <div>
            <p>{connections?.length} connections</p>
          </div>
        </div>

        <div className="my-items">
          <div onClick={handleLogout}>
            <p>Logout</p>
            <span>
              <CiLogout />
            </span>
          </div>
        </div>
      </div>
    </StyledFeedIdentityModule>
  );
};

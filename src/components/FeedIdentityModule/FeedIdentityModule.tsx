import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { login, logout, getLoggedinUser } from 'store/actions/userActions';
import { LoadingIndicator } from 'components/LoadingIndicator';
import { RootState } from '../../store'; // Adjust this import based on your project structure
import { useAppDispatch } from 'hooks/useAppDispatch';
import { CiLogout } from 'react-icons/ci';

export const FeedIdentityModule: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch(); // Dispatch for Redux actions
  const [loading, setLoading] = useState(true);

  // Assuming your user state is in the Redux store, adjust the selector accordingly
  const user = useSelector((state: RootState) => state.userModule.loggedInUser); // Change 'user' to the actual key in your Redux store

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      try {
        const loggedInUser = await dispatch(getLoggedinUser()); // Fetch the user
        // If getLoggedinUser directly sets the user in the Redux store, you may not need to set user state here
      } catch (error) {
        console.error('Error fetching user:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser(); // Call the function to fetch the user
  }, [dispatch]);

  const handleLogout = async () => {
    await dispatch(logout()); // Dispatch the logout action
    navigate('/'); // Optionally navigate after logout
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
    <section className="feed-identity-module">
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
    </section>
  );
};

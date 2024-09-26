import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useAuth } from 'hooks/useAuth'; // Adjust the path to your AuthContext

export const FeedIdentityModule: React.FC = () => {
  const { auth, logout } = useAuth(); // Use the AuthContext to access auth and logout
  const navigate = useNavigate();

  const { profile } = auth;

  const handleLogout = () => {
    logout(); // Call the logout function from AuthContext
  };

  if (!profile) {
    return <section className="feed-identity-module">Loading</section>;
  }

  const { name, imgUrl, profession, id, connections } = profile;

  return (
    <section className="feed-identity-module">
      <div>
        <div className="bg">
          <div
            className="profile-container"
            onClick={() => navigate(`/profile/${id}`)}
          >
           (imgUrl && name ?  <img src={imgUrl||undefined} alt={name||undefined} className="img" /> : null )
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
              insert icon
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

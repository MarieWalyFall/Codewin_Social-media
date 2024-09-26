import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ConnectionList } from 'components/connections/ConnectionList';
import { getUsers, setUsers } from '../store/actions/userActions';
import { setCurrPage } from '../store/actions/postActions';

const MyNetwork: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { users } = useSelector((state: any) => state.userModule); // Adjust to your state type
  const { loggedInUser } = useSelector((state: any) => state.userModule); // Adjust to your state type

  useEffect(() => {
    dispatch(getUsers());
    dispatch(setCurrPage('mynetwork'));

    return () => {
      dispatch(setUsers(null));
    };
  }, [dispatch]);

  if (!users)
    return (
      <section className="network">
        <span className="gif-container">
          Icon
        </span>
      </section>
    );

  return (
    <section className="my-network-page">
      <div className="left">
        <div className="manage-network">
          <div>
            <h3>Manage my network</h3>
          </div>
          <ul>
            <li>
              <button onClick={() => navigate('/main/connections')}>
                <div>
                  <span className="logo">
                    Icon
                  </span>
                  <span className="txt">
                    <p>Connections</p>
                  </span>
                </div>
                <span>
                  <p>
                    {loggedInUser.connections?.length || 0}
                  </p>
                </span>
              </button>
            </li>
            <li></li>
          </ul>
        </div>
      </div>

      <div className="right">
        <div className="recommended">
          <div>
            <h3>Recommended for you</h3>
          </div>

          <ConnectionList users={users} />
        </div>
      </div>
    </section>
  );
};

export default MyNetwork;

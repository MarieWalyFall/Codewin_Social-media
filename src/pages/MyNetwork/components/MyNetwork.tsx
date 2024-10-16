import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ConnectionList } from 'components/connections/ConnectionList';
import { getUsers, setUsers } from '../../../store/actions/userActions';
import { setCurrPageAction as setCurrPage } from '../../../store/actions/postActions';
import { useAppDispatch } from 'hooks/useAppDispatch';
import Loader from '../../Loader';
import { FaUserFriends } from 'react-icons/fa';
import Connections from './Connections';
import { StyledMyNetwork } from '../style/StyledMyNetwork';

const MyNetwork: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { users } = useSelector((state: any) => state.userModule);
  const { loggedInUser } = useSelector((state: any) => state.userModule); // Adjust to your state type

  useEffect(() => {
    dispatch(getUsers());
    dispatch(setCurrPage('mynetwork'));

    return () => {
      dispatch(setUsers([]));
    };
  }, [dispatch]);

  if (!users) return <Loader />;

  return (
    <StyledMyNetwork className="my-network-page">
      <div className="left">
        <div className="manage-network">
          <div>
            <h3>Manage my network</h3>
          </div>
          <ul>
            <li>
              <div>
                <span className="logo">
                  <FaUserFriends />
                </span>
                <span className="txt">
                  <p>Connections</p>
                </span>
              </div>
              <span>
                <p>{loggedInUser.connections?.length || 0}</p>
              </span>
            </li>
            <li></li>
          </ul>
        </div>
      </div>

      <div className="right">
        <Connections />
      </div>
    </StyledMyNetwork>
  );
};

export default MyNetwork;

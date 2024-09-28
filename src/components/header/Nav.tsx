import { FaBell, FaGlobe, FaHome } from 'react-icons/fa';
import { FaMessage } from 'react-icons/fa6';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
const NavItem = styled.p`
  padding: 5px;
`;
export const Nav = () => {
  const { currPage } = useSelector((state: any) => state.postModule);

  const { loggedInUser } = useSelector((state: any) => state.userModule);
  const { unreadActivities } = useSelector(
    (state: any) => state.activityModule
  );
  const { unreadMessages } = useSelector((state: any) => state.activityModule);

  return (
    <nav className="nav">
      <ul>
        <li
          className={'home' + ' ' + (currPage === 'feed' ? 'current-btn' : '')}
        >
          <Link to="/feed">
            <NavItem>
              <FaHome />
              <span>Fil</span>
            </NavItem>
          </Link>
        </li>
        <li
          className={
            'mynetwork' + ' ' + (currPage === 'mynetwork' ? 'current-btn' : '')
          }
        >
          <Link to={`/mynetwork`}>
            <p>
              <FaGlobe />
              <span>Connections</span>
            </p>
          </Link>
        </li>
        <li
          className={
            'messaging' + ' ' + (currPage === 'message' ? 'current-btn' : '')
          }
        >
          <Link to={`/message`}>
            <p>
              <FaMessage />
              <span>Messages</span>
              {unreadMessages?.length > 0 && (
                <span className="number">{unreadMessages?.length}</span>
              )}
            </p>
          </Link>
        </li>
        <li
          className={
            'notifications' +
            ' ' +
            (currPage === 'notifications' ? 'current-btn' : '')
          }
        >
          <Link to={`/notifications`}>
            <p>
              <FaBell />
              <span>Notifications</span>
              {unreadActivities?.length > 0 && (
                <span className="number">{unreadActivities?.length}</span>
              )}
            </p>
          </Link>
        </li>
        <li
          className={
            'me-btn' + ' ' + (currPage === 'profile' ? 'current-btn' : '')
          }
        >
          <Link to={`/profile/${loggedInUser?.id}`}>
            <p>
              <span>
                <img
                  src={loggedInUser?.imgUrl}
                  alt=""
                  className="profile-icon"
                />
              </span>
              <span className="txt">Profil</span>
            </p>
          </Link>
        </li>
        {/* <li className="volunteering-btn">
          <p>
            <FontAwesomeIcon
              className={
                'nav-icon' +
                ' ' +
                (currPage === 'volunteering' ? 'curr-logo' : '')
              }
              icon="fas fa-th"
            />
            Volunteer
          </p>
        </li>
        <li className="post-volunteer-btn">
          <p>
            <FontAwesomeIcon
              className={
                'nav-icon' +
                ' ' +
                (currPage === 'post-volunteer' ? 'curr-logo' : '')
              }
              icon="fas fa-plus"
            />
            more
          </p>
        </li> */}
      </ul>
    </nav>
  );
};

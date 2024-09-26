import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

export const Nav = () => {
  const { currPage } = useSelector((state : any) => state.postModule)

  const { loggedInUser } = useSelector((state : any) => state.userModule)
  const { unreadActivities } = useSelector((state : any) => state.activityModule)
  const { unreadMessages } = useSelector((state : any) => state.activityModule)

  return (
    <nav className="nav">
      <ul>
        <li
          className={'home' + ' ' + (currPage === 'home' ? 'current-btn' : '')}
        >
          <Link to="/main/feed">
            <p>
              Icon
              <span>Home</span>
            </p>
          </Link>
        </li>
        <li
          className={
            'mynetwork' + ' ' + (currPage === 'mynetwork' ? 'current-btn' : '')
          }
        >
          <Link to={`/main/mynetwork`}>
            <p>
              Icon
              <span>My Network</span>
            </p>
          </Link>
        </li>
        <li
          className={
            'messaging' + ' ' + (currPage === 'message' ? 'current-btn' : '')
          }
        >
          <Link to={`/main/message`}>
            <p>
              Icon
              <span>Messaging</span>
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
          <Link to={`/main/notifications`}>
            <p>
              Icon
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
          <Link to={`/main/profile/${loggedInUser?.id}`}>
            <p>
              <span>
                <img
                  src={loggedInUser?.imgUrl}
                  alt=""
                  className="profile-icon"
                />
              </span>
              <span className="txt">Me</span>
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
  )
}

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

export const Nav = () => {
  const { currPage } = useSelector((state) => state.postModule)

  // current-btn

  const { loggedInUser } = useSelector((state) => state.userModule)

  return (
    <nav className="nav">
      <ul>
        <li
          className={'home' + ' ' + (currPage === 'home' ? 'current-btn' : '')}
        >
          <Link to="/main/feed">
            <p>
              <FontAwesomeIcon className="nav-icon" icon="fas fa-home-lg-alt" />
              Home
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
              <FontAwesomeIcon
                className="nav-icon"
                icon="fas fa-user-friends"
              />
              My Network
            </p>
          </Link>
        </li>
        <li
          className={'jobs' + ' ' + (currPage === 'jobs' ? 'current-btn' : '')}
        >
          <p>
            <FontAwesomeIcon className="nav-icon" icon="fas fa-suitcase" />
            Jobs
          </p>
        </li>
        <li
          className={
            'messaging' + ' ' + (currPage === 'messaging' ? 'current-btn' : '')
          }
        >
          <p>
            <FontAwesomeIcon className="nav-icon" icon="fas fa-comment" />
            Messaging
          </p>
        </li>
        <li
          className={
            'notifications' +
            ' ' +
            (currPage === 'notifications' ? 'current-btn' : '')
          }
        >
          <p>
            <FontAwesomeIcon className="nav-icon" icon="fas fa-bell" />
            Notifications
          </p>
        </li>
        <li
          className={
            'me-btn' + ' ' + (currPage === 'profile' ? 'current-btn' : '')
          }
        >
          <Link to={`/main/profile/${loggedInUser?._id}`}>
            <p>
              <span>
                <img
                  src={loggedInUser?.imgUrl}
                  alt=""
                  className="profile-icon"
                />
              </span>
              <span>
                Me
                <FontAwesomeIcon
                  className="down-icon"
                  icon="fas fa-sort-down"
                />
              </span>
            </p>
          </Link>
        </li>
        <li>
          <p>
            <FontAwesomeIcon className="nav-icon" icon="fas fa-th" />
            Work
          </p>
        </li>
        <li>
          <p>
            <FontAwesomeIcon className="nav-icon" icon="fas fa-plus" />
            Post a job
          </p>
        </li>
      </ul>
    </nav>
  )
}

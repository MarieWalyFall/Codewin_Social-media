import { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { setCurrPageAction as setCurrPage } from '../../../store/actions/postActions';
import { NotificationsList } from 'components/notifications/components/NotificationsList';

import {
  loadActivities,
  setFilterByActivities,
  setUnreadActivitiesIds,
} from '../../../store/actions/activityAction';
import { updateUser } from '../../../store/actions/userActions';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { RootState } from '../../../store'; // Adjust this import based on your store setup
import { FilterByActivities } from 'types';
import Loader from 'pages/Loader';

function Notifications() {
  const dispatch = useAppDispatch();

  // Use RootState to specify the shape of the Redux store
  const { loggedInUser } = useSelector((state: RootState) => state.userModule);
  const { activities } = useSelector(
    (state: RootState) => state.activityModule
  );

  useEffect(() => {
    dispatch(setCurrPage('notifications'));

    if (loggedInUser?.id) {
      const filterBy: FilterByActivities = {
        userId: loggedInUser.id,
      };
      dispatch(setFilterByActivities(filterBy));
      dispatch(loadActivities());
    }

    const updateLastSeen = () => {
      updateLastSeenLoggedUser(); // Call async function without `await`
      dispatch(setUnreadActivitiesIds());
    };

    return () => {
      updateLastSeen(); // Cleanup function remains synchronous
    };
  }, [dispatch, loggedInUser]); // Add dependencies for better linting

  const updateLastSeenLoggedUser = async () => {
    try {
      const lastSeenActivity = new Date().getTime();

      if (loggedInUser) {
        // Check if loggedInUser exists before spreading it
        await dispatch(updateUser({ ...loggedInUser, lastSeenActivity }));
      }
    } catch (err) {
      console.error('Failed to update last seen:', err);
    }
  };

  if (!activities) return <Loader />;

  return (
    <div className="notifications-page">
      <div className="side-bar">
        <div className="container"></div>
      </div>

      <div className="main">
        <div className="container">
          <NotificationsList />
        </div>
      </div>

      <div className="aside">
        <div className="container"></div>
      </div>
    </div>
  );
}

export default Notifications;

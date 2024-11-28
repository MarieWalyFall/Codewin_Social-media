import { useSelector } from 'react-redux';
import { NotificationPreview } from './NotificationPreview';
import { Activity } from 'types';
import { StyledNotificationsList } from '../style/StyledNotifications';

interface ActivityModuleState {
  activities: Activity[];
}

export function NotificationsList() {
  const { activities } = useSelector(
    (state: { activityModule: ActivityModuleState }) => state.activityModule
  );

  if (!activities?.length) {
    return (
      <StyledNotificationsList className="notifications-list">
        <div className="no-activities-container">
          <p>No activities</p>
        </div>
      </StyledNotificationsList>
    );
  }

  return (
    <section className="notifications-list">
      {activities.map((activity: Activity) => (
        <NotificationPreview key={activity.id} activity={activity} />
      ))}
    </section>
  );
}

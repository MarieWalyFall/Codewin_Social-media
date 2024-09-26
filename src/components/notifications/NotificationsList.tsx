import { useSelector } from 'react-redux';
import { NotificaitonPreview } from './NotificaitonPreview';
import { Activity } from 'types';


interface ActivityModuleState {
  activities: Activity[];
}

export function NotificationsList() {
  const { activities } = useSelector((state: { activityModule: ActivityModuleState }) => state.activityModule);

  if (!activities?.length) {
    return (
      <div className="notifications-list">
        <div className="no-activities-container">
          <p>No activities</p>
        </div>
      </div>
    );
  }

  return (
    <section className="notifications-list">
      {activities.map((activity: Activity) => (
        <NotificaitonPreview key={activity?.id} activity={activity} />
      ))}
    </section>
  );
}

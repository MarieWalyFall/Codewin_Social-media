import { Dispatch } from 'redux';
import { activityService } from 'services/activity/activityService';
import { Activity, ActivityAction, FilterByActivities, NewActivity} from 'types'; 

export function loadActivities() {
  return async (dispatch: Dispatch<ActivityAction>, getState: () => any) => {
    try {
      const { filterByActivities } = getState().activityModule;
      const activities = await activityService.query(filterByActivities);

      dispatch({ type: 'SET_ACTIVITIES', activities });
    } catch (err) {
      console.log('err:', err);
    }
  };
}

export function saveActivity(activity: NewActivity) {
  return async (dispatch: Dispatch<ActivityAction>) => {
    try {
      const addedActivity = await activityService.save(activity);
      activity.id
        ? dispatch({ type: 'UPDATE_ACTIVITY', activity: addedActivity })
        : dispatch({ type: 'ADD_ACTIVITY', activity: addedActivity });
    } catch (err) {
      console.log('err:', err);
    }
  };
}

export function getActivitiesLength() {
  return async (dispatch: Dispatch<ActivityAction>, getState: () => any) => {
    try {
      const { filterByActivities } = getState().activityModule;
      const activitiesLength = await activityService.getActivitiesLength(
        filterByActivities
      );
      dispatch({ type: 'SET_ACTIVITIES_LENGTH', activitiesLength });
    } catch (err) {
      console.log('err:', err);
    }
  };
}

export function addFilterByActivities(filterByActivities: FilterByActivities) {
  return async (dispatch: Dispatch<ActivityAction>) => {
    dispatch({ type: 'ADD_FILTER_BY_ACTIVITIES', filterByActivities });
  };
}

export function setFilterByActivities(filterByActivities: FilterByActivities) {
  return async (dispatch: Dispatch<ActivityAction>) => {
    dispatch({ type: 'SET_FILTER_BY_ACTIVITIES', filterByActivities });
  };
}

export function setUnreadActivitiesIds() {
  return async (dispatch: Dispatch<ActivityAction>, getState: () => any) => {
    const { activities } = getState().activityModule;
    const { loggedInUser } = getState().userModule;

    if (!activities || !loggedInUser) return;

    let unreadActivities: string[] = [];
    let unreadMessages: string[] = [];

    activities.forEach((activity: Activity) => {
      if (loggedInUser.lastSeenActivity < activity.createdAt) {
        if (loggedInUser.id === activity.createdBy) return;
        if (activity.type !== 'private-message') {
          unreadActivities.push(activity.id?? '');
        }
      }

      if (loggedInUser.lastSeenMsgs < activity.createdAt) {
        if (loggedInUser.id === activity.createdBy) return;
        if (activity.type === 'private-message') {
          unreadMessages.push(activity.chatId?? '');
        }
      }
    });

    dispatch({ type: 'SET_UNREAD_ACTIVITIES', unreadActivities });
    dispatch({ type: 'SET_UNREAD_MESSAGES', unreadMessages });
  };
}

import { Activity } from 'types';
import { mockHttpService } from '../mock/mockHttpService';

const ENDPOINT = 'activity';

export const activityService = {
  query,
  save,
  getActivitiesLength,
};

// Query activities based on filters
async function query(filterBy: any = {}): Promise<Activity[]> {
  return await mockHttpService.get(ENDPOINT, filterBy);
}

// Save a new activity or update an existing one
async function save(activity: Activity): Promise<Activity> {
  return await mockHttpService.put(`${ENDPOINT}/${activity.id}`, activity);
}

// Get the total count of activities based on filters
async function getActivitiesLength(filterBy: any = {}): Promise<number> {
  return await mockHttpService.get(`${ENDPOINT}/length`, filterBy);
}

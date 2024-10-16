import { Activity } from 'types';

const activities: Activity[] = [
  // Example mock data
  {
    id: '1',
    postId: 'p1',
    createdTo: 'u1',
    createdBy: 'u2',
    createdAt: String(new Date()),
    type: 'like',
    description: 'User2 liked your post',
  },
  {
    id: '2',
    postId: 'p2',
    createdTo: 'u3',
    createdBy: 'u1',
    createdAt: String(new Date()),
    type: 'comment',
    commentId: 'c1',
    description: 'User1 commented on your post',
  },
];

export const mockActivityService = {
  getActivities,
  getActivityById,
  createActivity,
  updateActivity,
  deleteActivity,
  getActivitiesLength,
};

// Fetch all activities with optional filters
async function getActivities(filterBy: any = {}): Promise<Activity[]> {
  // Apply filtering logic here if necessary
  return activities;
}

// Fetch a specific activity by ID
async function getActivityById(activityId: string): Promise<Activity> {
  const activity = activities.find((a) => a.id === activityId);
  if (!activity) {
    throw new Error('Activity not found');
  }
  return activity;
}

// Create a new activity
async function createActivity(
  activity: Omit<Activity, 'id' | 'createdAt'>
): Promise<Activity> {
  const newActivity: Activity = {
    ...activity,
    id: (activities.length + 1).toString(), // Generate an ID for the new activity
    createdAt: new Date(), // Set the current date
  };
  activities.push(newActivity);
  return newActivity;
}

// Update an existing activity
async function updateActivity(
  activityId: string,
  updatedActivity: Partial<Omit<Activity, 'id' | 'createdAt'>>
): Promise<Activity> {
  const idx = activities.findIndex((a) => a.id === activityId);
  if (idx === -1) {
    throw new Error('Activity not found');
  }
  activities[idx] = {
    ...activities[idx],
    ...updatedActivity,
  };
  return activities[idx];
}

// Delete an activity by ID
async function deleteActivity(activityId: string): Promise<void> {
  const idx = activities.findIndex((a) => a.id === activityId);
  if (idx === -1) {
    throw new Error('Activity not found');
  }
  activities.splice(idx, 1);
}

// Get the total count of activities
async function getActivitiesLength(filterBy: any = {}): Promise<number> {
  return activities.length;
}

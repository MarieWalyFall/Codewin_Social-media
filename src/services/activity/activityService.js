import { mockHttpService } from '../mock/mockHttpService'

const ENDPOINT = 'activity'

export const activityService = {
  query,
  save,
  getActivitiesLength,
}

const activitiesCash = {}

async function query(filterBy = {}) {
  const activities = await mockHttpService.get(ENDPOINT, filterBy)

  return activities
}

async function save(activity) {
  return activity._id
    ? await mockHttpService.put(`${ENDPOINT}/${activity._id}`, activity)
    : await mockHttpService.post(ENDPOINT, activity)
}

async function getActivitiesLength(filterBy = {}) {
  return await mockHttpService.get(ENDPOINT + '/length', filterBy)
}

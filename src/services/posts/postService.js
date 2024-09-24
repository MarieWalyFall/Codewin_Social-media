import { mockHttpService } from '../mock/mockHttpService'

const ENDPOINT = 'post'

export const postService = {
  query,
  getById,
  remove,
  save,
  getPostsLength,
}

const postsCash = {}

async function query(filterBy = {}) {
  return await mockHttpService.get(ENDPOINT, filterBy)
}
async function getPostsLength(filterBy = {}) {
  return await mockHttpService.get(ENDPOINT + '/length', filterBy)
}

async function getById(id) {
  if (postsCash[id]) return postsCash[id]
  else {
    const post = await mockHttpService.get(`${ENDPOINT}/${id}`)
    postsCash[id] = post
    return post
  }
}

async function remove(id) {
  return await mockHttpService.delete(`${ENDPOINT}/${id}`)
}

async function save(post) {
  return post._id
    ? await mockHttpService.put(`${ENDPOINT}/${post._id}`, post)
    : await mockHttpService.post(ENDPOINT, post)
}

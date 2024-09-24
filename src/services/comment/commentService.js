import { mockHttpService } from '../mock/mockHttpService'

const ENDPOINT = 'comment'

export const commentService = {
  query,
  getById,
  remove,
  save,
}

async function query(filterBy = {}) {
  return await mockHttpService.get(ENDPOINT, filterBy)
}

async function getById(id) {
  return await mockHttpService.get(`${ENDPOINT}/${id}`)
}

async function remove(comment) {
  return await mockHttpService.delete(`${ENDPOINT}/${comment._id}`, comment)
}

async function save(comment) {
  return comment._id
    ? await mockHttpService.put(`${ENDPOINT}/${comment._id}`, comment)
    : await mockHttpService.post(ENDPOINT, comment)
}

// ;(async () => {
//   console.log('IFI !')
//   const comments = await query()

//   console.log('comments: ', comments)
// })()

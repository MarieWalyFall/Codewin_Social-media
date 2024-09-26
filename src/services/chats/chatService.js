import { mockHttpService } from '../mock/mockHttpService'

const ENDPOINT = 'chat'

export const chatService = {
  query,
  // getById,
  // remove,
  save,
}

async function query(filterBy = {}) {
  return await mockHttpService.get(ENDPOINT, filterBy)
}

// async function getById(id) {
//   return await mockHttpService.get(`${ENDPOINT}/${id}`)
// }

// async function remove(id) {
//   return await mockHttpService.delete(`${ENDPOINT}/${id}`)
// }

async function save(chat) {
  return chat.id
    ? await mockHttpService.put(`${ENDPOINT}/${chat.id}`, chat)
    : await mockHttpService.post(ENDPOINT, chat)
}

// ;(async () => {
//   console.log('IFI !')
//   const chats = await query()

//   console.log('chats: ', chats)
// })()

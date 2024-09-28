import { mockHttpService } from '../mock/mockHttpService';
import { Chat } from 'types'; 

const ENDPOINT = 'chat';

export const chatService = {
  query,
  // getById,
  // remove,
  save,
};

async function query(filterBy: Record<string, any> = {}): Promise<Chat[]> {
  return await mockHttpService.get(ENDPOINT, filterBy);
}

// async function getById(id: string): Promise<Chat> {
//   return await mockHttpService.get<Chat>(`${ENDPOINT}/${id}`);
// }

// async function remove(id: string): Promise<void> {
//   return await mockHttpService.delete(`${ENDPOINT}/${id}`);
// }

async function save(chat: Chat): Promise<Chat> {
  return chat.id
    ? await mockHttpService.put<Chat>(`${ENDPOINT}/${chat.id}`, chat)
    : await mockHttpService.post<Chat>(ENDPOINT, chat);
}

// ;(async () => {
//   console.log('IFI !')
//   const chats = await query()
//   console.log('chats: ', chats)
// })()

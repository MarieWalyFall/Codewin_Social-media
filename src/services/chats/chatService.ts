import { mockHttpService } from '../mock/mockHttpService';
import { Chat } from 'types';

const ENDPOINT = 'chat';

export const chatService = {
  query,
  getById,
  remove,
  save,
};

// Query chats with optional filters
async function query(filterBy: Record<string, any> = {}): Promise<Chat[]> {
  return await mockHttpService.get(ENDPOINT, filterBy);
}

// Get chat by ID
async function getById(id: string): Promise<Chat> {
  if (!id) {
    throw new Error('Chat ID is required');
  }
  return await mockHttpService.get(`${ENDPOINT}/${id}`);
}

// Remove chat by ID
async function remove(id: string): Promise<void> {
  if (!id) {
    throw new Error('Chat ID is required for removal');
  }
  return await mockHttpService.delete(ENDPOINT, id);
}

// Save chat (update if existing, create new if not)
async function save(chat: Chat): Promise<Chat> {
  if (chat.id) {
    return await mockHttpService.put<Chat>(`${ENDPOINT}/${chat.id}`, chat);
  } else {
    return await mockHttpService.post<Chat>(ENDPOINT, chat);
  }
}

// Uncomment for testing
// ;(async () => {
//   try {
//     console.log('IFI !');
//     const chats = await query();
//     console.log('chats: ', chats);
//   } catch (error) {
//     console.error('Error fetching chats:', error);
//   }
// })();

import { Chat, Message } from 'types'; // Adjust the types to fit your actual types

const API_URL = 'http://localhost:3030/chats'; // Adjust the port if necessary

export const mockChatService = {
  getChats,
  getChatById,
  createChat,
  updateChat,
  deleteChat,
  addMessageToChat,
  updateMessageInChat,
  deleteMessageFromChat,
};

// Get all chats
async function getChats(): Promise<Chat[]> {
  const response = await fetch(API_URL);
  if (!response.ok) {
    throw new Error('Failed to fetch chats');
  }
  return response.json();
}

// Get a single chat by ID
async function getChatById(chatId: string): Promise<Chat> {
  const response = await fetch(`${API_URL}/${chatId}`);
  if (!response.ok) {
    throw new Error('Chat not found');
  }
  return response.json();
}

// Create a new chat
async function createChat(chat: Omit<Chat, 'id' | 'createdAt'>): Promise<Chat> {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      ...chat,
      createdAt: new Date().toISOString(),
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to create chat');
  }

  return response.json();
}

// Update an existing chat
async function updateChat(
  chatId: string,
  chat: Partial<Omit<Chat, 'id' | 'createdAt' | 'updatedAt'>>
): Promise<Chat> {
  const response = await fetch(`${API_URL}/${chatId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      ...chat,
      updatedAt: new Date().toISOString(),
    }),
  });

  if (!response.ok) {
    throw new Error('Chat not found or failed to update');
  }

  return response.json();
}

// Delete a chat
async function deleteChat(chatId: string): Promise<void> {
  const response = await fetch(`${API_URL}/${chatId}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error('Chat not found or failed to delete');
  }
}

// Add a message to a chat
async function addMessageToChat(
  chatId: string,
  message: Omit<Message, 'id' | 'createdAt'>
): Promise<Message> {
  const response = await fetch(`${API_URL}/${chatId}/messages`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      ...message,
      createdAt: new Date().toISOString(),
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to add message');
  }

  return response.json();
}

// Update an existing message in a chat
async function updateMessageInChat(
  chatId: string,
  messageId: string,
  message: Partial<Omit<Message, 'id' | 'createdAt' | 'updatedAt'>>
): Promise<Message> {
  const response = await fetch(`${API_URL}/${chatId}/messages/${messageId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      ...message,
      updatedAt: new Date().toISOString(),
    }),
  });

  if (!response.ok) {
    throw new Error('Message not found or failed to update');
  }

  return response.json();
}

// Delete a message from a chat
async function deleteMessageFromChat(
  chatId: string,
  messageId: string
): Promise<void> {
  const response = await fetch(`${API_URL}/${chatId}/messages/${messageId}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error('Message not found or failed to delete');
  }
}

import { chatService } from 'services/chats/chatService';
import { socketService } from '../../services/socket.service';

import { Chat } from 'types'; // Adjust based on your Chat type definition
import { AppDispatch } from '../../store';


export function loadChats(userId: string) {
  return async (dispatch: AppDispatch, getState: () => any) => { // Adjust getState type according to your root state type
    function onSuccess(chats: Chat[]) {
      dispatch({ type: 'SET_CHATS', chats });
      return chats;
    }
    try {
      const filterBy = { userId };
      const chats = await chatService.query(filterBy);
      return onSuccess(chats);
    } catch (err) {
      console.error('err:', err);
      throw new Error(String(err));
    }
  };
}

export function saveChat(chat: Chat) {
  return async (dispatch: AppDispatch) => {
    try {
      const addedChat = await chatService.save(chat);
      chat.id
        ? dispatch({ type: 'UPDATE_CHAT', chat: addedChat })
        : dispatch({ type: 'ADD_CHAT', chat: addedChat });

      chat.id
        ? socketService.emit('chat-updated', addedChat)
        : socketService.emit('chat-added', addedChat);

      return addedChat;
    } catch (err) {
      console.error('err:', err);
      throw new Error(String(err));
    }
  };
}

export function addTempChat(chat: Chat) {
  return async (dispatch: AppDispatch) => {
    try {
      const chatToAdd = { ...chat };
      dispatch({ type: 'ADD_CHAT', chat: chatToAdd });

      return chat;
    } catch (err) {
      console.error('err:', err);
      throw new Error(String(err));
    }
  };
}

export function removeTempChat(chatId: string) {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch({ type: 'REMOVE_CHAT', chatId });
    } catch (err) {
      console.error('err:', err);
      throw new Error(String(err));
    }
  };
}

export function updateChatForSocket(chat: Chat) {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch({ type: 'UPDATE_CHAT', chat });
      return chat;
    } catch (err) {
      console.error('err:', err);
    }
  };
}

export function addChatForSocket(chat: Chat) {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch({ type: 'ADD_CHAT', chat });
      return chat;
    } catch (err) {
      console.error('err:', err);
    }
  };
}

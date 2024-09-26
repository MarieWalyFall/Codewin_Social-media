const INITIAL_STATE = {
  chats: [
    {
      "id": "chat1",
      "userId": "u1",
      "userId2": "u2",
      "messages": [
        {
          "id": "m1",
          "txt": "Hey, how's it going?",
          "userId": "u1",
          "createdAt": 1689123456789
        },
        {
          "id": "m2",
          "txt": "I'm doing well, thanks! What about you?",
          "userId": "u2",
          "createdAt": 1689123460000
        },
        {
          "id": "m3",
          "txt": "I'm good too, just busy with some work.",
          "userId": "u1",
          "createdAt": 1689123470000
        }
      ],
      "createdAt": 1689123400000
    },
    {
      "id": "chat2",
      "userId": "u1",
      "userId2": "u3",
      "messages": [
        {
          "id": "m4",
          "txt": "Hey Bob, are you joining the meeting today?",
          "userId": "u1",
          "createdAt": 1689123600000
        },
        {
          "id": "m5",
          "txt": "Yes, I’ll be there in 5 minutes!",
          "userId": "u3",
          "createdAt": 1689123650000
        }
      ],
      "createdAt": 1689123500000
    }
  ],
}

export function chatReducer(state = INITIAL_STATE, action: any) {
  switch (action.type) {
    case 'SET_CHATS':
      return {
        ...state,
        chats: [...action.chats],
      }
    case 'ADD_CHAT':
      console.log('ADD_CHAT', action.chat)
      return {
        ...state,
        chats: [action.chat, ...state.chats],
      }

    case 'UPDATE_CHAT':
      return {
        ...state,
        chats: state.chats.map((chat) => {
          return chat.id === action.chat.id ? action.chat : chat
        }),
      }

    case 'REMOVE_CHAT':
      return {
        ...state,
        chats: state.chats.filter((chat) => chat.id !== action.chatId),
      }

    default:
      return state
  }
}

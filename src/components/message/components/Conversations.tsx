import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { MessagePreview } from './MessagePreview';
import { Chat, ConversationsProps } from 'types';
import { StyledConversations } from '../style/StyledMessage';

export const Conversations: React.FC<ConversationsProps> = ({
  chats,
  setchats,
  setChatWith,
  chatWith,
  setChosenChatId,
  chosenChatId,
  getTheNotLoggedUserChat,
  setTheNotLoggedUserChat,
  theNotLoggedUserChat,
}) => {
  const [chatsToShow, setChatsToShow] = useState<Chat[] | null>(null);
  const [field, setField] = useState<{ [key: string]: any }>({ body: '' });

  const handleChange = async ({
    target,
  }: React.ChangeEvent<HTMLInputElement>) => {
    const fieldName = target.name;
    let value = target.type === 'number' ? +target.value || '' : target.value;
    setField({ [fieldName]: value });
    setFilter(String(value));
  };

  const setFilter = (body: string) => {
    const regex = new RegExp(body, 'i');
    const filteredChats = [...chats].filter((chat) => {
      return (
        regex.test(chat.users ? chat.users[0] : '') ||
        regex.test(chat.users ? chat.users[1] : '')
      );
    });

    setChatsToShow(filteredChats);
  };

  useEffect(() => {
    setChatsToShow([...chats]);
  }, [chats]);

  return (
    <StyledConversations>
      <div className="title-container">
        <p>Mes Conversations</p>
      </div>

      <div className="filter-container">
        <input
          onChange={handleChange}
          type="text"
          id="body"
          name="body"
          value={field.body}
          placeholder="Search messages"
        />
      </div>

      <div className="list">
        {chatsToShow &&
          chatsToShow.map((chat) => (
            <MessagePreview
              key={chat.id}
              chat={chat}
              chats={chats}
              setchats={setchats}
              setChatWith={setChatWith}
              chatWith={chatWith}
              setChosenChatId={setChosenChatId}
              getTheNotLoggedUserChat={getTheNotLoggedUserChat}
              setTheNotLoggedUserChat={setTheNotLoggedUserChat}
              theNotLoggedUserChat={theNotLoggedUserChat}
              chosenChatId={chosenChatId}
            />
          ))}
      </div>
    </StyledConversations>
  );
};

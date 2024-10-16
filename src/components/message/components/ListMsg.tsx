import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { MsgPreview } from './MsgPreview';
import { Chat, ListMsgProps } from 'types';
import { StyledListMsg } from '../style/StyledMessage';

export const ListMsg: React.FC<ListMsgProps> = ({
  chats,
  setMessagesToShow,
  setChatWith,
  chatWith,
  setChosenChatId,
  chosenChatId,
  getTheNotLoggedUserChat,
  setTheNotLoggedUserChat,
  theNotLoggedUserChat,
}) => {
  const [chatsToShow, setChatsToShow] = useState<Chat[] | null>(null);
  const [field, setField] = useState<{ [key: string]: any }>({ txt: '' });

  const handleChange = async ({
    target,
  }: React.ChangeEvent<HTMLInputElement>) => {
    const fieldName = target.name;
    let value = target.type === 'number' ? +target.value || '' : target.value;
    setField({ [fieldName]: value });
    setFilter(String(value));
  };

  const setFilter = (txt: string) => {
    const regex = new RegExp(txt, 'i');
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
    <StyledListMsg className="list-msg">
      <div className="title-container">
        <p>Messaging</p>

        <div className="logos">
          <span className="logo-menu">Icon</span>
          <span className="logo-new-msg">Icon</span>
        </div>
      </div>

      <div className="filter-container">
        <input
          onChange={handleChange}
          type="text"
          id="txt"
          name="txt"
          value={field.txt}
          placeholder="Search messages"
        />
      </div>

      <div className="list">
        {chatsToShow &&
          chatsToShow.map((chat) => (
            <MsgPreview
              key={chat.id}
              chat={chat}
              chats={chats}
              setMessagesToShow={setMessagesToShow}
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
    </StyledListMsg>
  );
};

import { useSelector } from 'react-redux';
import { ReactSnip } from '@strg/react-snip';
import { useEffect, useState } from 'react';
import { Chat, Message, MessagePreviewProps, User } from 'types';
import { LoadingIndicator } from 'components/LoadingIndicator';
import { StyledMessagePreview } from '../style/StyledMessage';

export const MessagePreview: React.FC<MessagePreviewProps> = ({
  chat,
  chats,
  setchats,
  setChatWith,
  chatWith,
  chosenChatId,
  setChosenChatId,
  getTheNotLoggedUserChat,
}) => {
  const [theNotLoggedUserChat, setTheNotLoggedUserChat] = useState<User | null>(
    null
  );
  const [unreadMessagesCount, setUnreadMessagesCount] = useState(0);

  // Strongly type the Redux state using RootState
  const { unreadMessages } = useSelector((state: any) => state.activityModule);

  // Calculate unread messages count in a more efficient way
  const getUnreadCountMessages = () => {
    const countMessages = unreadMessages.filter(
      (chatId: string) => chat.id === chatId
    ).length;
    setUnreadMessagesCount(countMessages);
  };

  const lastMessage =
    chat.messages[chat.messages?.length - 1]?.body || 'No Messages yet..';
  const dateToShow = new Date(chat.messages[0]?.createdAt || chat.createdAt);
  const slicedDate = dateToShow.toLocaleDateString().slice(0, -5);

  const loadNotLoggedUser = async (chat: Chat) => {
    const user = await getTheNotLoggedUserChat(chat);
    setTheNotLoggedUserChat(user);
  };

  const onClickChat = () => {
    setchats(chat.messages);
    setChatWith(theNotLoggedUserChat);
    if (chat.id && setChosenChatId) {
      setChosenChatId(chat.id);
    }
  };

  useEffect(() => {
    loadNotLoggedUser(chat);
    getUnreadCountMessages();
    // Add unreadMessages as a dependency for accurate updates when unread messages change
  }, [chat, unreadMessages]);

  useEffect(() => {
    setchats(chat.messages);
    setChosenChatId && setChosenChatId(chat.id ?? '');
  }, [chat]);

  const isChatChosen = chosenChatId === chat.id ? 'chosen-chat' : '';
  const containerStyle = `container ${isChatChosen}`;

  if (!theNotLoggedUserChat) return <LoadingIndicator />;

  return (
    <StyledMessagePreview className="msg-preview" onClick={onClickChat}>
      <div className={containerStyle}>
        <div className="img-container">
          <img
            src={theNotLoggedUserChat?.imgUrl}
            alt={`${theNotLoggedUserChat?.name}'s profile picture`}
            className="img"
          />
          {unreadMessagesCount > 0 && (
            <span className="number">
              <p>{unreadMessagesCount}</p>
            </span>
          )}
        </div>
        <div className="details">
          <div className="name">
            <h1>{theNotLoggedUserChat?.name}</h1>
            <span title={String(dateToShow)}>
              <ReactSnip lines={1} method={'css'} ellipsis={slicedDate} />
            </span>
          </div>
          <div className="last-msg">
            <ReactSnip lines={1} method={'css'} ellipsis={lastMessage} />
          </div>
        </div>
      </div>
    </StyledMessagePreview>
  );
};

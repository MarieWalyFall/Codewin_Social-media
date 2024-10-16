import { useSelector } from 'react-redux';
import { ReactSnip } from '@strg/react-snip';
import { useEffect, useState } from 'react';
import { Chat, Message, MsgPreviewProps, User } from 'types';
import { LoadingIndicator } from 'components/LoadingIndicator';

export const MsgPreview: React.FC<MsgPreviewProps> = ({
  chat,
  chats,
  setMessagesToShow,
  setChatWith,
  chatWith,
  chosenChatId,
  setChosenChatId,
  getTheNotLoggedUserChat,
}) => {
  const [theNotLoggedUserChat, setTheNotLoggedUserChat] = useState<User | null>(
    null
  );
  const [unreadMsgsCount, setUnreadMsgsCount] = useState(0);

  // Strongly type the Redux state using RootState
  const { unreadMessages } = useSelector((state: any) => state.activityModule);

  // Calculate unread messages count in a more efficient way
  const getUnreadCountMsgs = () => {
    const countMsgs = unreadMessages.filter(
      (chatId: string) => chat.id === chatId
    ).length;
    setUnreadMsgsCount(countMsgs);
  };

  const lastMsg =
    chat.messages[chat.messages?.length - 1]?.content || 'No Messages yet..';
  const dateToShow = new Date(chat.messages[0]?.createdAt || chat.createdAt);
  const slicedDate = dateToShow.toLocaleDateString().slice(0, -5);

  const loadNotLoggedUser = async (chat: Chat) => {
    const user = await getTheNotLoggedUserChat(chat);
    setTheNotLoggedUserChat(user);
  };

  const onClickChat = () => {
    setMessagesToShow(chat.messages);
    setChatWith(theNotLoggedUserChat);
    if (chat.id && setChosenChatId) {
      setChosenChatId(chat.id);
    }
  };

  useEffect(() => {
    loadNotLoggedUser(chat);
    getUnreadCountMsgs();
    // Add unreadMessages as a dependency for accurate updates when unread messages change
  }, [chat, unreadMessages]);

  useEffect(() => {
    setMessagesToShow(chat.messages);
    setChosenChatId && setChosenChatId(chat.id ?? '');
  }, [chat]);

  const isChatChosen = chosenChatId === chat.id ? 'chosen-chat' : '';
  const containerStyle = `container ${isChatChosen}`;

  if (!theNotLoggedUserChat)
    return (
      <div className="msg-preview">
        <span className="loading-circle">
          <LoadingIndicator />
        </span>
      </div>
    );

  return (
    <section className="msg-preview" onClick={onClickChat}>
      <div className={containerStyle}>
        <div className="img-container">
          <img
            src={theNotLoggedUserChat?.imgUrl}
            alt={`${theNotLoggedUserChat?.name}'s profile picture`}
            className="img"
          />
          {unreadMsgsCount > 0 && (
            <span className="number">
              <p>{unreadMsgsCount}</p>
            </span>
          )}
        </div>
        <div className="details">
          <div className="fullname">
            <h1>{theNotLoggedUserChat?.name}</h1>
            <span title={String(dateToShow)}>
              <ReactSnip lines={1} method={'css'} ellipsis={slicedDate} />
            </span>
          </div>
          <div className="last-msg">
            <ReactSnip lines={1} method={'css'} ellipsis={lastMsg} />
          </div>
        </div>
      </div>
    </section>
  );
};

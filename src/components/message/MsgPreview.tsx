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
  chooseenChatId,
  setChooseenChatId,
  getTheNotLoggedUserChat,
 
}) => {
  const [theNotLoggedUserChat, setTheNotLoggedUserChat] = useState<User | null>(null);
  const [unreadMsgsCount, setUnreadMsgsCount] = useState(0);

  const { unreadMessages } = useSelector((state: any) => state.activityModule); // Adjust the state type

  const getUnreadCountMsgs = () => {
    let countMsgs = 0;
    unreadMessages.forEach((chatId: string) => {
      if (chat.id === chatId) countMsgs++;
    });
    setUnreadMsgsCount(countMsgs);
  };

  const lastMsg = chat.messages[chat.messages?.length - 1]?.txt || 'No Messages yet..';
  const dateToShow = new Date(chat.messages[0]?.createdAt || chat.createdAt);
  const slicedDate = dateToShow.toLocaleDateString().slice(0, -5);

  const loadNotLoggedUser = async (chat: Chat) => {
    const user = await getTheNotLoggedUserChat(chat);
    setTheNotLoggedUserChat(user);
  };

  const onClickChat = () => {
    setMessagesToShow(chat.messages);
    setChatWith(theNotLoggedUserChat);
    setChooseenChatId(chat.id?? "");
  };

  useEffect(() => {
    loadNotLoggedUser(chat);
    getUnreadCountMsgs();
    return () => {};
  }, [chat]);

  useEffect(() => {
    setMessagesToShow(chat.messages);
    setChooseenChatId(chat.id?? "");
    return () => {};
  }, [chat, chats]);

  const isChatChooseen = chooseenChatId === chat.id ? 'chooseen-chat' : '';
  const containerStyle = `container ${isChatChooseen}`;

  if (!theNotLoggedUserChat)
    return (
      <div className="msg-preview">
        <span className="loading-circle">
         <LoadingIndicator/>
        </span>
      </div>
    );

  return (
    <section className="msg-preview" onClick={onClickChat}>
      <div className={containerStyle}>
        <div className="img-container">
          <img src={theNotLoggedUserChat?.imgUrl} alt="" className="img" />
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
              <ReactSnip lines={1} method={'css'} ellipsis={slicedDate}/>
            </span>
          </div>
          <div className="last-msg">
          <ReactSnip lines={1} method={'css'} ellipsis={lastMsg}/>
          </div>
        </div>
      </div>
    </section>
  );
};

import { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { Messaging } from 'components/message/components/Messaging';
import { userService } from 'services/user/userService';
import { utilService } from 'services/utilService';
import { setCurrPageAction as setCurrPage } from 'store/actions/postActions';
import {
  addTempChat,
  removeTempChat,
  loadChats,
  saveChat,
} from 'store/actions/chatActions';
import {
  saveActivity,
  setUnreadActivitiesIds,
} from 'store/actions/activityAction';
import { updateUser } from 'store/actions/userActions';
import { Chat, Message as MessageType, NewActivity, User } from 'types'; // Ensure types are properly defined
import { RootState } from 'store/index';
import { StyledMessagesPage, StyledMessages } from '../style/StyledMessages';
import Loader from 'pages/Loader';

const Messages: React.FC = () => {
  const dispatch = useAppDispatch();
  const params = useParams<{ userId: string }>();
  const { loggedInUser } = useSelector((state: RootState) => state.userModule);
  const { chats } = useSelector((state: RootState) => state.chatModule);

  const [UserChatExists, setUserChatExists] = useState<boolean | undefined>();
  const [messagesToShow, setMessagesToShow] = useState<Chat['messages'] | null>(
    null
  );
  const [isNewChat, setIsNewChat] = useState(false);
  const [theNotLoggedUserChat, setTheNotLoggedUserChat] = useState<User | null>(
    null
  );
  const [chatWith, setChatWith] = useState<User | null>(null);

  useEffect(() => {
    dispatch(setCurrPage('message'));

    if (!loggedInUser?.id) return;

    dispatch(loadChats(loggedInUser.id)).then(() => {
      checkIfChatExist()
        .then((exists) => {
          if (params.userId === loggedInUser.id) return;
          setUserChatExists(exists);
          openChat();
        })
        .catch(() => {
          if (params.userId === loggedInUser.id) return;
          setUserChatExists(false);
          openChat();
        });
    });
  }, [loggedInUser, params.userId, dispatch]);

  useEffect(() => {
    const updateLastSeen = async () => {
      await updateLastSeenLoggedUser();
      dispatch(setUnreadActivitiesIds());
    };

    return () => {
      updateLastSeen();
    };
  }, [dispatch]);

  const updateLastSeenLoggedUser = useCallback(async () => {
    if (!loggedInUser) return;
    await dispatch(
      updateUser({
        ...loggedInUser,
        lastSeenMessages: String(new Date().getTime()),
      })
    );
  }, [dispatch, loggedInUser]);

  const checkIfChatExist = useCallback((): Promise<boolean> => {
    return new Promise((resolve, reject) => {
      if (!chats) {
        reject(false);
      } else {
        const exists = chats.some(
          (chat) =>
            chat.userId === params.userId || chat.userId2 === params.userId
        );
        exists ? resolve(true) : reject(false);
      }
    });
  }, [chats, params.userId]);

  const openChat = useCallback(async () => {
    if (UserChatExists) {
      const chatToShow = findChat(params.userId ?? '');
      if (chatToShow) {
        await loadNotLoggedUser(chatToShow);
        setMessagesToShow(chatToShow.messages);
      }
    } else {
      if (!params.userId || !chats) return;
      const newChat = createChat(params.userId);
      dispatch(addTempChat(newChat));
      setIsNewChat(true);
      await loadNotLoggedUser(newChat);
      setMessagesToShow(newChat.messages);
    }
  }, [UserChatExists, params.userId, chats, dispatch]);

  const onSendMsg = (content: string) => {
    if (!loggedInUser) return;

    const newMsg = createNewMsg(content, loggedInUser.id);
    const chatToUpdate = { ...chats[findChatIndex()] };
    chatToUpdate.messages.push(newMsg);

    if (isNewChat && chatToUpdate.id) {
      dispatch(removeTempChat(chatToUpdate.id));
      delete chatToUpdate.id;
    }
    setIsNewChat(false);

    dispatch(saveChat(chatToUpdate)).then((savedChat) => {
      setMessagesToShow(savedChat.messages);
      if (savedChat) {
        const newActivity: NewActivity = {
          type: 'private-message',
          createdBy: loggedInUser.id,
          createdTo:
            loggedInUser.id === savedChat.userId
              ? savedChat.userId2
              : savedChat.userId,
          chatId: savedChat.id,
          postId: '',
          createdAt: Date.now(),
        };
        dispatch(saveActivity(newActivity));
      }
    });
  };

  const createNewMsg = (content: string, senderId: string): MessageType => ({
    id: utilService.makeId(24),
    content,
    userId: loggedInUser?.id ?? '',
    createdAt: String(new Date().getTime()),
    senderId,
  });

  const createChat = (userId: string): Chat => ({
    id: utilService.makeId(7),
    userId,
    userId2: loggedInUser?.id ?? '',
    messages: [],
    createdAt: String(new Date().getTime()),
  });

  const loadNotLoggedUser = useCallback(async (chat: Chat) => {
    const user = await getTheNotLoggedUserChat(chat);
    setTheNotLoggedUserChat(user);
    setChatWith(user);
  }, []);

  const findChat = (userId: string) =>
    chats.find((chat) => chat.userId === userId || chat.userId2 === userId);

  const findChatIndex = () =>
    chats.findIndex(
      (chat) => chat.userId === params.userId || chat.userId2 === params.userId
    );

  const getTheNotLoggedUserChat = async (chat: Chat) => {
    const userId =
      loggedInUser?.id !== chat?.userId ? chat.userId : chat.userId2;
    return userId ? await userService.getById(userId) : null;
  };

  if (!chats) {
    return (
      <StyledMessages>
        <Loader />
      </StyledMessages>
    );
  }

  return;
  <StyledMessages>
    <div className="my-conversations"></div>
    <StyledMessagesPage className="messages">
      <div className="chat-header">
        <span className="back-button">&larr;</span>
        <div className="user-info">
          <span className="user-name">
            {chatWith?.username || 'Select a User'}
          </span>
          <span className="status">
            {chatWith ? 'Online' : 'No active conversation'}
          </span>
        </div>
      </div>
      <Messaging
        chats={chats}
        messagesToShow={messagesToShow}
        setMessagesToShow={setMessagesToShow}
        chatWith={chatWith}
        setChatWith={setChatWith}
        getTheNotLoggedUserChat={getTheNotLoggedUserChat}
        setTheNotLoggedUserChat={setTheNotLoggedUserChat}
        theNotLoggedUserChat={theNotLoggedUserChat}
      />

      {/* Input Area */}
      <div className="chat-input-container">
        <input
          type="text"
          placeholder="Type a message..."
          onKeyPress={(e) =>
            e.key === 'Enter' ? onSendMsg(e.currentTarget.value) : null
          }
        />
        <button onClick={() => onSendMsg('Hello!')}>Send</button>
      </div>
    </StyledMessagesPage>
  </StyledMessages>;
};

export default Messages;

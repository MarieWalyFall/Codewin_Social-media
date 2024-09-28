import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { setCurrPageAction as setCurrPage } from '../store/actions/postActions';
import { Messaging } from '../components/message/Messaging';
import {
  addTempChat,
  removeTempChat,
  loadChats,
  saveChat,
} from '../store/actions/chatActions';
import { useParams } from 'react-router-dom';
import { userService } from '../services/user/userService';
import { utilService } from '../services/utilService';
import {
  saveActivity,
  setUnreadActivitiesIds,
} from '../store/actions/activityAction';
import { updateUser } from '../store/actions/userActions';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { RootState } from '../store'; // Adjust this path based on your project structure
import { Chat, NewActivity, User } from 'types'; // Define these types based on your application structure

function Message() {
  const dispatch = useAppDispatch();
  const params = useParams<{ userId: string }>();
  const { loggedInUser } = useSelector((state: RootState) => state.userModule);
  const { chats } = useSelector((state: RootState) => state.chatModule);

  const [isUserChatExist, setIsUserChatExist] = useState<boolean | undefined>(
    undefined
  );
  const [messagesToShow, setMessagesToShow] = useState<Chat['messages'] | null>(
    null
  );

  const [isNewChat, setIsNewChat] = useState<boolean>(false);
  const [theNotLoggedUserChat, setTheNotLoggedUserChat] = useState<User | null>(
    null
  );
  const [chatWith, setChatWith] = useState<User | null>(null);

  useEffect(() => {
    dispatch(setCurrPage(0));
    const userId = loggedInUser?.id;
    if (!userId) return;

    dispatch(loadChats(userId)).then((chats) => {
      checkIfChatExist()
        .then((exists) => {
          if (params.userId === loggedInUser.id) return;
          setIsUserChatExist(exists);
          openChat();
        })
        .catch(() => {
          if (params.userId === loggedInUser.id) return;
          setIsUserChatExist(false);
          openChat();
        });
    });
  }, [loggedInUser, params.userId]);

  useEffect(() => {
    const updateLastSeen = async () => {
      await updateLastSeenLoggedUser();
      dispatch(setUnreadActivitiesIds());
    };

    return () => {
      // Call the async function
      updateLastSeen();
    };
  }, []);

  const updateLastSeenLoggedUser = async () => {
    const lastSeenMsgs = new Date().getTime();
    await dispatch(updateUser({ ...loggedInUser }));
  };

  const checkIfChatExist = (): Promise<boolean> => {
    return new Promise((resolve, reject) => {
      if (!chats) {
        reject(false);
      } else {
        const isChatExist = chats.some(
          (chat) =>
            chat.userId === params.userId || chat.userId2 === params.userId
        );
        if (isChatExist) resolve(true);
        else reject(false);
      }
    });
  };

  const openChat = async () => {
    if (isUserChatExist) {
      const chatToShow = findChat(params.userId ?? '');
      if (chatToShow) {
        await loadNotLoggedUser(chatToShow);
        setMessagesToShow(chatToShow.messages);
      }
    } else if (!isUserChatExist) {
      if (!params.userId || !chats) return;
      const newChat = createChat(params.userId);
      dispatch(addTempChat(newChat));
      setIsNewChat(true);
      await loadNotLoggedUser(newChat);
      setMessagesToShow(newChat.messages);
    }
  };

  const onSendMsg = (txt: string) => {
    const newMsg = createNewMsg(txt);

    const chatToUpdate = { ...chats[chatIdx] };
    chatToUpdate.messages.push(newMsg);
    chatToUpdate.users = [loggedInUser?.name, theNotLoggedUserChat?.name];
    if (isNewChat) {
      dispatch(removeTempChat(chatToUpdate.id));
      delete chatToUpdate.id;
    }
    setIsNewChat(false);

    dispatch(saveChat(chatToUpdate)).then((savedChat) => {
      setMessagesToShow(savedChat.messages);
      if (savedChat) {
        const newActivity: NewActivity = {
          type: 'private-message',
          createdBy: loggedInUser?.id ?? '',
          createdTo:
            loggedInUser?.id === savedChat.userId
              ? savedChat.userId2
              : savedChat.userId,
          chatId: savedChat.id,
          postId: '',
          createdAt: undefined,
        };
        dispatch(saveActivity(newActivity));
      }
    });
  };

  const createNewMsg = (txt: string) => {
    return {
      id: utilService.makeId(24),
      txt,
      userId: loggedInUser?.id,
      createdAt: String(new Date().getTime()),
    };
  };

  const createChat = (userId: string) => {
    return {
      id: utilService.makeId(7),
      userId,
      userId2: loggedInUser?.id,
      messages: [],
      createdAt: String(new Date().getTime()),
    };
  };

  const loadNotLoggedUser = async (chat: Chat) => {
    const user = (await getTheNotLoggedUserChat(chat)) || null;
    setTheNotLoggedUserChat(user);
    setChatWith(user);
  };

  const findChat = (userId: string) => {
    return chats.find(
      (chat) => chat.userId === userId || chat.userId2 === userId
    );
  };

  const getTheNotLoggedUserChat = async (chat: Chat) => {
    let userId;
    if (loggedInUser?.id !== chat?.userId) userId = chat.userId;
    else if (loggedInUser?.id !== chat?.userId2) userId = chat.userId2;
    return userId ? await userService.getById(userId) : null;
  };

  if (!chats) {
    return (
      <div className="message-page">
        <div className="gif-container">
          <img className="loading-gif" src="loadingGif" alt="" />{' '}
          {/* Replace with actual loading GIF source */}
        </div>
      </div>
    );
  }

  return (
    <section className="message-page">
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
      <div className="right-side-message">
        <p></p>
      </div>
    </section>
  );
}

export default Message;

import { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { setCurrPageAction as setCurrPage } from 'store/actions/postActions';
import { Messaging } from 'components/message/components/Messaging';
import {
  addTempChat,
  removeTempChat,
  loadChats,
  saveChat,
} from 'store/actions/chatActions';
import { useParams } from 'react-router-dom';
import { userService } from 'services/user/userService';
import { utilService } from 'services/utilService';
import {
  saveActivity,
  setUnreadActivitiesIds,
} from 'store/actions/activityAction';
import { updateUser } from 'store/actions/userActions';
import { useAppDispatch } from 'hooks/useAppDispatch';

import { Chat, Message as MessageType, NewActivity, User } from 'types'; // Define these types based on your application structure
import { RootState } from 'store/index';
import { StyledMessages } from '../style/StyledMessages';

const Message: React.FC = () => {
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

  // Set the current page when component mounts
  useEffect(() => {
    dispatch(setCurrPage('message'));

    if (!loggedInUser?.id) return;

    dispatch(loadChats(loggedInUser.id)).then(() => {
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
  }, [loggedInUser, params.userId, dispatch]);

  // Update the last seen status and unread messages when component unmounts
  useEffect(() => {
    const updateLastSeen = async () => {
      await updateLastSeenLoggedUser();
      dispatch(setUnreadActivitiesIds());
    };

    return () => {
      updateLastSeen();
    };
  }, [dispatch]);

  // Function to update the last seen message for the logged-in user
  const updateLastSeenLoggedUser = useCallback(async () => {
    await dispatch(
      updateUser({
        ...loggedInUser,
        lastSeenMessages: String(new Date().getTime()),
      })
    );
  }, [dispatch, loggedInUser]);

  // Check if a chat exists with the current user
  const checkIfChatExist = useCallback((): Promise<boolean> => {
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
  }, [chats, params.userId]);

  // Open chat based on whether the chat exists or is new
  const openChat = useCallback(async () => {
    if (isUserChatExist) {
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
  }, [isUserChatExist, params.userId, chats, dispatch]);

  // Send a new message and save it to the chat
  const onSendMsg = (content: string) => {
    const newMsg = createNewMsg(content, loggedInUser!.id);
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
          createdBy: loggedInUser?.id ?? '',
          createdTo:
            loggedInUser?.id === savedChat.userId
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

  // Helper function to create a new message
  const createNewMsg = (content: string, senderId: string) => {
    const newMsg: MessageType = {
      id: utilService.makeId(24),
      content,
      userId: loggedInUser?.id,
      createdAt: String(new Date().getTime()),
      senderId,
    };
    return newMsg;
  };

  // Helper function to create a new chat
  const createChat = (userId: string) => ({
    id: utilService.makeId(7),
    userId,
    userId2: loggedInUser?.id,
    messages: [],
    createdAt: String(new Date().getTime()),
  });

  // Load the not-logged-in user's data for the chat
  const loadNotLoggedUser = useCallback(async (chat: Chat) => {
    const user = await getTheNotLoggedUserChat(chat);
    setTheNotLoggedUserChat(user);
    setChatWith(user);
  }, []);

  // Find chat based on userId
  const findChat = (userId: string) =>
    chats.find((chat) => chat.userId === userId || chat.userId2 === userId);

  const findChatIndex = () =>
    chats.findIndex(
      (chat) => chat.userId === params.userId || chat.userId2 === params.userId
    );

  // Get the other user's chat details
  const getTheNotLoggedUserChat = async (chat: Chat) => {
    const userId =
      loggedInUser?.id !== chat?.userId ? chat.userId : chat.userId2;
    return userId ? await userService.getById(userId) : null;
  };

  if (!chats) {
    return (
      <div className="message-page">
        <div className="gif-container">
          <img className="loading-gif" src="loadingGif" alt="Loading..." />
        </div>
      </div>
    );
  }

  return (
    <StyledMessages className="message-page">
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
    </StyledMessages>
  );
};

export default Message;

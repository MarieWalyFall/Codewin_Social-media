import React, { lazy, Suspense, useEffect } from 'react';
import {  useSelector } from 'react-redux';

import { socketService } from '../services/socket.service';
import { Header } from '../components/header/Header';

import {
  addConnectedUserForSocket,
  addConnectedUsersForSocket,
} from '../store/actions/userActions';
import {
  addChatForSocket,
  updateChatForSocket,
} from '../store/actions/chatActions';
import {
  loadActivities,
  setFilterByActivities,
  setUnreadActivitiesIds,
} from '../store/actions/activityAction';
import {
  addCommentForSocket,
  addPostForSocket,
  removeCommentForSocket,
  removePostForSocket,
  updateCommentForSocket,
  updatePostForSocket,
} from '../store/actions/postActions';
import { LoadingIndicator } from 'components/LoadingIndicator';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { Routes, Route } from 'react-router-dom';

const Feed = lazy(() => import('./Feed'));
const SpecificPost = lazy(() => import('./SpecificPost'));
const Profile = lazy(() => import('./Profile'));
const MyNetwork = lazy(() => import('./MyNetwork'));
const Message = lazy(() => import('./Message'));
const Notifications = lazy(() => import('./Notifications'));
const Connections = lazy(() => import('./Connections/Connections'));

export function Main() {
  const dispatch = useAppDispatch();
  const { loggedInUser } = useSelector((state : any) => state.userModule);
  const { activities } = useSelector((state : any) => state.activityModule);

  useEffect(() => {
    if (loggedInUser?.id) {
      // Initialize socket connection when the user logs in
      // socketService.setup();
      console.log('Connect');
      const filterBy = { userId: loggedInUser.id };
      dispatch(setFilterByActivities(filterBy));
      dispatch(loadActivities());

      // Register socket event listeners
      socketService.on('add-post', handleAddPost);
      socketService.on('update-post', handleUpdatePost);
      socketService.on('remove-post', handleRemovePost);

      socketService.on('add-chat', handleAddChat);
      socketService.on('update-chat', handleUpdateChat);

      socketService.on('add-connected-users', handleAddConnectedUsers);
      socketService.on('add-connected-user', handleAddConnectedUser);

      socketService.on('update-comment', handleUpdateComment);
      socketService.on('add-comment', handleAddComment);
      socketService.on('remove-comment', handleRemoveComment);

      // Cleanup listeners when component unmounts or when user logs out
      return () => {
        socketService.off('add-post', handleAddPost);
        socketService.off('update-post', handleUpdatePost);
        socketService.off('remove-post', handleRemovePost);

        socketService.off('add-chat', handleAddChat);
        socketService.off('update-chat', handleUpdateChat);

        socketService.off('add-connected-users', handleAddConnectedUsers);
        socketService.off('add-connected-user', handleAddConnectedUser);

        socketService.off('update-comment', handleUpdateComment);
        socketService.off('add-comment', handleAddComment);
        socketService.off('remove-comment', handleRemoveComment);

        socketService.terminate(); // Clean up the socket connection
      };
    }
  }, [loggedInUser?.id, dispatch]);

  useEffect(() => {
    if (activities) {
      dispatch(setUnreadActivitiesIds());
    }

    return () => {
      dispatch(setUnreadActivitiesIds());
    };
  }, [activities, dispatch]);

  // Event Handlers
  const handleAddPost = (post: any) => {
    dispatch(addPostForSocket(post));
  };

  const handleUpdatePost = (post: any) => {
    dispatch(updatePostForSocket(post));
    dispatch(loadActivities()); // Reload activities after post update
  };

  const handleRemovePost = (postId: string) => {
    dispatch(removePostForSocket(postId));
  };

  const handleAddChat = (chat: any) => {
    dispatch(addChatForSocket(chat));
  };

  const handleUpdateChat = (chat: any) => {
    dispatch(updateChatForSocket(chat));
    dispatch(loadActivities()); // Reload activities after chat update
  };

  const handleAddConnectedUsers = (connectedUsers: any[]) => {
    dispatch(addConnectedUsersForSocket(connectedUsers));
  };

  const handleAddConnectedUser = (connectedUser: any) => {
    dispatch(addConnectedUserForSocket(connectedUser));
  };

  const handleAddComment = (comment: any) => {
    dispatch(addCommentForSocket(comment));
    dispatch(loadActivities()); // Reload activities after comment update
  };

  const handleUpdateComment = (comment: any) => {
    dispatch(updateCommentForSocket(comment));
    dispatch(loadActivities()); // Reload activities after comment update
  };

  const handleRemoveComment = (commentId: string) => {
    dispatch(removeCommentForSocket({id: commentId}));
  };

  return (
    <div className="main-page container">
      <Header />
      <Suspense fallback={<LoadingIndicator/>}>
      <Routes>
          <Route path="/main/feed" element={<Feed />} />
          <Route path="/main/profile/:id" element={<Profile />} />
          <Route path="/main/mynetwork" element={<MyNetwork />} />
          <Route path="/main/message" element={<Message />} />
          <Route path="/main/notifications" element={<Notifications />} />
     </Routes>
      </Suspense>
    </div>
  );
}

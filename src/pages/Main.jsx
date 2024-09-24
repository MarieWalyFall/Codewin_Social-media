/* eslint-disable react-hooks/exhaustive-deps */
import { lazy, Suspense, useEffect } from 'react';
import { Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { socketService } from '../services/socket.service';
import { Header } from '../cmps/header/Header';
import PrivateRoute from '../cmps/PrivateRoute';

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

const Feed = lazy(() => import('../pages/Feed'));
const SpecificPost = lazy(() => import('./SpecificPost'));
const Profile = lazy(() => import('./Profile'));
const MyNetwork = lazy(() => import('./MyNetwork'));
const Message = lazy(() => import('./Message'));
const Notifications = lazy(() => import('./Notifications'));
const Connections = lazy(() => import('./Connections'));

export function Main() {
  const dispatch = useDispatch();
  const { loggedInUser } = useSelector((state) => state.userModule);
  const { activities } = useSelector((state) => state.activityModule);

  useEffect(() => {
    if (loggedInUser?._id) {
      // Initialize socket connection when the user logs in
      socketService.setup();

      const filterBy = { userId: loggedInUser._id };
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
  }, [loggedInUser?._id, dispatch]);

  useEffect(() => {
    if (activities) {
      dispatch(setUnreadActivitiesIds());
    }

    return () => {
      dispatch(setUnreadActivitiesIds());
    };
  }, [activities, dispatch]);

  // Event Handlers
  const handleAddPost = (post) => {
    dispatch(addPostForSocket(post));
  };

  const handleUpdatePost = (post) => {
    dispatch(updatePostForSocket(post));
    dispatch(loadActivities()); // Reload activities after post update
  };

  const handleRemovePost = (postId) => {
    dispatch(removePostForSocket(postId));
  };

  const handleAddChat = (chat) => {
    dispatch(addChatForSocket(chat));
  };

  const handleUpdateChat = (chat) => {
    dispatch(updateChatForSocket(chat));
    dispatch(loadActivities()); // Reload activities after chat update
  };

  const handleAddConnectedUsers = (connectedUsers) => {
    dispatch(addConnectedUsersForSocket(connectedUsers));
  };

  const handleAddConnectedUser = (connectedUser) => {
    dispatch(addConnectedUserForSocket(connectedUser));
  };

  const handleAddComment = (comment) => {
    dispatch(addCommentForSocket(comment));
    dispatch(loadActivities()); // Reload activities after comment update
  };

  const handleUpdateComment = (comment) => {
    dispatch(updateCommentForSocket(comment));
    dispatch(loadActivities()); // Reload activities after comment update
  };

  const handleRemoveComment = (commentId) => {
    dispatch(removeCommentForSocket(commentId));
  };

  return (
    <div className="main-page container">
      <Header />
      <Suspense fallback={<h1>Loading...</h1>}>
        <Switch>
          <PrivateRoute path="/main/feed" component={Feed} />
          <PrivateRoute
            path="/main/post/:userId/:postId"
            component={SpecificPost}
          />
          <PrivateRoute path="/main/profile/:userId" component={Profile} />
          <PrivateRoute path="/main/mynetwork" component={MyNetwork} />
          <PrivateRoute path="/main/map" component={Map} />
          <PrivateRoute path="/main/message/:userId?" component={Message} />
          <PrivateRoute path="/main/notifications" component={Notifications} />
          <PrivateRoute path="/main/connections" component={Connections} />
        </Switch>
      </Suspense>
    </div>
  );
}

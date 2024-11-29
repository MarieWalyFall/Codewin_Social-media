import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Login } from './pages/Login/Login';
import { About } from './pages/About';
import { Signup } from './pages/Signup';
import { getLoggedinUser, refreshSession } from './store/actions/userActions';
import React, { lazy, Suspense, useEffect } from 'react';
import { useSelector } from 'react-redux';
import styled, { ThemeProvider } from 'styled-components';

import { Header } from 'components/header/components/Header';

import {
  loadActivities,
  setFilterByActivities,
  setUnreadActivitiesIds,
} from 'store/actions/activityAction';

import { LoadingIndicator } from 'components/LoadingIndicator';
import { useAppDispatch } from 'hooks/useAppDispatch';
import PrivateRoute from 'components/PrivateRoute';
import OpenRoute from 'components/OpenRoute';
import theme from 'theme';
import GlobalStyle from 'GlobaStyle';

const Feed = lazy(() => import('./pages/Feed/components/Feed'));
const SpecificPost = lazy(() => import('./pages/SpecificPost'));
const Profile = lazy(() => import('./pages/Profile/components/Profile'));
const MyNetwork = lazy(() => import('./pages/MyNetwork/components/MyNetwork'));
const Message = lazy(() => import('./pages/Messages/components/Messages'));
const Notifications = lazy(
  () => import('./pages/Notifications/components/Notifications')
);

const Main = styled.main`
  width: 100%;
  box-sizing: border-box;
  display: flex;
  justify-content: space-around;
  padding: 20px 30px;
`;

const MainBody = styled.div`
  width: 100%;
  box-sizing: border-box;
`;
const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const { loggedInUser } = useSelector((state: any) => state.userModule);
  const { activities } = useSelector((state: any) => state.activityModule);

  useEffect(() => {
    if (loggedInUser?.id) {
      const filterBy = { userId: loggedInUser.id };

      dispatch(setFilterByActivities(filterBy));
      dispatch(loadActivities());
    }
  }, [loggedInUser?.id, dispatch]);

  useEffect(() => {
    dispatch(refreshSession());
  }, []);
  useEffect(() => {
    if (activities) {
      dispatch(setUnreadActivitiesIds());
    }

    return () => {
      dispatch(setUnreadActivitiesIds());
    };
  }, [activities, dispatch]);

  useEffect(() => {
    dispatch(getLoggedinUser());
  }, [dispatch]);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Router>
        <Main>
          {loggedInUser && <Header />}
          <MainBody
            className={`main-page ${!loggedInUser ? 'app-container' : 'container'}`}
          >
            <Suspense fallback={<LoadingIndicator />}>
              <Routes>
                <Route element={<PrivateRoute />}>
                  <Route path="feed" element={<Feed />} />
                  <Route
                    path="post/:userId/:postId"
                    element={<SpecificPost />}
                  />
                  <Route path="profile/:userId" element={<Profile />} />
                  <Route path="mynetwork" element={<MyNetwork />} />
                  <Route path="message/:userId?" element={<Message />} />
                  <Route path="notifications" element={<Notifications />} />
                </Route>

                <Route element={<OpenRoute />}>
                  <Route path="/about" element={<About />} />
                  <Route path="/signup" element={<Signup />} />
                  <Route path="/" element={<Login />} />
                </Route>
              </Routes>
            </Suspense>
          </MainBody>
        </Main>
      </Router>
    </ThemeProvider>
  );
};

export default App;

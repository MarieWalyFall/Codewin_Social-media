import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Posts } from 'components/posts/Posts';
import { RightSideBar } from './RightSideBar';
import { LeftSideBar } from './LeftSideBar';
import {
  setCurrPageAction as setCurrPage,
  setNextPage,
} from 'store/actions/postActions';
import { useAppDispatch } from 'hooks/useAppDispatch';
import Loader from '../../Loader';
import { FeedPage } from '../style/StyledFeed';

const Feed: React.FC = () => {
  const { loggedInUser } = useSelector((state: any) => state.userModule);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setCurrPage('feed'));
    dispatch(setNextPage('mynetwork'));
  }, [dispatch]);

  if (!loggedInUser) {
    return <Loader />;
  }

  return (
    <FeedPage>
      <LeftSideBar />
      <Posts />
      <RightSideBar />
    </FeedPage>
  );
};

export default Feed;

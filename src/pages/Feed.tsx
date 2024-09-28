import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Posts } from 'components/posts/Posts';
import { RightSideBar } from 'components/RightSideBar';
import { LeftSideBar } from 'components/LeftSideBar';
import {
  setCurrPageAction as setCurrPage,
  setNextPage,
} from 'store/actions/postActions';
import { useAppDispatch } from 'hooks/useAppDispatch';
import Loader from './Loader';
import { refreshSession } from 'store/actions/userActions';

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
    <section className="feed-page">
      <LeftSideBar />
      <Posts />
      <RightSideBar />
    </section>
  );
};

export default Feed;

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Posts } from 'components/posts/Posts';
import { RightSideBar } from 'components/RightSideBar';
import { LeftSideBar } from 'components/LeftSideBar';
import { setCurrPage, setNextPage } from 'store/actions/postActions';
import loadingGif from 'assets/imgs/loading-gif.gif';

const Feed: React.FC = () => {
  const { loggedInUser } = useSelector((state: any) => state.userModule);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setCurrPage('home'));
    dispatch(setNextPage(1));
  }, [dispatch]);

  if (!loggedInUser) {
    return (
      <section className="feed-load">
        <div className="loading">
          <span>
            <img src={loadingGif} alt="Loading..." />
          </span>
        </div>
      </section>
    );
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

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AddPost } from './AddPost';
import { PostsList } from './PostsList';
import { SortBy } from './SortBy';
import { loadPosts, addFilterByPosts, getPostsLength } from '../../store/actions/postActions';
import { LoadingIndicator } from 'components/LoadingIndicator';
import { Post } from 'types';


interface RootState {
  postModule: {
    posts: Post[] | null; // Adjust the type as per your posts structure
  };
}

export const Posts: React.FC = () => {
  const dispatch = useDispatch();

  const posts = useSelector((state: RootState) => state.postModule.posts);

  useEffect(() => {
    dispatch(loadPosts()); // Fetch posts from the mock service
    dispatch(getPostsLength()); // Get the total number of posts
  }, [dispatch]);

  const onSetSort = (value: string) => {
    const filterBy = { sort: +value };
    dispatch(addFilterByPosts(filterBy)); // Add filtering options
    dispatch(loadPosts());
    dispatch(getPostsLength());
  };

  if (!posts)
    return (
      <section className="posts">
       <LoadingIndicator/>
      </section>
    );

  return (
    <section className="posts">
      <AddPost />
      <SortBy onSetSort={onSetSort} />
      <PostsList posts={posts} /> {/* Pass posts to PostsList if needed */}
    </section>
  );
};

import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { AddPost } from './AddPost';
import { PostsList } from './PostsList';
import { SortBy } from './SortBy';
import {
  loadPosts,
  addFilterByPostsAction,
  getPostsLength,
} from '../../store/actions/postActions';
import { LoadingIndicator } from 'components/LoadingIndicator';
import { FilterByPosts, Post, SortByOptions } from 'types';
import { useAppDispatch } from 'hooks/useAppDispatch';

export const Posts: React.FC = () => {
  const dispatch = useAppDispatch();

  const posts = useSelector((state: any) => state.postModule);
  useEffect(() => {
    dispatch(loadPosts()); // Fetch posts from the mock service
    dispatch(getPostsLength()); // Get the total number of posts
  }, [dispatch]);

  const onSetSort = (value: SortByOptions) => {
    const filterBy: FilterByPosts = {
      sortBy: value,
    };
    dispatch(addFilterByPostsAction(filterBy)); // Add filtering options
    dispatch(loadPosts());
    dispatch(getPostsLength());
  };

  if (!posts)
    return (
      <section className="posts">
        <LoadingIndicator />
      </section>
    );

  return (
    <section className="posts">
      <AddPost />
      <SortBy onSetSort={onSetSort} />
      <PostsList postsList={posts} />
    </section>
  );
};

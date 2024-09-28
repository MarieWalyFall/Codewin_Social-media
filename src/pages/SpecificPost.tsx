import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { PostPreview } from '../components/posts/post-preview/PostPreview';
import {
  getPostsLength,
  loadPosts,
  setCurrPageAction as setCurrPage,
  setFilterByPosts,
} from 'store/actions/postActions';
import { FilterByPosts, Post } from 'types';
import { useAppDispatch } from 'hooks/useAppDispatch';

const SpecificPost: React.FC = () => {
  const dispatch = useAppDispatch();
  const params = useParams<{ postId: string }>(); // Type params
  const { posts } = useSelector((state: any) => state.postModule); // Adjust to your state type

  useEffect(() => {
    dispatch(setCurrPage('feed'));
    const filterBy: FilterByPosts = {
      authorId: params.postId,
    };
    dispatch(setFilterByPosts(filterBy));
    dispatch(loadPosts(filterBy));
    dispatch(getPostsLength());

    return () => {
      dispatch(setFilterByPosts({}));
    };
  }, [dispatch, params.postId]);

  if (!posts) return <div className="specific-post">Loading...</div>;

  return (
    <section className="specific-post">
      {posts.map((post: Post) => (
        <PostPreview key={post.id} post={post} />
      ))}
    </section>
  );
};

export default SpecificPost;

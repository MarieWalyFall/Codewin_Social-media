import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { PostPreview } from '../components/posts/post-preview/PostPreview';
import {
  getPostsLength,
  loadPosts,
  setCurrPage,
  setFilterByPosts,
} from 'store/actions/postActions';
import { Post } from 'types';

const SpecificPost: React.FC = () => {
  const dispatch = useDispatch();
  const params = useParams<{ postId: string }>(); // Type params
  const { posts } = useSelector((state: any) => state.postModule); // Adjust to your state type

  useEffect(() => {
    dispatch(setCurrPage(null));
    const filterBy = {
      id: params.postId,
    };
    dispatch(setFilterByPosts(filterBy));
    dispatch(loadPosts());
    dispatch(getPostsLength());

    return () => {
      dispatch(setFilterByPosts(null));
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

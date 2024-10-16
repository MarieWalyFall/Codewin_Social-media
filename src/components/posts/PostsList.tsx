import { PostPreview } from './post-preview/components/PostPreview';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  addPosts,
  addFilterByPostsAction,
  setNextPage,
} from '../../store/actions/postActions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FilterByPosts, Post } from 'types';
import { useAppDispatch } from 'hooks/useAppDispatch';
import Loader from 'pages/Loader';
import { StyledPostsList } from './style/StyledPosts';

interface PostListProps {
  postsList: Post[];
}
interface PostModuleState {
  posts: Post[];
  pageNumber: number;
  isPostsLoading: boolean;
  postsLength: number;
}

export const PostsList: React.FC<PostListProps> = ({ postsList }) => {
  const dispatch = useAppDispatch();
  const params = useParams();

  const { posts, pageNumber, isPostsLoading, postsLength } = useSelector(
    (state: { postModule: PostModuleState }) => state.postModule
  );
  const onLoadNextPage = () => {
    const filterBy: FilterByPosts = {
      page: 0,
    };
    if (!postsLength && !posts) return;
    if (postsLength === posts.length) return;
    dispatch(addFilterByPostsAction(filterBy));
    dispatch(addPosts());
    dispatch(setNextPage(String(filterBy.page) ?? 0));
  };

  const handleScroll = () => {
    if (posts.length >= postsLength) return;
    if (
      window.scrollY + window.innerHeight + 0.9 >=
      document.documentElement.scrollHeight
    ) {
      onLoadNextPage();
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [postsLength]);

  if (posts.length === 0) return <Loader />;

  return (
    <StyledPostsList className="posts-list">
      {posts.map((post) => (
        <PostPreview key={post.id} post={post} />
      ))}
      <div onClick={onLoadNextPage} className="load-more">
        {!isPostsLoading && posts.length < postsLength && (
          <p className="load-btn">
            <span>Icon</span>
          </p>
        )}
        {isPostsLoading && posts.length < postsLength && (
          <span className="gif-container">loading...</span>
        )}
        {posts.length === postsLength && <p>This is the end..</p>}
      </div>
    </StyledPostsList>
  );
};

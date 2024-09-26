import { PostPreview } from './post-preview/PostPreview';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { addPosts, addFilterByPosts, setNextPage } from '../../store/actions/postActions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Post } from 'types';


interface PostsList {
  posts: Post[];
  length: number;
}
interface PostModuleState {
  posts: PostsList;
  pageNumber: number;
  isPostsLoading: boolean;
  postsLength: number;
}

export const PostsList: React.FC<PostsList> = () => {
  const dispatch = useDispatch();
  const params = useParams();
  
  const { posts, pageNumber, isPostsLoading, postsLength } = useSelector((state: { postModule: PostModuleState }) => state.postModule);

  const onLoadNextPage = () => {
    const filterBy = {
      pageNumber,
      id,
    };
    if (!postsLength && !posts) return;
    if (postsLength === posts.length) return;
    dispatch(addFilterByPosts(filterBy));
    dispatch(addPosts());
    dispatch(setNextPage());
  };

  const handleScroll = () => {
    if (posts.length >= postsLength) return;
    if (window.scrollY + window.innerHeight + 0.9 >= document.documentElement.scrollHeight) {
      onLoadNextPage();
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [postsLength]);

  if (!posts)
    return (
      <div className="posts-list">
        <span className="gif-container">
         loading...
        </span>
      </div>
    );

  return (
    <section className="posts-list">
      {posts.posts.map((post) => (
        <PostPreview key={post.id} post={post} />
      ))}
      <div onClick={onLoadNextPage} className="load-more">
        {!isPostsLoading && posts.length < postsLength && (
          <p className="load-btn">
            <span>
              Icon
            </span>
          </p>
        )}
        {isPostsLoading && posts.length < postsLength && (
          <span className="gif-container">
           loading...
          </span>
        )}
        {posts.length === postsLength && <p>This is the end..</p>}
      </div>
    </section>
  );
};

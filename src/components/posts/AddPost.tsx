import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch, useSelector } from 'react-redux';
import { CreatePostModal } from './CreatePostModal';
import { useState } from 'react';
import { savePost } from '../../store/actions/postActions';

interface RootState {
  userModule: {
    loggedInUser: {
      id: string;
      fullname: string;
      imgUrl: string;
    };
  };
}

export const AddPost: React.FC = () => {
  const dispatch = useDispatch();
  const { loggedInUser } = useSelector((state: RootState) => state.userModule);

  const [isShowCreatePost, setIsShowCreatePost] = useState<boolean>(false);

  const toggleShowCreatePost = () => {
    setIsShowCreatePost((prev) => !prev);
  };

  const onAddPost = (post: any) => { // Define a specific type instead of 'any' based on your post structure
    const postToAdd = {
      ...post,
      userId: loggedInUser.id,
      fullname: loggedInUser.fullname,
    };
    dispatch(savePost(postToAdd)).then(() => toggleShowCreatePost());
  };

  return (
    <section className="add-post" onClick={toggleShowCreatePost}>
      <section className="top">
        <div className="img-container">
          <img src={loggedInUser.imgUrl} alt="" className="icon" />
        </div>
        <button className="input-container">
          <span>Start a post</span>
        </button>
      </section>

      <section className="btns-container">
        <button>
          Icon
          <span>Photo</span>
        </button>
        <button>
          Icon
          <span>Video</span>
        </button>
        <button>
          Icon
          <span>Event</span>
        </button>
        <button>
         Icon
          <span>Write article</span>
        </button>
      </section>
      {
        <CreatePostModal
          isShowCreatePost={isShowCreatePost}
          toggleShowCreatePost={toggleShowCreatePost}
          onAddPost={onAddPost}
          loggedInUser={loggedInUser}
        />
      }
    </section>
  );
};

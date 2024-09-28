import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch, useSelector } from 'react-redux';
import { CreatePostModal } from './CreatePostModal';
import { useState } from 'react';
import { savePost } from '../../store/actions/postActions';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { FaCalendar, FaCamera, FaFilm, FaPen } from 'react-icons/fa';

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
  const dispatch = useAppDispatch();
  const { loggedInUser } = useSelector((state: RootState) => state.userModule);

  const [isShowCreatePost, setIsShowCreatePost] = useState<boolean>(false);

  const toggleShowCreatePost = () => {
    setIsShowCreatePost((prev) => !prev);
  };

  const onAddPost = (post: any) => {
    // Define a specific type instead of 'any' based on your post structure
    const postToAdd = {
      ...post,
      userId: loggedInUser.id,
      fullname: loggedInUser.fullname,
    };
    console.log(postToAdd);
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
          <FaCamera />
          <span>Photo</span>
        </button>
        <button>
          <FaFilm />
          <span>Video</span>
        </button>
        <button>
          <FaCalendar />
          <span>Event</span>
        </button>
        <button>
          <FaPen />
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

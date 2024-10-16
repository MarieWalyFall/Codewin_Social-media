import { useSelector } from 'react-redux';
import { CreatePostModal } from './CreatePostModal';
import { useState } from 'react';
import { savePost } from '../../store/actions/postActions';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { FaCalendarAlt, FaCamera, FaFilm, FaNewspaper } from 'react-icons/fa';
import { StyledAddPosts } from './style/StyledPosts';

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
    <StyledAddPosts className="add-post" onClick={toggleShowCreatePost}>
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
          <FaCamera className="photo icon" />
          <span>Photo</span>
        </button>
        <button>
          <FaFilm className="video icon" />
          <span>Video</span>
        </button>
        <button>
          <FaCalendarAlt className="calendar icon" />
          <span>Event</span>
        </button>
        <button>
          <FaNewspaper className="newspaper icon" />
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
    </StyledAddPosts>
  );
};

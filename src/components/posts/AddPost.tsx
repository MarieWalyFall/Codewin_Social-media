import { useSelector } from 'react-redux';
import { useState } from 'react';
import { savePost } from '../../store/actions/postActions';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { FcStackOfPhotos } from 'react-icons/fc';
import { MdOutlineSlowMotionVideo } from 'react-icons/md';
import { BsFillCalendarEventFill } from 'react-icons/bs';
import { PiArticleNyTimesFill } from 'react-icons/pi';
import { StyledAddPosts } from './style/StyledPosts';
import { PostInputContainer } from './PostInputContainer'; // Import the new InputContainer component

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

  const [postType, setPostType] = useState<'default' | 'event' | 'article'>(
    'default'
  );
  const [postContent, setPostContent] = useState<
    string | Record<string, string>
  >('');
  const [photoImports, setPhotoImports] = useState<File[]>([]);
  const [videoImports, setVideoImports] = useState<File[]>([]);

  const togglePostType = (type: 'default' | 'event' | 'article') => {
    setPostType(type);
    setPostContent(''); // Reset content when changing post type
  };

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: 'photo' | 'video'
  ) => {
    const files = e.target.files;
    if (files) {
      const fileArray = Array.from(files);
      if (type === 'photo') {
        setPhotoImports((prev) => [...prev, ...fileArray]);
      } else {
        setVideoImports((prev) => [...prev, ...fileArray]);
      }
    }
  };

  const handleFileDelete = (type: 'photo' | 'video', index: number) => {
    if (type === 'photo') {
      setPhotoImports((prev) => prev.filter((_, i) => i !== index));
    } else {
      setVideoImports((prev) => prev.filter((_, i) => i !== index));
    }
  };

  const onAddPost = () => {
    if (
      !postContent ||
      (typeof postContent === 'string' && !postContent.trim())
    ) {
      alert('Post content cannot be empty!');
      return;
    }

    const postToAdd = {
      body: typeof postContent === 'string' ? postContent : postContent.body,
      type: postType,
      userId: loggedInUser.id,
      fullname: loggedInUser.fullname,
      photos: photoImports,
      videos: videoImports,
    };

    console.log(postToAdd); // Debugging line
    dispatch(savePost(postToAdd)).then(() => setPostContent(''));
  };

  return (
    <StyledAddPosts className="add-post">
      <section className="top">
        {/* Post Type Selector */}
        <div className="post-type-selector">
          <button
            className={postType === 'default' ? 'active' : ''}
            onClick={() => togglePostType('default')}
          >
            Post
          </button>
          <button
            className={postType === 'event' ? 'active' : ''}
            onClick={() => togglePostType('event')}
          >
            Event
          </button>
          <button
            className={postType === 'article' ? 'active' : ''}
            onClick={() => togglePostType('article')}
          >
            Article
          </button>
        </div>

        <PostInputContainer
          postType={postType}
          postContent={postContent}
          setPostContent={setPostContent}
        />
      </section>

      {/* File Upload Section */}
      <section className="file-upload-container">
        <div className="photo-upload">
          <label>
            <FcStackOfPhotos className="icon" />
            <span>Upload Photo</span>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={(e) => handleFileChange(e, 'photo')}
            />
          </label>
          {photoImports.length > 0 && (
            <div className="file-list">
              {photoImports.map((file, index) => (
                <div key={index} className="file-item">
                  <span>{file.name}</span>
                  <button onClick={() => handleFileDelete('photo', index)}>
                    Delete
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="video-upload">
          <label>
            <MdOutlineSlowMotionVideo className="icon" />
            <span>Upload Video</span>
            <input
              type="file"
              accept="video/*"
              multiple
              onChange={(e) => handleFileChange(e, 'video')}
            />
          </label>
          {videoImports.length > 0 && (
            <div className="file-list">
              {videoImports.map((file, index) => (
                <div key={index} className="file-item">
                  <span>{file.name}</span>
                  <button onClick={() => handleFileDelete('video', index)}>
                    Delete
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* New Post Button */}
      <section className="post-btn-container">
        <button
          className="post-btn"
          onClick={onAddPost}
          disabled={
            (typeof postContent === 'string' && !postContent.trim()) ||
            (typeof postContent === 'object' && !postContent.body)
          }
        >
          Post
        </button>
      </section>
    </StyledAddPosts>
  );
};

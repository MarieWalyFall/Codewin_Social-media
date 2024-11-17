import { useEffect, useState } from 'react';
import { uploadImg, uploadVid } from '../../services/imgUpload.service';
import { LoggedInUser } from 'types'; // Import your type definition
import {
  FaCamera,
  FaFilm,
  FaExternalLinkAlt,
  FaCheckCircle,
} from 'react-icons/fa';
import { IoIosClose } from 'react-icons/io';
import { StyledCreatePostModal } from './style/StyledPosts';

interface CreatePostModalProps {
  toggleShowCreatePost: (type?: any) => void;
  onAddPost: (post: any) => void;
  isShowCreatePost: boolean;
  loggedInUser: LoggedInUser | null;
  postContent?: string;
  postType: 'default' | 'photo' | 'video' | 'event' | 'article';
  setPostContent: (postContent: string) => void;
}

export const CreatePostModal: React.FC<CreatePostModalProps> = ({
  toggleShowCreatePost,
  onAddPost,
  isShowCreatePost,
  loggedInUser,
  postType,
  postContent,
  setPostContent,
}) => {
  const initPost = {
    body: postContent,
    imgBodyUrl: null,
    videoBodyUrl: null,
    link: '',
    title: '',
    location: '',
    date: '',
    description: '',
    relatedLinks: '',
    style: {
      textAlign: 'ltr',
    },
  };

  const [newPost, setNewPost] = useState(initPost);
  const [isUploading, setIsUploading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const field = e.target.name;
    const value = e.target.value;
    setNewPost((prevPost) => ({
      ...prevPost,
      [field]: value,
    }));
    setPostContent(value);
  };

  useEffect(() => {
    return () => {
      setNewPost(initPost);
    };
  }, []);

  const doSubmit = () => {
    onAddPost(newPost);
    toggleShowCreatePost();
  };

  const onUploadImg = async (ev: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setIsUploading(true);
      const res = await uploadImg(ev);
      setIsUploading(false);
      setNewPost((prev) => ({
        ...prev,
        imgBodyUrl: res.url,
      }));
    } catch (err) {
      setIsUploading(false);
      console.error(err);
    }
  };

  const onUploadVideo = async (ev: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setIsUploading(true);
      const res = await uploadVid(ev);
      setIsUploading(false);
      setNewPost((prev) => ({
        ...prev,
        videoBodyUrl: res.url,
      }));
    } catch (err) {
      setIsUploading(false);
      console.error(err);
    }
  };

  const renderDefaultContent = () => (
    <>
      <textarea
        required
        onChange={handleChange}
        id="body"
        name="body"
        value={newPost.body}
        placeholder="What do you want to talk about?"
      />
    </>
  );

  const renderEventContent = () => (
    <>
      <input
        required
        type="text"
        name="location"
        placeholder="Location"
        value={newPost.location}
        onChange={handleChange}
      />
      <input
        required
        type="date"
        name="date"
        placeholder="Date"
        value={newPost.date}
        onChange={handleChange}
      />
      <textarea
        required
        name="description"
        placeholder="Description"
        value={newPost.description}
        onChange={handleChange}
      />
      <input
        type="text"
        name="relatedLinks"
        placeholder="Related Links"
        value={newPost.relatedLinks}
        onChange={handleChange}
      />
    </>
  );

  const renderArticleContent = () => (
    <>
      <input
        required
        type="text"
        name="title"
        placeholder="Title"
        value={newPost.title}
        onChange={handleChange}
      />
      <div className="add-cover-btn btn">
        <label htmlFor="cover" className="add-cover-container">
          <input
            onChange={onUploadImg}
            id="cover"
            type="file"
            name="cover"
            accept="image/*"
            hidden
          />
          <p>Add Cover</p>
        </label>
      </div>
      <textarea
        required
        name="body"
        placeholder="Write your article..."
        value={newPost.body}
        onChange={handleChange}
      />
      <div className="additional-buttons">
        <button type="button" className="btn">
          <FaExternalLinkAlt /> Open in new tab
        </button>
        <button type="button" className="btn">
          <FaCheckCircle /> Add validator
        </button>
      </div>
    </>
  );

  const renderContent = () => {
    switch (postType) {
      case 'photo':
        document.getElementById('imgUrl')?.click();
        return null;
      case 'video':
        document.getElementById('videoUrl')?.click();
        return null;
      case 'event':
        return renderEventContent();
      case 'article':
        return renderArticleContent();
      default:
        return renderDefaultContent();
    }
  };

  return (
    <StyledCreatePostModal
      className={
        isShowCreatePost ? 'create-post-modal' : 'hide create-post-modal'
      }
      onClick={(ev) => {
        ev.stopPropagation();
        toggleShowCreatePost();
      }}
    >
      <form
        className={`container ${postType === 'article' ? 'large-modal' : ''}`}
        onSubmit={(ev) => {
          ev.preventDefault();
          doSubmit();
        }}
        onClick={(ev) => ev.stopPropagation()}
      >
        <div className="title">
          <h1>
            {postType === 'default' ? 'Create a post' : `Create a ${postType}`}
          </h1>
          <span className="close-icon" onClick={toggleShowCreatePost}>
            <IoIosClose />
          </span>
        </div>

        <div className="name-container">
          <div className="img-container">
            <img src={loggedInUser?.imgUrl} alt="" className="img-profile" />
          </div>
          <div className="name">
            <h2>{loggedInUser?.fullname}</h2>
          </div>
        </div>

        <div className="content-container">{renderContent()}</div>

        <div className="btns-add-container">
          <button
            type="button"
            className="cancel-btn btn"
            onClick={toggleShowCreatePost}
          >
            Cancel
          </button>
          <button className="post-btn btn" type="submit" disabled={isUploading}>
            {isUploading ? 'Uploading...' : 'Post'}
          </button>
        </div>
      </form>
    </StyledCreatePostModal>
  );
};

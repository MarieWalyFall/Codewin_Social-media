import React from 'react';
import { Post } from 'types';
import { StyledPostBody } from '../style/StyledPostPreview';

interface PostBodyProps extends Partial<Post> {}

export const PostBody: React.FC<PostBodyProps> = ({
  body,
  imgBodyUrl,
  videoBodyUrl,
  toggleShowImgPreview,
  link,
  title,
}) => {
  return (
    <StyledPostBody className="post-body">
      <div className="title">
        <h1>{title}</h1>
      </div>
      <div className="post-text">
        <p>{body}</p>
      </div>
      <div className="link">
        {link && (
          <a href={link} target="_blank" rel="noreferrer">
            <span className="the-link">{link}</span>
          </a>
        )}
      </div>
      <div className="img-container" onClick={toggleShowImgPreview}>
        {imgBodyUrl && <img src={imgBodyUrl} alt="" />}
      </div>
      <div className="video-container">
        {videoBodyUrl && (
          <video width="100%" height="300" controls>
            <source src={videoBodyUrl} type="video/mp4" />
          </video>
        )}
      </div>
    </StyledPostBody>
  );
};

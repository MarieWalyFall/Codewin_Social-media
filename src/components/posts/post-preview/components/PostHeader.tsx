import React from 'react';
import TimeAgo from 'react-timeago';
import { Link, useNavigate } from 'react-router-dom';
import { Post, User } from 'types';
import { LoadingIndicator } from 'components/LoadingIndicator';

import { FaLocationDot } from 'react-icons/fa6';
import { StyledPostHeader } from '../style/StyledPostPreview';

interface PostHeaderProps {
  post: Partial<Post>;
  userPost: Partial<User> | null;
}

export const PostHeader: React.FC<PostHeaderProps> = ({ post, userPost }) => {
  const navigate = useNavigate();

  if (!userPost)
    return (
      <section className="post-header">
        <LoadingIndicator />
      </section>
    );

  const { imgUrl, profession, name } = userPost;

  return (
    <StyledPostHeader className="post-header">
      <div
        className="img-actor"
        onClick={() => navigate(`/profile/${userPost.id}`)}
      >
        <img src={imgUrl} className="img" alt="User Profile" />
      </div>

      <div className="details">
        <Link to={`/profile/${userPost.id}`}>
          <div className="name">
            <h3>{name}</h3>
          </div>
        </Link>
        <div
          className="time-and-description-container"
          onClick={() => navigate(`/post/${post.userId}/${post.id}`)}
        >
          <div className="description">
            <p>{profession}</p>
          </div>
          <div className="time">
            {post.createdAt && <TimeAgo date={new Date(post.createdAt)} />}
            <span></span>{' '}
            {post?.position?.lat && post?.position?.lng && (
              <span className="logo-location">
                <FaLocationDot />
              </span>
            )}
          </div>
        </div>
      </div>
    </StyledPostHeader>
  );
};

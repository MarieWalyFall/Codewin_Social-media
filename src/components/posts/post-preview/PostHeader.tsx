import React from 'react';
import TimeAgo from 'react-timeago';
import { Link, useNavigate } from 'react-router-dom';
import { Post, User } from 'types';
import { LoadingIndicator } from 'components/LoadingIndicator';
import { FaLocationArrow } from 'react-icons/fa';
import { FaLocationDot } from 'react-icons/fa6';

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
    <section className="post-header">
      <div
        className="img-actor"
        onClick={() => navigate(`/main/profile/${userPost.id}`)}
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
            <span></span>{' '}
            {post?.position?.lat && post?.position?.lng && (
              <span className="logo-location">
                <FaLocationDot />
              </span>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

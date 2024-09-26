import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import TimeAgo from 'react-timeago';
import { Link, useNavigate } from 'react-router-dom';
import { Post } from 'types';



interface UserPost {
  id: string;
  imgUrl: string;
  profession: string;
  name: string;
}

interface PostHeaderProps {
  post: Partial<Post>;
  userPost: UserPost | null;
}

export const PostHeader: React.FC<PostHeaderProps> = ({ post, userPost }) => {
  const navigate = useNavigate();

  if (!userPost)
    return (
      <section className="post-header">
       Loading
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
        <Link to={`/main/profile/${userPost.id}`}>
          <div className="name">
            <h3>{name}</h3>
          </div>
        </Link>
        <div
          className="time-and-description-container"
          onClick={() => navigate(`/main/post/${post.userId}/${post.id}`)}
        >
          <div className="description">
            <p>{profession}</p>
          </div>
          <div className="time">
            <span>
             
            </span>{' '}
            {post?.position?.lat && post?.position?.lng && (
              <span className="logo-location">
               Icon
              </span>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

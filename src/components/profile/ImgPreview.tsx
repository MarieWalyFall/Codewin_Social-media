import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';
import { userService } from '../../services/user/userService';
import { User } from 'types';

interface ImgPreviewProps {
  toggleShowImg: () => void;
  imgUrl?: string;
  videoUrl?: string;
  title: string;
  post?: {
    userId: string;
    id: string;
    [key: string]: any; // For additional properties
  };
  body?: string;
}

export function ImgPreview({
  toggleShowImg,
  imgUrl,
  videoUrl,
  title,
  post,
  body,
}: ImgPreviewProps) {
  const navigate = useNavigate();

  const [user, setUser] = useState<Partial<User> | null>(null);

  const loadUser = async (userId: string) => {
    const userData = await userService.getById(userId);
    setUser(userData);
  };

  useEffect(() => {
    if (post?.userId) loadUser(post.userId);
  }, [post]);

  return (
    <div className="img-profile-preview">
      <div className="bg" onClick={toggleShowImg}></div>
      <section className="container">
        <div className="title">
          {user && post ? (
            <div
              className="user-details"
              onClick={() => navigate(`/profile/${post.userId}`)}
            >
              <img src={user.imgUrl} alt="" className="img" />
              <p className="fullname">{user.fullname}</p>
            </div>
          ) : (
            post && <p className="user-details">Loading user...</p>
          )}

          <p>{title}</p>

          <span className="logo-close" onClick={toggleShowImg}>
            Icon
          </span>
        </div>

        {body && (
          <div>
            <p className="body">{body}</p>
          </div>
        )}

        {post && (
          <div className="see-post">
            <p onClick={() => navigate(`/post/${post.userId}/${post.id}`)}>
              See original post
            </p>
          </div>
        )}

        <div className="img-container">
          {imgUrl ? (
            <img className="img" src={imgUrl} alt="" />
          ) : (
            videoUrl && (
              <div>
                <video width="100%" height="300" controls>
                  <source src={videoUrl} type="video/mp4" />
                </video>
              </div>
            )
          )}
        </div>
      </section>
    </div>
  );
}

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {Post} from 'types'

interface PostIconMapProps {
  post: Post;
  setPostToPreview: (post: Post) => void;
}

export const PostIconMap: React.FC<PostIconMapProps> = ({ post, setPostToPreview }) => {
  return (
    <section className="post-icon-map">
      <div className="container">
        <div
          className="logo-post-icon-map-container"
          onClick={() => setPostToPreview(post)}
        >
          <span className="img-logo">
            {post.imgBodyUrl ? (
              <img src={post.imgBodyUrl} alt="" className="img" />
            ) : post.videoBodyUrl ? (
              <p>
                <span className="post-logo">
                 Icon
                </span>
              </p>
            ) : (
              <p>
                <span className="post-logo">
                  Icon
                </span>
              </p>
            )}
          </span>
        </div>
      </div>
    </section>
  );
};

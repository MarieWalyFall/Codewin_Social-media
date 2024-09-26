import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Comments } from '../../comments/Comments';
import { PostActions } from './PostActions';
import { PostBody } from './PostBody';
import { PostHeader } from './PostHeader';
import { SocialDetails } from './SocialDetails';
import { useDispatch, useSelector } from 'react-redux';
import { userService } from 'services/user/userService';
import { PostMenu } from './PostMenu';
import { savePost, removePost } from 'store/actions/postActions';
import { saveActivity } from 'store/actions/activityAction';
import { ImgPreview } from 'components/profile/ImgPreview';
import { useParams } from 'react-router-dom';
import { Post, LoggedInUser } from 'types';

interface PostPreviewProps  {
  
  post: Partial<Post> }

interface RootState {
  userModule: 
    {loggedInUser: LoggedInUser}
  ;
}

export const PostPreview: React.FC<PostPreviewProps> = ( {post} ) => {
  const dispatch = useDispatch();
  const params = useParams<{ postId?: string }>();

  const [userPost, setUserPost] = useState<any | null>(null);
  const [isShowComments, setIsShowComments] = useState(false);
  const [isShowMenu, setIsShowMenu] = useState(false);
  const [isShowImgPreview, setIsShowImgPreview] = useState(false);

  const { loggedInUser } = useSelector((state: RootState) => state.userModule);

  useEffect(() => {
    post.userId && loadUserPost(post.userId);
    if (params.postId) setIsShowComments(true);
  }, [loggedInUser, post.userId, params.postId]);

  const toggleMenu = () => {
    setIsShowMenu((prevVal) => !prevVal);
  };

  const toggleShowImgPreview = () => {
    setIsShowImgPreview((prev) => !prev);
  };

  const loadUserPost = async (id: string) => {
    if (!post) return;
    const userPost = await userService.getById(id);
    setUserPost(userPost);
  };

  const onToggleShowComment = () => {
    setIsShowComments((prev) => !prev);
  };

  const onSharePost = async () => {
    const shareData = {
      title: 'Post',
      text: 'A post from Travelsdin',
      url: `/main/post/${post.userId}/${post.id}`,
    };

    try {
      await navigator.share(shareData);
    } catch (err) {
      console.error(`Error: ${err}`);
    }
  };

  const onLikePost = () => {
    const isAlreadyLike = post?.reactions?.some(
      (reaction) => reaction.userId === loggedInUser.id
    );
    if (isAlreadyLike) {
      post.reactions = post?.reactions?.filter(
        (reaction) => reaction.userId !== loggedInUser.id
      );
    } else {
      post?.reactions?.push({
        userId: loggedInUser.id,
        fullname: loggedInUser.fullname,
        reaction: 'like',
      });
    }

    dispatch(savePost(post)).then((savedPost) => {
      if (savedPost?.id === post.id) {
        const newActivity = {
          type: isAlreadyLike ? 'remove-like' : 'add-like',
          createdBy: loggedInUser.id,
          createdTo: post.userId,
          postId: post.id,
        };
        dispatch(saveActivity(newActivity));
      }
    });
  };

  const onRemovePost = () => {
    dispatch(removePost(post.id));
  };

  const copyToClipBoard = () => {
    const postUrl = `https://travelsdin-express-production.up.railway.app/#/main/post/${post.userId}/${post.id}`;
    navigator.clipboard.writeText(postUrl);
    // Uncomment if you want an alert after copying
    // alert('Copied the text: ' + postUrl);
  };

  return (
    <section className="post-preview">
      <div className="menu" onClick={toggleMenu}>
        Icon
      </div>
      <PostHeader post={post} userPost={userPost} />
      <PostBody
        body={post.body}
        imgBodyUrl={post.imgBodyUrl}
        videoBodyUrl={post.videoBodyUrl}
        link={post.link}
        title={post.title}
        toggleShowImgPreview={toggleShowImgPreview}
      />
      <SocialDetails
        comments={post.comments}
        post={post}
        onToggleShowComment={onToggleShowComment}
      />
      <hr />
      <PostActions
        post={post}
        onToggleShowComment={onToggleShowComment}
        onLikePost={onLikePost}
        loggedInUser={loggedInUser}
        onSharePost={onSharePost}
      />

      {isShowComments && (
        <Comments
          comments={post.comments}
          postId={post.id}
          userPostId={post.userId}
        />
      )}

      {isShowMenu && (
        <PostMenu
          toggleMenu={toggleMenu}
          onRemovePost={onRemovePost}
          postUserId={post.userId}
          copyToClipBoard={copyToClipBoard}
        />
      )}

      {isShowImgPreview && (
        <ImgPreview
          toggleShowImg={toggleShowImgPreview}
          imgUrl={post.imgBodyUrl? post.imgBodyUrl: ''}
          title="Image"
        />
      )}
    </section>
  );
};

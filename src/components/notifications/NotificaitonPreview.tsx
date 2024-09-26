import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { userService } from '../../services/user/userService';
import TimeAgo from 'react-timeago';
import { useNavigate } from 'react-router-dom';
import { postService } from '../../services/posts/postService';
import { Activity, User } from 'types';




interface NotificaitonPreviewProps {
  activity: Activity;
}

export const NotificaitonPreview: React.FC<NotificaitonPreviewProps> = ({ activity }) => {
  const navigate = useNavigate();
  const [theNotLoggedUser, setTheNotLoggedUser] = useState<User | null>(null);
  const [str, setStr] = useState<string | null>(null);
  const [link, setLink] = useState<string | null>(null);
  const [createdByUser, setCreatedByUser] = useState<User | null>(null);
  const [createdToUser, setCreatedToUser] = useState<User | null>(null);
  const [isActivityUnread, setIsActivityUnread] = useState<boolean>(false);

  const { loggedInUser } = useSelector((state: any) => state.userModule);
  const { unreadActivities } = useSelector((state: any) => state.activityModule);

  const checkIfActivityUnread = () => {
    return unreadActivities.some((activityId: string) => activityId === activity.id);
  };

  const getTheNotLoggedInUser = async () => {
    const userId = activity.createdBy === loggedInUser.id ? activity.createdTo : activity.createdBy;
    const user = await userService.getById(userId);
    setTheNotLoggedUser(user);
  };

  const getTheCreatedByUser = () => {
    const user = activity.createdBy === loggedInUser.id ? loggedInUser : theNotLoggedUser;
    setCreatedByUser(user);
  };

  const getTheCreatedToUser = () => {
    const user = activity.createdTo === loggedInUser.id ? loggedInUser : theNotLoggedUser;
    setCreatedToUser(user);
  };

  const buildActivityStr = async () => {
    if (!createdByUser || !createdToUser) return;

    if (activity.type === 'add-like' || activity.type === 'remove-like') {
      const post = await postService.getById(activity.postId || '');
      const action = activity.type === 'add-like' ? 'liked' : 'unliked';
      const str = `${createdByUser.id === loggedInUser.id ? 'You' : createdByUser.fullname} ${action} post of ${
        createdToUser.id === loggedInUser.id ? 'you' : createdToUser.fullname
      }`;

      const linkToPost = `post/${post?.userId}/${activity.postId}`;
      setLink(linkToPost);
      setStr(str);
    } else if (activity.type === 'add-comment') {
      const post = await postService.getById(activity.postId || '');
      const str = `${createdByUser.id === loggedInUser.id ? 'You' : createdByUser.fullname} added a comment in your post`;

      const linkToPost = `post/${post?.userId}/${activity.postId}`;
      setLink(linkToPost);
      setStr(str);
    } else if (activity.type === 'private-message') {
      const str = `${createdByUser.fullname} sent you a private message`;
      const linkToPost = `message/`;
      setLink(linkToPost);
      setStr(str);
    }
  };

  useEffect(() => {
    buildActivityStr();
  }, [createdByUser, createdToUser]);

  useEffect(() => {
    getTheCreatedToUser();
    getTheCreatedByUser();
  }, [theNotLoggedUser]);

  useEffect(() => {
    if (!theNotLoggedUser) {
      getTheNotLoggedInUser();
    }

    const isUnread = checkIfActivityUnread();
    setIsActivityUnread(isUnread);
  }, [unreadActivities]);

  return (
    <section
      className={`notificaiton-preview ${isActivityUnread ? 'unread' : ''}`}
      onClick={() => {
        if (link) navigate(link);
      }}
    >
      <div className="img-container">
        {createdByUser?.imgUrl ? (
          <img src={createdByUser.imgUrl} alt="" className="img" />
        ) : (
         "loading..."
        )}
      </div>

      <div className="content">
        <p>{str}</p>
      </div>
      <div className="menu">
        <p>
          <TimeAgo date={activity.createdAt} />
        </p>
      </div>
    </section>
  );
};

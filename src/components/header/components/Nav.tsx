import { GoHomeFill } from 'react-icons/go';
import { BiSolidNetworkChart } from 'react-icons/bi';
import { PiBellSimpleFill } from 'react-icons/pi';
import { IoMdChatbubbles } from 'react-icons/io';
import { useSelector } from 'react-redux';
import { CiLogout } from 'react-icons/ci';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { logout } from 'store/actions/userActions';
import {
  Nav as NavStyled,
  Ul,
  Li,
  LinkStyled,
  MeBtn,
  Logo,
} from '../style/StyledNav';
import { useNavigate } from 'react-router-dom';

export const Nav = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { currPage } = useSelector((state: any) => state.postModule);

  const { loggedInUser } = useSelector((state: any) => state.userModule);
  const { unreadActivities } = useSelector(
    (state: any) => state.activityModule
  );
  const { unreadMessages } = useSelector((state: any) => state.activityModule);

  return (
    <NavStyled>
      <Ul>
        <Li>
          <LinkStyled
            to="/feed"
            className={
              'home' + ' ' + (currPage === 'feed' ? 'current-btn' : '')
            }
          >
            <GoHomeFill className="nav-icon" />
          </LinkStyled>
        </Li>
        <Li>
          <LinkStyled
            to={`/mynetwork`}
            className={
              'mynetwork' +
              ' ' +
              (currPage === 'mynetwork' ? 'current-btn' : '')
            }
          >
            <BiSolidNetworkChart className="nav-icon" />
          </LinkStyled>
        </Li>
        <Li>
          <LinkStyled
            to={`/message`}
            className={
              'messaging' + ' ' + (currPage === 'message' ? 'current-btn' : '')
            }
          >
            <IoMdChatbubbles className="nav-icon" />

            {unreadMessages?.length > 0 && (
              <span className="number">{unreadMessages?.length}</span>
            )}
          </LinkStyled>
        </Li>
        <Li>
          <LinkStyled
            to={`/notifications`}
            className={
              'notifications' +
              ' ' +
              (currPage === 'notifications' ? 'current-btn' : '')
            }
          >
            <PiBellSimpleFill className="nav-icon" />

            {unreadActivities?.length > 0 && (
              <span className="number">{unreadActivities?.length}</span>
            )}
          </LinkStyled>
        </Li>
        <MeBtn
          className={
            'me-btn' + ' ' + (currPage === 'profile' ? 'current-btn' : '')
          }
        >
          <LinkStyled to={`/profile/${loggedInUser?.id}`}>
            <img src={loggedInUser?.imgUrl} alt="" className="profile-icon" />
          </LinkStyled>
        </MeBtn>
        <Li>
          <Logo
            onClick={() => {
              const loggedOut = dispatch(logout());
              navigate('/');
            }}
          >
            <CiLogout />
          </Logo>
        </Li>
      </Ul>
    </NavStyled>
  );
};

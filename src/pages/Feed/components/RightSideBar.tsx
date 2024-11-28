import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getUsers } from '../../../store/actions/userActions';
import { User } from '../../../types'; // Adjust the import path based on your project structure
import { useAppDispatch } from 'hooks/useAppDispatch';
import { StyledRightSideBar } from '../style/StyledRightSideBar';

export const RightSideBar: React.FC = () => {
  const { users }: { users: User[] } = useSelector(
    (state: any) => state.userModule
  ); // Use any for simplicity
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  const lengthConnections = [0, 1, 2]; // Renamed from "lengtConections" to "lengthConnections"

  return (
    <StyledRightSideBar className="right-side-bar">
      <div className="container">
        <div className="title">
          <p>Add to your feed</p>
        </div>
        <br />
        <div className="list">
          {users &&
            lengthConnections.map((num, idx) => (
              <div
                key={users[num]?.id || idx}
                className="preview"
                onClick={() => navigate(`/profile/${users[num]?.id}`)}
              >
                <div className="img-container">
                  <img src={users[num]?.imgUrl} className="img" alt="" />
                </div>
                <div>
                  <div className="name">
                    <p>{users[num]?.name}</p>
                  </div>
                  <div className="profession">
                    <p>{users[num]?.profession}</p>
                  </div>
                  <div className="btn"></div>
                </div>
              </div>
            ))}
        </div>
      </div>
      <div className="else-container">
        <div>
          <h3>Promoted</h3>
        </div>
        <br />
        <div>
          <p>Taskday is a project management system for collaboration.</p>
        </div>
        <br />
        <div className="img-container">
          <a href="https://fast-eyrie-76140.herokuapp.com/">
            <img
              src="https://res.cloudinary.com/duajg3ah1/image/upload/v1660916126/myPortfolio/qdtzolm9ldd5qlquq2aj.png"
              className="img"
              alt=""
            />
          </a>
        </div>
      </div>
    </StyledRightSideBar>
  );
};

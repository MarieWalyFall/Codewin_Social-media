import { useState } from 'react';
import { useSelector } from 'react-redux';
import { login, signup, logout } from '../store/actions/userActions';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { ReactComponent as Logo } from 'assets/imgs/Logo.svg';
import styled from 'styled-components';

const LogoStyle = styled(Logo)`
  width: 40px;
  height: 40px;
  cursor: pointer;
`;
export const Signup = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [signin, setIsSignin] = useState(true);
  const [cred, setCred] = useState({
    username: '',
    password: '',
    name: '',
  });

  const { loggedInUser } = useSelector((state: any) => state.userModule);

  // Typing the event parameter
  const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const { target } = event; // Destructuring target from the event
    const field = target.name;
    let value = target.type === 'number' ? +target.value || '' : target.value;
    setCred((prevCred) => ({ ...prevCred, [field]: value }));
  };

  const cleanFields = () =>
    setCred(() => ({ username: '', password: '', name: '' }));

  const doLogin = async () => {
    dispatch(login(cred)).then((user) => {
      if (user) navigate('/feed');
    });
    cleanFields();
  };

  const doLogout = async () => {
    dispatch(logout());
    cleanFields();
  };

  const doSignup = async () => {
    dispatch(signup(cred)).then((user) => {
      if (user) navigate('/feed');
    });
    cleanFields();
  };

  const doSubmit = () => {
    if (signin) doLogin();
    else {
      doSignup();
    }
  };

  const toggle = () => {
    setIsSignin((prevVal) => !prevVal);
  };

  if (loggedInUser) {
    return (
      <section className="sign-up-page">
        <div className="logged-in-mode">
          <div className="img-container">
            <img src={loggedInUser.imgUrl} alt="" className="img" />
          </div>
          <p>{loggedInUser.name}</p>
          <button onClick={doLogout}>Logout</button>
        </div>
      </section>
    );
  }

  return (
    <section className="sign-up-page">
      <header className="home-header">
        <div>
          <div className="home-logo">
            <LogoStyle />
          </div>
        </div>
      </header>

      <div className="form-container">
        <form
          onSubmit={(ev) => {
            ev.preventDefault();
            doSubmit();
          }}
        >
          <h1>{signin ? 'Sign in' : 'Sign up'}</h1>
          <p>Stay updated with your amazing community</p>
          {!signin && (
            <input
              required
              onChange={handleChange}
              type="text"
              placeholder="Fullname"
              id="name"
              name="name"
              value={cred.name}
            />
          )}
          <input
            onChange={handleChange}
            type="text"
            id="username"
            name="username"
            value={cred.username}
            placeholder="Username"
            required
          />
          <input
            onChange={handleChange}
            type="password"
            id="password"
            name="password"
            value={cred.password}
            placeholder="Password"
            required
          />
          <a href=" ">Forgot password?</a>

          <button className="sign-in-btn">
            {signin ? 'Sign in' : 'Sign up'}
          </button>
        </form>
        <div className="to-sign-up-container">
          <p>
            <a
              href=" "
              onClick={(ev) => {
                ev.preventDefault();
                toggle();
              }}
            >
              {signin
                ? ' New to Travelsdin? Join now'
                : 'Already on Travelsdin? Sign in'}
            </a>
          </p>
        </div>
      </div>
    </section>
  );
};

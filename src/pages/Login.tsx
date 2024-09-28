import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { LoadingIndicator } from 'components/LoadingIndicator';
import { login } from 'store/actions/userActions'; // Ensure the correct path to your action
import { AppDispatch } from '../store'; // Adjust this import based on your store structure
import Button from 'components/Button';
import { ReactComponent as Logo } from 'assets/imgs/Logo.svg';
import styled from 'styled-components';

const LogoStyle = styled(Logo)`
  width: 40px;
  height: 40px;
  cursor: pointer;
`;
export const Login: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>(); // Use AppDispatch if you have defined it

  // Local state for credentials and message
  const [creds, setCreds] = useState({
    username: 'guest123',
    password: '1234',
  });
  const [msg, setMsg] = useState<string>('');
  const [isLoggingLoading, setIsLoggingLoading] = useState<boolean>(false);
  const { loggedInUser } = useSelector((state: any) => state.userModule);

  // Show message for 3 seconds
  const showMsg = (txt: string) => {
    setMsg(txt);
    setTimeout(() => setMsg(''), 3000);
  };

  // Handle input change
  const handleChange = (ev: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = ev.target;
    setCreds((prevCreds) => ({ ...prevCreds, [name]: value }));
  };

  // Handle login form submission
  const handleLogin = async (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    setIsLoggingLoading(true);

    try {
      // Dispatch the login action with correct username and password
      const response = await dispatch(
        login({
          username: creds.username, // Send the username from creds
          password: creds.password, // Placeholder values; adjust as necessary
        })
      );
      // Assuming response can indicate success/failure
      if (response) {
        // Optionally handle successful login response here
        navigate('/feed');
      }
    } catch (err: any) {
      showMsg('Error: ' + err.message);
      console.error(err);
    } finally {
      setIsLoggingLoading(false);
    }
  };

  return (
    <section className="home-page">
      <header className="home-header">
        <div>
          <div className="home-logo">
            <LogoStyle />
          </div>
        </div>
        <nav className="home-nav">
          <ul>
            <li>
              <button
                className="join-now-btn"
                onClick={() => navigate(`/signup`)}
              >
                <span>Join now</span>
              </button>
            </li>
            <li>
              <button
                className="sign-in-btn"
                onClick={() => navigate(`/signup`)}
              >
                <span>Sign in</span>
              </button>
            </li>
          </ul>
        </nav>
      </header>

      <div className="welcome-signin-container">
        <form onSubmit={handleLogin} className="form">
          <h1 className="title">Connection</h1>
          <input
            onChange={handleChange}
            type="text"
            id="username"
            name="username"
            value={creds.username}
            placeholder="Email or phone number"
            required
          />
          <input
            onChange={handleChange}
            type="password"
            id="password"
            name="password"
            value={creds.password}
            placeholder="Password"
            required
          />

          <div className="msg">
            <p>{msg}</p>
          </div>
          <div>
            <Button>Se connecter </Button>
          </div>
          <a onClick={() => navigate(`/signup`)}>S'inscrire</a>
        </form>
      </div>

      {isLoggingLoading && <LoadingIndicator />}
    </section>
  );
};

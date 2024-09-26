import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from 'hooks/useAuth'; // Import useAuth hook for authentication
import { LoadingIndicator } from 'components/LoadingIndicator';

export const Home: React.FC = () => {
  const { login, auth } = useAuth(); // useAuth provides access to login function and auth state
  const navigate = useNavigate();

  // Local state for credentials and message
  const [creds, setCreds] = useState({
    username: 'guest123',
    password: '1234',
  });
  const [msg, setMsg] = useState<string>('');
  const [isLoggingLoading, setIsLoggingLoading] = useState<boolean>(false);

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
      // Here, login is called from useAuth
      await login({
        profile: { username: creds.username },
        access_token: '',
        refresh_token: '',
        expiration_time: 0,
      });
      setCreds({ username: '', password: '' });
      navigate('/main/feed');
    } catch (err) {
      showMsg('Something went wrong...');
      console.error(err);
    } finally {
      setIsLoggingLoading(false);
    }
  };

  return (
    <section className="home-page">
      <header className="home-header">
        <div>
          <div className="home-logo">T</div>
        </div>
        <nav className="home-nav">
          <ul>
            <li>
              <button className="join-now-btn" onClick={() => navigate(`/signup`)}>
                <span>Join now</span>
              </button>
            </li>
            <li>
              <button className="sign-in-btn" onClick={() => navigate(`/signup`)}>
                <span>Sign in</span>
              </button>
            </li>
          </ul>
        </nav>
      </header>

      <div className="welcome-signin-container">
        <form onSubmit={handleLogin} className="form">
          <h1 className="title">
            Welcome to your <br /> traveler's community
          </h1>
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

          <a onClick={() => navigate(`/signup`)}>Or sign-up</a>
          <div>
            <button>Sign in</button>
          </div>
        </form>
      </div>

      {isLoggingLoading && (
       <LoadingIndicator/>
      )}
    </section>
  );
};

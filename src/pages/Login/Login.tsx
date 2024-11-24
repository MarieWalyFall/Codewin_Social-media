import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { LoadingIndicator } from 'components/LoadingIndicator';
import { login } from 'store/actions/userActions';
import { AppDispatch } from '../../store';
import {
  PageContainer,
  LoginBox,
  LeftPanel,
  StyledLogo,
  RightPanel,
  Form,
} from './StyledLogin';
export const Login: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const [creds, setCreds] = useState({
    username: 'guest123',
    password: '1234',
  });
  const [msg, setMsg] = useState<string>('');
  const [isLoggingLoading, setIsLoggingLoading] = useState<boolean>(false);

  const { loggedInUser } = useSelector((state: any) => state.userModule);

  const showMsg = (txt: string) => {
    setMsg(txt);
    setTimeout(() => setMsg(''), 3000);
  };

  const handleChange = (ev: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = ev.target;
    setCreds((prevCreds) => ({ ...prevCreds, [name]: value }));
  };

  const handleLogin = async (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    setIsLoggingLoading(true);

    try {
      const response = await dispatch(
        login({
          username: creds.username,
          password: creds.password,
        })
      );

      if (response) {
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
    <PageContainer>
      <LoginBox>
        <LeftPanel>
          <StyledLogo />
          <h1>Doorwaar</h1>
          <p>Jotali, Motali</p>
          <button onClick={() => navigate('/signup')}>Créer un compte</button>
        </LeftPanel>
        <RightPanel>
          <Form onSubmit={handleLogin}>
            <h1>Se connecter</h1>
            <input
              type="text"
              name="username"
              value={creds.username}
              onChange={handleChange}
              placeholder="Nom d’utilisateur"
              required
            />
            <input
              type="password"
              name="password"
              value={creds.password}
              onChange={handleChange}
              placeholder="Mot de passe"
              required
            />
            {msg && <div className="msg">{msg}</div>}
            <button type="submit">
              {isLoggingLoading ? 'Loading...' : 'Se connecter'}
            </button>
            <a href="#" onClick={() => navigate('/forgot-password')}>
              Mot de passe oublié
            </a>
          </Form>
        </RightPanel>
      </LoginBox>
    </PageContainer>
  );
};

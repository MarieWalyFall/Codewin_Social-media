import { ReactComponent as Logo } from 'assets/imgs/Logo.svg';
import { InputFilter } from './InputFilter';
import { Nav } from './Nav';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { CiLogout } from 'react-icons/ci';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { logout } from 'store/actions/userActions';
const LogoStyle = styled(Logo)`
  width: 40px;
  height: 40px;
  cursor: pointer;
`;
const HeaderStyled = styled.header`
  display: flex;
  width: 100%;
  justify-content: space-between;
  gap: 20px;
`;
const LogoutStyled = styled.div`
  cursor: pointer;
`;
export function Header() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  return (
    <header className="header">
      <HeaderStyled className="container">
        <LogoStyle className="logo" onClick={() => navigate('/')} />
        <InputFilter />
        <Nav />
        <LogoutStyled
          onClick={() => {
            const loggedOut = dispatch(logout());
            navigate('/');
          }}
        >
          <CiLogout />
        </LogoutStyled>
      </HeaderStyled>
    </header>
  );
}

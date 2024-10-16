import { InputFilter } from './InputFilter';
import { Nav } from './Nav';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { CiLogout } from 'react-icons/ci';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { logout } from 'store/actions/userActions';
import { Logo, HeaderContent } from '../style/StyledHeader';
import { ReactComponent as MainLogo } from 'assets/imgs/Logo.svg';

export function Header() {
  const navigate = useNavigate();

  return (
    <HeaderContent>
      <Logo className="logo" onClick={() => navigate('/')}>
        <MainLogo />
      </Logo>

      <Nav />
    </HeaderContent>
  );
}

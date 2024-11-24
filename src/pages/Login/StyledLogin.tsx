import styled from 'styled-components';
import { ReactComponent as Logo } from 'assets/imgs/Logo.svg';
export const PageContainer = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f5f5f5;
`;

export const LoginBox = styled.div`
  display: flex;
  flex-direction: row;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  max-width: 900px;
  width: 100%;
`;

export const LeftPanel = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  background-color: #f5f5f5;
  flex: 1;

  h1 {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 1rem;
  }

  button {
    margin-top: 1.5rem;
    padding: 10px 20px;
    font-size: 16px;
    color: white;
    background-color: #00a676;
    border: none;
    border-radius: 5px;
    cursor: pointer;

    &:hover {
      background-color: #008f5f;
    }
  }
`;

export const RightPanel = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2rem;
  flex: 1;
`;

export const StyledLogo = styled(Logo)`
  width: 50px;
  height: 50px;
  margin-bottom: 1rem;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;

  h1 {
    font-size: 22px;
    margin-bottom: 1.5rem;
  }

  input {
    padding: 12px 16px;
    margin-bottom: 1rem;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 6px;

    &:focus {
      outline: none;
      border-color: #00a676;
    }
  }

  button {
    padding: 12px;
    font-size: 16px;
    color: white;
    background-color: #00a676;
    border: none;
    border-radius: 6px;
    cursor: pointer;

    &:hover {
      background-color: #008f5f;
    }
  }

  a {
    margin-top: 1rem;
    color: #00a676;
    text-decoration: none;
    font-size: 14px;

    &:hover {
      text-decoration: underline;
    }
  }

  .msg {
    color: red;
    font-size: 14px;
    margin-bottom: 1rem;
  }
`;

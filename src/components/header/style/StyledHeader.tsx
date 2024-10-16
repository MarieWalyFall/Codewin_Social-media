import styled from 'styled-components';

// Header component with media queries
export const HeaderContent = styled.header`
  background-color: rgb(71, 71, 175);
  position: fixed;
  top: 0;
  left: 0;
  height: 50px;
  width: 100%;
  z-index: 100;
  border-bottom: 1px solid #00000014;
  padding: 10px 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  box-sizing: border-box;

  @media (max-width: 945px) {
    padding: 0 10px;
  }
`;

// Logo inside the header
export const Logo = styled.div`
  cursor: pointer;
  width: 40px;
  @media (max-width: 945px) {
    display: none;
  }
`;

// Header actions section

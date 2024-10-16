import styled from 'styled-components';
import { Link } from 'react-router-dom';

// Main Nav container
export const Nav = styled.nav`
  max-width: 100%;
  display: flex;
  height: 100%;

  @media (max-width: 945px) {
    /* Specific styles for smaller screens */
  }

  @media (max-width: 905px) {
    width: min-content;
  }

  @media (max-width: 700px) {
    /* Further adjustments for smaller screens */
  }

  @media (max-width: 545px) {
    /* Styling adjustments for even smaller screens */
  }

  @media (max-width: 460px) {
    /* Mobile screen specific adjustments */
  }

  @media (max-width: 290px) {
    /* Smallest screen adjustments */
  }
`;

// UL inside Nav
export const Ul = styled.ul`
  margin: 0;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  height: 100%;
  list-style-type: none;
`;

// List Items (LI)
export const Li = styled.li`
  height: 100%;
  color: #666666;
  margin: 0;
  padding: 0 10px;

  &.notifications,
  &.messaging {
    a {
      p {
        position: relative;

        .number {
          position: absolute;
          top: 0;
          right: 25px;
          color: white;
          border-radius: 50%;
          width: 17px;
          height: 17px;
          background-color: rgb(204, 16, 22);
          display: flex;
          justify-content: center;
          align-items: center;
        }
      }
    }
  }

  @media (max-width: 945px) {
    &.volunteering-btn,
    &.post-volunteer-btn {
      display: none;
    }
  }

  @media (max-width: 460px) {
    &.notifications {
      a {
        p {
          .number {
            height: 17px;
            right: 3px;
          }
        }
      }
    }

    &.me-btn {
      a {
        p {
          .txt {
            display: none;
          }
        }
      }
    }

    a {
      p {
        span {
          display: none;
        }
      }
    }
  }
`;

// Anchor (A) Tag within Li
export const LinkStyled = styled(Link)`
  text-decoration: none;
  color: #ffffff;
  display: flex;
  font-size: 16px;
  min-width: 100%;
  justify-content: center;
  height: 100%;
  align-items: center;
  flex-direction: column;
  &:hover {
    color: #61af8f;
  }
  &.current-btn {
    color: #1e2e39;

    &:hover {
      color: #1e2e39;
    }
  }

  .nav-icon {
    width: 20px;
    height: 20px;
  }

  transition: rotate 0.3s;

  .curr-logo {
    animation-name: scaleinsoft;
    animation-duration: 0.3s;
  }
`;

// Me button (Profile Icon)
export const MeBtn = styled(Li)`
  border-left: 1px solid #d3d3d3;
  padding: 0 10px;

  .profile-icon {
    width: 20px;
    height: 20px;
    background-color: burlywood;
    border-radius: 50%;
    object-fit: cover;
  }

  @media (max-width: 545px) {
    a {
      p {
        .txt {
          display: none;
        }
      }
    }
  }
`;

// Logo inside the Nav
export const Logo = styled.div`
  cursor: pointer;
  color: white;
  height: 100%;
  display: flex;
  align-items: center;
  @media (max-width: 945px) {
    display: none;
  }
`;

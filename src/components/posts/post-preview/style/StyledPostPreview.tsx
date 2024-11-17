import styled from 'styled-components';

// Ensure posts do not spill out of their parent container
export const StyledPostActions = styled.section`
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin-bottom: 10px;

  button {
    background-color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    border: none; /* Removed border */
    color: #b2b2b2;
    padding: 8px; /* Made buttons smaller */
    border-radius: 5px;
    font-size: 14px; /* Reduced font size */
    transition: none; /* Removed transition effects */

    &.liked {
      color: #378fe9; /* Blue for like */
    }

    &.commented {
      color: #28a745; /* Green for comment */
    }

    &.shared {
      color: #17a2b8; /* Blue for share */
    }

    .icon {
      width: 20px; /* Smaller icons */
      height: 20px; /* Smaller icons */
      margin-right: 5px;
    }

    &:hover {
      background-color: transparent; /* No hover effects */
    }
  }
`;

export const StyledPostBody = styled.section`
  padding: 20px;

  .title {
    h1 {
      font-size: 26px;
      font-weight: bold;
      color: #333;
      text-align: left;
      padding-bottom: 10px;
      margin: 0;
    }
  }

  .post-text {
    padding: 0;
    p {
      margin: 12px 0;
      font-size: 18px;
      line-height: 1.6;
      color: #555;
    }

    .rtl {
      text-align: right;
    }

    .ltr {
      text-align: left;
    }
  }

  .link {
    cursor: pointer;
    padding: 8px 15px;
    font-weight: bold;
    color: rgb(103, 103, 228);
    text-decoration: underline;
    transition: all 0.3s ease;

    &:hover {
      color: #378fe9;
    }
  }

  .img-container {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 15px;
    cursor: pointer;

    img {
      max-width: 100%;
      border-radius: 10px;
      object-fit: cover;
    }
  }
`;

export const StyledPostHeader = styled.section`
  display: flex;
  align-items: center;
  background-color: white;
  padding: 15px;
  border-radius: 12px;
  margin-bottom: 15px;
  /* Removed box-shadow and hover effects */

  .loading-circle {
    height: 70px;
    width: 70px;
  }

  .img-actor {
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;

    .img {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      background-color: lightskyblue;
      object-fit: cover;
      border: 2px solid #ddd;
    }
  }

  .details {
    margin-left: 15px;
    flex-grow: 1;

    .name {
      font-weight: bold;
      color: #333;
      font-size: 18px;
    }

    .time-and-description-container {
      .description {
        color: #888;
        font-size: 14px;
        margin-bottom: 5px;
      }

      .time {
        color: #999;
        font-size: 12px;
      }
    }
  }

  .follow {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    flex-grow: 1;

    span {
      color: #0a66c2;
      padding: 8px 15px;
      border-radius: 5px;
      background-color: #f0f8ff;
      cursor: pointer;
      font-weight: bold;
      transition: background-color 0.3s ease;

      &:hover {
        background-color: #e1efff;
      }
    }
  }
`;

export const StyledPostPreview = styled.section`
  border: none; /* Removed border */
  min-height: 200px;
  background-color: white;
  border-radius: 12px;
  max-width: 100%;
  margin: 20px 0;
  padding: 15px;
  position: relative;
  /* Removed box-shadow and hover effects */

  hr {
    color: #ddd;
    margin: 15px 0;
  }

  .menu {
    position: absolute;
    top: 10px;
    right: 10px;
    cursor: pointer;

    .dots-icon {
      font-size: 24px;
      color: #333;
      transition: all 0.3s ease-in-out;

      &:hover {
        color: #378fe9;
      }
    }
  }
`;

export const MobileStyles = styled.div`
  @media (max-width: 460px) {
    .post-actions {
      button {
        svg {
          width: 20px;
          height: 20px;
        }
        span {
          display: none;
        }
      }
    }

    .post-body {
      .title {
        h1 {
          font-size: 22px;
        }
      }

      .post-text {
        p {
          font-size: 16px;
        }
      }

      .link {
        width: 100%;
        text-align: center;
      }

      .img-container {
        margin-bottom: 20px;
      }
    }
  }
`;

export default MobileStyles;

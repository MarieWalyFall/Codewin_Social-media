import styled from 'styled-components';

export const StyledPostActions = styled.section`display: flex;
  align-items: center;
  justify-content: space-around;
  margin-bottom: 5px;


  button {
    background-color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    color: #b2b2b2;
    padding: 10px;
    border-radius: 5px;

    &:hover {
      background-color: #00000014;
      color: #000000e6;
    }

    &.liked {
      color: #378fe9;
    }

    .icon {
      width: 30px;
      height: 30px;
      margin-right: 5px;
    }
  }
}

@media (max-width: 460px) {
  .post-actions {
    button {
      svg {
      }
      span {
        display: none;
      }
      &:hover {
      }

      &.liked {
      }

      .icon {
      }
    }
  }

`;

export const StyledPostBody = styled.section`
  padding: 10px 0 0 0;
 
  .title {
    h1 {
      font-size: 24px;
      text-align: left;
      padding: 0 15px;
    }
  }
  .post-text {
    padding: 0 15px;
    p {
      margin: 10px 0;
      font-size: 20px;
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
    padding: 5px 15px;
  }

  .img-container {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 10px;
    cursor: pointer;

    img {
      max-width: 100%;
      object-fit: cover;
    }
  }
}

@media (max-width: 460px) {
  .post-body {
    .title {
      h1 {
      }
    }
    .post-text {
      p {
      }
      .rtl {
      }

      .ltr {
      }
    }

    .link {
      width: 100%;
      color: rgb(103, 103, 228);
      a {
      }
    }
    .the-link {
      background-color: lightcoral;
      display: none;
    }

    .img-container {
      img {
      }
    }
  }
`;

export const StyledPostHeader = styled.section`
  display: flex;
  align-items: center;
  background-color: white;
  padding: 10px 15px 0 15px;
  border-radius: 10px;

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
    }
  }

  .details {
    margin-left: 5px;
    .name {
      color: black;
    }

    .time-and-description-container {
      &:hover {
        text-decoration: underline;
        cursor: pointer;
      }
      .description {
        p {
        }
      }

      .time {
        span {
        }
      }
    }
  }
  .follow {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    flex-grow: 1;
    width: 100px;
    margin: 0 40px 0 0;

    span {
      color: #0a66c2;
      padding: 7px;
      border-radius: 5px;
    }
  }
`;

export const StyledPostPreview = styled.section`
  border: 2px solid $border;
  min-height: 100px;
  background-color: white;
  border-radius: 10px;
  width: 100%;
  // width: 60%;
  color: $clr4;
  margin: 15px 0;
  padding: 0 0 5px 0;
  position: relative;

  hr {
    color: $border;
  }

  .menu {
    position: relative;
    cursor: pointer;
    .dots-icon {
      position: absolute;
      padding: 10px;
      right: 0;
      top: 0;
      font-size: 25px;
    }
  }
`;

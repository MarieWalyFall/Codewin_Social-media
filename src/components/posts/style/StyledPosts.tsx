import styled from 'styled-components';

export const StyledPosts = styled.section`
    grid-area: posts;
  }
  
  @media (max-width: 1160px) {
    .posts {
      padding: 0 25px 0 0;
    }
  }
  
  @media (max-width: 700px) {
    .posts {
      padding: 0 0px 0 0;
      // margin: 0 5px;
    }`;

export const StyledAddPosts = styled.section`
  background-color: white;
  border: 2px solid $border;
  border-radius: 10px;
  height: 140px;
  display: flex;
  flex-direction: column;

  .top {
    display: flex;
    align-items: center;
    justify-content: space-around;
    height: 70px;
    margin: 8px 16px;

    .img-container {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 10%;
      .icon {
        width: 48px;
        height: 48px;
        background-color: lightsalmon;
        border-radius: 50%;
        object-fit: cover;
      }
    }

    .input-container {
      display: flex;
      align-items: center;
      justify-content: flex-start;

      width: 85%;
      height: 60px;
      height: 100%;
      border-radius: 35px;
      margin: 0.4rem 0;
      padding: 5px 5px 5px 15px;
      background-color: white;
      border: 1px solid #b2b2b2;

      span {
        color: #b2b2b2;
      }

      input {
        width: 95%;
      }
    }
  }

  .btns-container {
    //bottom
    height: 70px;
    display: flex;
    align-items: center;
    justify-content: space-around;

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
      }

      .icon {
        width: 30px;
        height: 30px;
      }

      .video {
        color: #5f9b41;
      }

      .calendar {
        color: #c37d16;
      }

      .newspaper {
        color: #e16745;
      }

      .photo {
        color: #378fe9;
      }

      span {
        margin-left: 8px;
      }
    }
  }
}

@media (max-width: 660px) {
  .add-post {
    .top {
      .img-container {
        .icon {
        }
      }

      .input-container {
        span {
        }

        input {
        }
      }
    }

    .btns-container {
      button {
        &:hover {
        }

        .icon {
        }

        .video {
        }

        .calendar {
        }

        .newspaper {
        }

        .photo {
        }

        span {
          display: none;
        }
      }
    }
  }
}

@media (max-width: 460px) {
  .add-post {
    height: 120px;
    .top {
      .img-container {
        .icon {
          width: 38px;
          height: 38px;
        }
      }

      .input-container {
        width: 75%;
        height: 75%;
        span {
        }

        input {
        }
      }
    }

    .btns-container {
      button {
        &:hover {
        }

        .icon {
        }

        .video {
        }

        .calendar {
        }

        .newspaper {
        }

        .photo {
        }

        span {
          display: none;
        }
      }
    }
  }
`;

export const StyledSortBy = styled.section`
  display: flex;
  align-items: center;
  justify-content: space-evenly;

  .divider {
    display: inline-block;
    margin: 15px 0;
    color: $border;
    width: 60%;
  }

  .sort-container {
    display: flex;
    justify-content: center;

    .label {
      display: flex;

      select {
        border: none;
        background-color: unset;
        color: rgb(0, 0, 0);
        color: rgba(0, 0, 0, 0.627);
        cursor: pointer;
      }
      option {
        border: none;
        cursor: pointer;
        padding: 10px;
      }
    }
  }

  color: #00000099;
`;

export const StyledCreatePostModal = styled.section`

  background-color: #000000bf;
  position: fixed;
  z-index: 5;
  inset: 50px 0 0 0;
  transition: opacity 0.2s;
  cursor: pointer;

  &.hide {
    transition: opacity 0.2s;
    opacity: 0;
    visibility: hidden;
  }

  .container {
    position: absolute;
    background-color: white;
    overflow-y: auto;
    overflow-x: auto;
    border-radius: 7px;
    min-width: 40vw;
    height: 60vh;
    top: 40%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding-bottom: 60px;

    cursor: auto;
    display: flex;
    flex-direction: column;

    .title {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 10px;
      border-bottom: 1px solid $border;
      h1 {
        font-size: 26px;
      }

      .close-icon {
        cursor: pointer;
        padding: 3px;
      }
    }

    .name-container {
      padding: 10px 10px;
      display: flex;
      align-items: center;
      .img-container {
        .img-profile {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          background-color: lightskyblue;
          object-fit: cover;
        }
      }

      .name {
        margin-left: 5px;
        height: 30px;
      }
    }

    .input-container {
      padding: 3px;
      height: calc(100% - 170px - 50px);

      input,
      textarea {
        font-size: 26px;
        border: none;
        width: 100%;
        height: 100%;
        resize: none;

        &:focus {
          outline: none;
        }
      }
    }

    .is-loading-container {
      text-align: center;
      img {
        margin-left: 10px;
        width: 60px;
        object-fit: cover;
      }
    }

    .container-img-body {
      overflow-y: auto;
      width: 100%;

      img {
        width: 100%;
      }
    }

    .link-container {
      display: flex;
      justify-content: center;
      input {
        border: none;
        width: 90%;
        padding: 5px;
      }
    }

    .btns-add-container {
      position: absolute;
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      justify-content: center;
      margin-bottom: 5px;
      bottom: 0;
      right: 5px;
      padding: 5px;

      .btn {
        border-radius: 15px;
        padding: 7px 7px;
        border: none;
        font-size: 24px;
        border: 1px solid $border;
        margin: 0 5px;
        cursor: pointer;

        &.cancel-btn {
          &:hover {
            background-color: red;
            color: white;
          }
        }

        &.add-img-btn {
          // background-color: #f0f0f0;
          cursor: pointer;

          &:hover {
            background-color: #378fe9;
            color: white;
          }

          .add-img-body {
            cursor: pointer;
          }
        }

        &.add-video-btn {
          cursor: pointer;

          &:hover {
            background-color: #5f9b41;
            color: white;
          }

          .add-video-body {
            cursor: pointer;
          }
        }

        &:hover {
          &.post-btn {
            background-color: #378fe9;
            color: white;
          }
        }
      }
    }
  }
}

@media (max-width: 900px) {
  .create-post-modal {
    &.hide {
    }

    .container {
      min-width: 85vw;
      height: 70vh;
      top: 50%;
      .title {
        h1 {
        }

        .close-icon {
        }
      }

      .name-container {
        .img-container {
          .img-profile {
          }
        }

        .name {
        }
      }

      .input-container {
        input,
        textarea {
          &:focus {
          }
        }
      }

      .is-loading-container {
        img {
        }
      }

      .container-img-body {
        img {
          height: 360px;
          object-fit: cover;
        }
      }

      .link-container {
        input {
        }
      }

      .btns-add-container {
        .btn {
          margin: 5px 5px;
          &.cancel-btn {
            font-size: 16px;
            &:hover {
            }
          }

          &.add-img-btn {
            font-size: 16px;
            &:hover {
            }

            .add-img-body {
              font-size: 16px;
            }
          }

          &.add-video-btn {
            font-size: 16px;
            &:hover {
            }

            .add-video-body {
              font-size: 16px;
            }
          }

          &.post-btn {
            font-size: 16px;
          }

          &:hover {
            &.post-btn {
            }
          }
        }
      }
    }
  

`;

export const StyledPostsList = styled.section`
  .load-more {
    margin: 10px 5px 15px 5px;
    display: flex;
    justify-content: center;
    align-items: center;

    .load-btn {
      background-color: white;
      width: 60px;
      padding: 10px;
      border-radius: 15px;
      color: #b2b2b2;

      &:hover {
        color: black;
      }

      span {
        svg {
          width: 30px;
          height: 30px;
        }
      }
    }

    p {
      text-align: center;
      cursor: pointer;
    }
`;

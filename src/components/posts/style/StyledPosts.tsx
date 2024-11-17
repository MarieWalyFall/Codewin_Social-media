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
  border: 1px solid #dcdcdc;
  border-radius: 10px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  padding: 15px;
  transition: all 0.3s ease-in-out;

  .top {
    display: flex;
    flex-direction: column;
    margin-bottom: 10px;

    .post-type-selector {
      display: flex;
      justify-content: space-between;
      margin-bottom: 10px;

      button {
        background-color: transparent;
        border: none;
        color: #6c757d;
        font-size: 16px;
        padding: 8px;
        cursor: pointer;
        transition: all 0.3s ease;

        &.active {
          color: #378fe9;
          font-weight: bold;
          border-bottom: 2px solid #378fe9;
        }

        &:hover {
          color: #378fe9;
        }
      }
    }
  }

  .file-upload-container {
    margin-top: 10px;

    .photo-upload,
    .video-upload {
      margin-bottom: 20px;

      label {
        display: flex;
        align-items: center;
        background-color: #f8f9fa;
        padding: 8px;
        border-radius: 5px;
        cursor: pointer;
        font-size: 14px;

        .icon {
          margin-right: 8px;
        }

        input[type='file'] {
          display: none;
        }

        &:hover {
          background-color: #e9ecef;
        }
      }

      .file-list {
        margin-top: 10px;
        display: flex;
        flex-direction: column;

        .file-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          background-color: #f8f9fa;
          padding: 8px;
          border-radius: 5px;
          margin-top: 5px;

          span {
            font-size: 14px;
          }

          button {
            background-color: transparent;
            border: none;
            color: #e16745;
            cursor: pointer;
            font-size: 14px;
            padding: 0;

            &:hover {
              color: #c4512d;
            }
          }
        }
      }
    }
  }

  .btns-container {
    display: flex;
    align-items: center;
    justify-content: space-around;
    margin-top: 10px;

    button {
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: white;
      border: none;
      color: #6c757d;
      padding: 8px 12px;
      border-radius: 5px;
      transition: all 0.3s ease;

      &:hover {
        background-color: #f1f1f1;
      }

      .icon {
        width: 24px;
        height: 24px;
      }

      span {
        margin-left: 8px;
        font-size: 14px;
      }

      &.photo .icon {
        color: #378fe9;
      }

      &.video .icon {
        color: #5f9b41;
      }

      &.calendar .icon {
        color: #c37d16;
      }

      &.newspaper .icon {
        color: #e16745;
      }
    }
  }

  .post-btn-container {
    display: flex;
    justify-content: flex-end;
    padding: 10px 0;

    .post-btn {
      background-color: #378fe9;
      color: white;
      border: none;
      padding: 10px 20px;
      font-size: 16px;
      font-weight: bold;
      border-radius: 5px;
      cursor: pointer;
      transition: background-color 0.3s ease;

      &:hover {
        background-color: #316ac5;
      }

      &:disabled {
        background-color: #d3d3d3;
        cursor: not-allowed;
      }
    }
  }

  @media (max-width: 660px) {
    .top {
      .post-type-selector {
        flex-direction: column;
        button {
          margin-bottom: 8px;
        }
      }

      .input-container {
        margin-left: 0;
        padding: 8px;
        font-size: 14px;

        textarea {
          font-size: 14px;
        }
      }
    }

    .btns-container button {
      span {
        display: none;
      }
    }
  }

  @media (max-width: 460px) {
    .top {
      flex-direction: column;
      align-items: flex-start;

      .img-container {
        margin-bottom: 10px;
      }

      .input-container {
        width: 100%;
      }
    }

    .btns-container {
      flex-wrap: wrap;
      button {
        margin-bottom: 5px;
      }
    }
  }
`;
// For the post container

export const PostContainer = styled.textarea`
  max-width: 100%
  width: 100%;
  font-size: 16px;
  color: #333;
  background-color: transparent;
  border: 1px solid black;
  border-radius: 4px;
  outline: none;
  resize: none;
  padding: 8px;
  min-height: 100px;
`;

// Event Container // EventContainer JSX update
export const EventContainer = styled.div`
  padding: 15px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 20px;

  .event-fields-container {
    display: flex;
    justify-content: space-between;
    width: 100%;
  }

  .event-field {
    display: flex;
    flex-direction: column;
    width: 48%;
  }

  .event-title-input,
  .event-date-input,
  .event-location-input,
  .event-description-input {
    background-color: #f7f9fa;
    border: none;
    padding: 10px;
    font-size: 16px;
    color: black;
    width: 100%;
    box-sizing: border-box;
    margin-bottom: 10px;
  }

  .event-title-input {
    background-color: #61af8f;
    border-bottom: 1px solid black;
    font-weight: bold;
    color: black;
    border-radius: 4px 4px 0 0;
  }

  .event-description-input {
    min-height: 100px;
    resize: vertical;
  }

  /* Focus state for all event fields */
  .event-title-input:focus,
  .event-date-input:focus,
  .event-location-input:focus,
  .event-description-input:focus {
    outline: none;
    background-color: white;
    border-bottom: 1px solid black;
  }

  .event-date-input,
  .event-location-input {
    border-left: none;
    border-right: none;
  }
`;

// Article Container
export const ArticleContainer = styled.div`
  background-color: #f6f9fa;
  margin: 20px 20px 0px 20px;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  box-sizing: border-box;
  .article-title-input {
    font-size: 24px;
    font-weight: normal;
    background-color: #f7f8fa;
    padding: 15px;
    padding-top: 30px;
    border: none;
    border-bottom: 1px solid #adb5bd;
    color: #333;
    width: 100%;
    box-sizing: border-box;
  }

  .article-title-input:focus {
    outline: none;
  }

  .article-content-input {
    margin-top: 20px;
    font-size: 16px;
    line-height: 1.5;
    color: #333;
    background-color: transparent;
    border: none;
    width: 100%;
    min-height: 100px;
    padding: 15px;
    resize: vertical;
    box-sizing: border-box;
  }

  .article-content-input:focus {
    outline: none;
  }

  /* Prevent the textarea from slipping out by setting max-width */
  .article-content-input {
    max-width: 100%;
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
  background-color: rgba(0, 0, 0, 0.8);
  position: fixed;
  z-index: 1000;
  inset: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: opacity 0.3s ease-in-out;
  cursor: pointer;

  &.hide {
    opacity: 0;
    visibility: hidden;
  }

  .container {
    background-color: #ffffff;
    border-radius: 10px;
    width: 50vw;
    max-width: 800px;
    max-height: 90vh;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    cursor: auto;
    padding: 20px;

    .title {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-bottom: 15px;
      border-bottom: 1px solid #e6e6e6;

      h1 {
        font-size: 24px;
        font-weight: bold;
        color: #333;
      }

      .close-icon {
        font-size: 24px;
        color: #666;
        cursor: pointer;
        transition: color 0.2s ease;

        &:hover {
          color: #000;
        }
      }
    }

    .name-container {
      display: flex;
      align-items: center;
      margin: 15px 0;

      .img-container {
        .img-profile {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          object-fit: cover;
          border: 2px solid #ccc;
        }
      }

      .name {
        margin-left: 15px;

        h2 {
          font-size: 18px;
          font-weight: 600;
          color: #444;
        }
      }
    }

    .input-container {
      flex: 1;
      margin-bottom: 15px;

      textarea {
        width: 100%;
        height: 150px;
        border: 1px solid #e0e0e0;
        border-radius: 8px;
        padding: 10px;
        font-size: 16px;
        color: #555;
        resize: none;
        transition: border-color 0.2s;

        &:focus {
          outline: none;
          border-color: #378fe9;
        }
      }
    }

    .link-container {
      display: flex;
      justify-content: center;
      margin: 10px 0;

      input {
        width: 90%;
        padding: 8px;
        border: 1px solid #e0e0e0;
        border-radius: 8px;
        font-size: 14px;
        color: #555;

        &:focus {
          outline: none;
          border-color: #378fe9;
        }
      }
    }

    .is-loading-container {
      text-align: center;

      img {
        width: 50px;
        margin-top: 10px;
      }
    }

    .container-img-body,
    .container-video-body {
      margin: 15px 0;

      img,
      video {
        width: 100%;
        max-height: 300px;
        object-fit: cover;
        border-radius: 8px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      }
    }

    .btns-add-container {
      display: flex;
      justify-content: flex-end;
      gap: 10px;
      margin-top: 20px;

      .btn {
        padding: 10px 15px;
        font-size: 16px;
        font-weight: 600;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        transition:
          background-color 0.3s ease,
          color 0.3s ease;

        &.cancel-btn {
          background-color: #f0f0f0;
          color: #444;

          &:hover {
            background-color: #ff4d4d;
            color: #fff;
          }
        }

        &.add-img-btn {
          background-color: #f8f9fa;
          color: #444;

          &:hover {
            background-color: #378fe9;
            color: #fff;
          }
        }

        &.add-video-btn {
          background-color: #f8f9fa;
          color: #444;

          &:hover {
            background-color: #5f9b41;
            color: #fff;
          }
        }

        &.post-btn {
          background-color: #378fe9;
          color: #fff;

          &:hover {
            background-color: #316ac5;
          }
        }
      }
    }
  }

  /* Larger modal for article post type */
  .container.large-modal {
    width: 70vw;
    height: 80vh;
    padding: 30px;

    .input-container textarea {
      height: 300px;
    }
  }

  @media (max-width: 768px) {
    .container {
      width: 85vw;
      height: 80vh;

      .title h1 {
        font-size: 20px;
      }

      .btns-add-container .btn {
        font-size: 14px;
        padding: 8px 12px;
      }
    }
  }
`;

export const StyledPostsList = styled.section`
  box-sizing: border-box;
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

import styled from 'styled-components';
export const StyledConversations = styled.section`
  .messaging {
    .container {
      display: flex;
      height: 100%;
      .list-msg {
        background-color: #ffffff;
        width: 30%;
        height: 100%;
        border-top-left-radius: 15px;
        border-bottom-left-radius: 15px;

        .title-container {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 5px;
          p {
          }

          .logos {
            display: flex;
            align-items: center;
            color: #00000099;
            span {
              margin: 5px;
            }
          }
        }

        .filter-container {
          width: 100%;
          padding: 5px;

          input {
            width: 100%;
            border: none;
            border-radius: 5px;
            padding: 5px;
            background-color: #eef3f8;
          }
        }

        .list {
          overflow-y: auto;
          height: 100%;
          height: calc(100vh - 155px);
        }
      }
    }
  }

  @media (max-width: 630px) {
    .messaging {
      .container {
        .list-msg {
          width: 90%;
          height: 98%;
          border-top-right-radius: 15px;
          border-bottom-right-radius: 15px;
          .title-container {
            p {
            }

            .logos {
              span {
              }
            }
          }

          .filter-container {
            input {
            }
          }

          .list {
          }
        }
      }
    }
  }
`;
export const StyledMessageThread = styled.section`
  .messaging {
    .container {
      .message-thread {
        padding: 10px;
        background-color: #ffffff;
        width: 70%;
        height: calc(100vh - 60px);
        border-top-right-radius: 15px;
        border-bottom-right-radius: 15px;
        border: 1px solid $border;

        .header-message-thread {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 10px 0;
          border-bottom: 1px solid $border;
          margin: 0 0 5px 0;

          div {
            display: flex;
            align-items: center;
            .img-profile {
              cursor: pointer;
              .img {
                width: 75px;
                height: 75px;
                border-radius: 50%;
                background-color: lightskyblue;
                object-fit: cover;
              }
            }
            .name {
              margin-left: 15px;
            }
          }

          .container-logo {
            color: #00000099;
            .logo-menu {
              cursor: pointer;

              svg {
                font-size: 25px;
              }
            }
          }
        }

        .user-profile-details {
          background-color: white;
          height: calc(100vh - 260px);
          border-bottom: 1px solid $border;
          overflow-y: auto;
        }

        .send-msg-container {
          display: flex;
          margin-top: 5px;
          width: 100%;
          .input-container {
            width: 100%;
            textarea {
              border: 1px solid $border;
              padding: 7px;
              border-radius: 5px;
              height: 80px;
              width: 100%;
              resize: none;
            }
          }
          .btns-container {
            display: flex;
            align-items: center;
            justify-content: flex-end;
            button {
              margin: 5px;
              border-radius: 10px;
              padding: 7px 10px;
              border: unset;
            }
          }
        }
      }
    }
  }

  @media (max-width: 630px) {
    .messaging {
      .container {
        .message-thread {
          // display: none;
          padding: 0 10px;
          position: fixed;
          width: 100vw;
          height: 100vh;
          border-top-left-radius: 15px;
          border-bottom-left-radius: 15px;
          inset: 0 0 0 0;
          z-index: 150;
          .header-message-thread {
            div {
              .img-profile {
                .img {
                }
              }
              .name {
              }
            }

            .container-logo {
              .logo-menu {
              }
            }
          }

          .user-profile-details {
          }

          .send-msg-container {
            .input-container {
              textarea {
              }
            }
            .btns-container {
              button {
              }
            }
          }
        }
      }
    }
  }
`;

export const StyledMessaging = styled.section`
  
    .messaging {
      height: 100%;
      grid-area: messaging;
      overflow-y: hidden;

      .container {
        border-radius: 1px solid black;
      }
   
  @media (max-width: 630px) {
    .messaging {
      .container {
        justify-content: center;

        .message-thred {
        }
        .user-profile-details {
          min-height: calc(100vh - 220px);
        }
        .message-open-style {
        }
      }
    }

  }
`;

export const StyledMessagePreview = styled.section`
  background-color: #ffffff;

  .loading-circle {
    img {
      height: 85px;
      width: 85px;
    }
  }

  .container {
    cursor: pointer;
    padding: 10px;

    &.chosen-chat {
      border-left: 3px solid #057642;
      background-color: #eef3f8;
    }

    .img-container {
      margin: 5px;
      position: relative;
      .img {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        object-fit: cover;
      }

      .number {
        position: absolute;
        right: 35px;
        color: white;
        p {
          width: 25px;
          height: 25px;
          padding: 2px;
          background-color: rgb(204 16 22);
          border-radius: 50%;
          display: flex;
          justify-content: center;
          align-items: center;
        }
      }
    }

    .details {
      display: flex;
      flex-direction: column;
      width: 100%;

      .name {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        // width: 100%;
        h1 {
          font-size: 18px;
        }

        span {
          margin-left: 3px;
        }
      }
    }
  }
}

@media (max-width: 630px) {
  .msg-preview {
    display: flex;
    .loading-circle {
      img {
      }
    }

    .container {
      width: 100%;
      &.chosen-chat {
      }

      .img-container {
        .img {
        }
      }

      .details {
        .name {
          width: 100%;
          justify-content: space-between;
          h1 {
          }

          span {
          }
        }
      }
    }
  }
`;

export const StyledThreadMessageList = styled.section`
  .message-thread {
    .thread-msg-list {
      background-color: #ffffff;
      padding: 5px;
    }
  }

  .thread-msg-preview {
    background-color: #ffffff;
    margin: 5px;
    margin: 5px 5px 15px 5px;

    .container-msg {
      display: flex;
      .img-container {
        cursor: pointer;
        .img {
          width: 45px;
          height: 45px;
          border-radius: 50%;
          object-fit: cover;
        }
      }

      .name-time-container {
        display: flex;
        align-items: center;
        margin-left: 7px;
        width: 100%;
        justify-content: space-between;
        .name {
          margin-left: 7px;
          p {
          }
        }

        .time {
          margin-left: 7px;
          span {
          }
        }
      }
    }

    .the-msg {
      margin-left: 60px;

      p {
      }
    }
  }

  @media (max-width: 630px) {
    .thread-msg-preview {
      .container-msg {
        margin-bottom: 15px;
        .img-container {
          .img {
          }
        }

        .name-time-container {
          .name {
            p {
            }
          }

          .time {
            span {
              font-size: 11px;
            }
          }
        }
      }

      .the-msg {
        p {
        }
      }
    }
  }
`;

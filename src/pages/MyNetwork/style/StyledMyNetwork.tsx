import styled from 'styled-components';

export const StyledMyNetwork = styled.section`
  
    min-height: 100vh;
    //   background-color: lightseagreen;
    padding-top: 60px;
    display: grid;
    grid-template-areas: 'sidebar main';
    grid-template-columns: minmax(300px, 7fr) minmax(0, 17fr);
    // grid-template-areas: 'sidebar main';
    // grid-template-columns: minmax(300px, 7fr) minmax(0, 17fr);
    column-gap: 2.4em;
    color: #666666;
    grid-auto-flow: column;

    div {
      h3 {
        padding: 5px calc(5px + 0.8rem);
      }
    }

    .left {
      grid-area: sidebar;

      .manage-network {
        border: 1px solid $border;
        background-color: white;
        //   border-top-left-radius: 10px;
        //   border-top-right-radius: 10px;
        border-radius: 10px;
        padding: 5px 5px;
        ul {
          margin: 0;
          padding: 0;
          li {
            list-style: none;
            button {
              width: 100%;
              display: flex;
              justify-content: space-between;
              align-items: center;
              border: unset;
              background-color: white;
              color: inherit;

              &:hover {
                background-color: #dedbdb62;
              }

              div {
                display: flex;
                align-items: center;
              }
            }
          }
        }
      }
    }

    .right {
      grid-area: main;
      // background-color: rgb(109, 157, 155);

      .recommended {
        border: 1px solid $border;
        background-color: white;
        padding: 25px;
        border-radius: 10px;
      }
    }
  }

  @media (max-width: 1150px) {
    .my-network-page {
      display: flex;
      flex-direction: column;
      align-items: center;
      div {
        h3 {
        }
      }

      .left {
        margin-bottom: 10px;

        .manage-network {
          ul {
            li {
              button {
                &:hover {
                }

                div {
                }
              }
            }
          }
        }
      }

      .right {
        width: 80%;
        min-height: 20px;
        .recommended {
        }
      }
    }
  }

  @media (max-width: 650px) {
    .my-network-page {
      display: flex;
      flex-direction: column;
      align-items: center;
      div {
        h3 {
        }
      }

      .left {
        width: 100%;

        .manage-network {
          ul {
            li {
              button {
                &:hover {
                }

                div {
                }
              }
            }
          }
        }
      }

      .right {
        width: 100%;
        .recommended {
          padding: 5px;
        }
      }
    }
  
`;

export const StyledConnections = styled.section`
 
  min-height: 100vh;

  display: grid;
  grid-template-columns: minmax(0, 17fr) minmax(300px, 7fr);
  grid-template-areas: 'main aside';
  column-gap: 2.4rem;
  row-gap: 2.4rem;

  .left {
    grid-area: main;

    .container {
      background-color: white;
      border-radius: 10px;
      padding: 5px;
      .count {
        padding: 1.2rem 20px 0.4rem;
        p {
        }
      }

      .filter-container {
        display: flex;
        justify-content: space-evenly;
        padding: 1.2rem 20px 0.4rem;
        border-bottom: 1px solid $border;

        .search {
          position: relative;

          .search-icon {
            position: absolute;
            transform: translate(50%, 50%);
            color: #666666;
          }

          .connections-input {
            width: 230px;
            border-radius: 5px;
            border: n1px solid $border;
            background-color: #e4e4e498;
            padding: 0 0.8rem 0 40px;
            line-height: 1.75;
            font-weight: 400;
            font-size: 14px;
            height: 34px;

            transition: width 0.3s;

            &:focus {
              // width: 380px;
            }
          }
        }
      }

      .my-connection-list {
      }
    }
  }

  .right {
    grid-area: aside;

    div {
      height: 400px;
      background-color: white;
      border-radius: 10px;
    }
  }
}

@media (max-width: 870px) {
  .connections-page {
    grid-template-columns: minmax(0, 1fr);
    column-gap: 0;
    .left {
      .container {
        .count {
          p {
          }
        }

        .filter-container {
          padding-bottom: 25px;
          .search {
            .search-icon {
            }

            .connections-input {
              &:focus {
              }
            }
          }
        }

        .my-connection-list {
        }
      }
    }

    .right {
      display: none;
      div {
      }
    }
  }
`;

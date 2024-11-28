import styled from 'styled-components';

export const StyledRightSideBar = styled.section`


  .container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    min-height: 300px;
    border: 1px solid $border;
    grid-area: right-side-bar;
    background-color: white;
    border-radius: 10px;
    margin: 10px 0;
    padding: 5px;

    .title {
      p {
        margin: 5px 0;
      }
    }

    .list {
      .preview {
        display: flex;
        flex-direction: row;
        width: 100%;
        height: 33.3333%;
        margin-bottom: 5px;
        padding: 5px;
        cursor: pointer;
        border-radius: 5px;

        &:hover {
          background-color: rgba(0, 0, 0, 0.075);
        }
        .img-container {
          .img {
            width: 70px;
            height: 70px;
            border-radius: 50%;
            object-fit: cover;
          }
        }

        div {
          margin-left: 10px;
          .name {
            margin-bottom: 3px;
            p {
            }
          }

          .profession {
            margin-bottom: 5px;
            p {
            }
          }

          .btn {
            button {
              // width: 100%;
              border-radius: 35px;
              padding: 5px;
              background-color: white;
              color: #0a66c2;
              border: 1px solid #0a66c2;
            }
          }
        }
      }
    }
  }

  .else-container {
    display: flex;
    flex-direction: column;

    min-height: 200px;
    border: 1px solid $border;
    grid-area: right-side-bar;
    background-color: white;
    border-radius: 10px;
    margin: 10px 0;
    padding: 5px;

    .img-container {
      .img {
        width: 100%;
        height: 100%;
      }
    }
  }
}

@media (max-width: 1160px) {
  .right-side-bar {
    display: none;
    div {
    }
  }
`;

import styled from 'styled-components';

export const StyledLeftSideBar = styled.div`


    grid-area: left-side-bar;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
  
    // border: 1px solid $border;
  }
  background-color: white;
  @media (max-width: 700px) {
    .left-side-bar {
      display: none;
    }
  
    `;

export const StyledCommunityPanel = styled.section`
  background-color: white;
  min-height: 300px;
  border-radius: 10px;
  margin: 10px 0;
  position: sticky;
  top: 76px;
  display: flex;
  flex-direction: column;
  justify-content: center;

  div {
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    p {
      text-align: center;
    }
  }
`;

export const StyledFeedIdentityModule = styled.section`
  border-radius: 10px;
  border: 1px solid $border;
  min-height: 240px;
  background-color: white;

  div {
    .bg {
      border-top-left-radius: 10px;
      border-top-right-radius: 10px;
      background-color: #a0b4b7;
      height: 70px;
      .profile-container {
        display: flex;
        justify-content: center;
        cursor: pointer;
        .img {
          width: 70px;
          height: 70px;
          border-radius: 50%;
          background-color: lemonchiffon;
          object-fit: cover;
          //   position: relative;
          //   bottom: 25%;
          transform: translate(0, 50%);
        }
      }
    }

    .profile-name {
      margin: 55px 0 0 0;
      padding: 0 10px 40px 10px;
      display: flex;
      justify-content: center;
      flex-direction: column;
      align-items: center;
      border-bottom: 1px solid $border;

      h1 {
        font-size: 24px;
        text-align: center;
      }
    }

    .views {
      padding: 5px 10px;
      //   padding-bottom: 30px;
      border-bottom: 1px solid $border;
    }

    .to-premium {
      padding: 10px 10px;
      align-items: center;
      border-bottom: 1px solid $border;

      div {
        display: flex;
        align-items: center;
      }
    }

    .my-items {
      padding: 5px 10px;
      div {
        padding: 10px;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;

        p {
          margin-right: 5px;
        }
      }
    }
  }
`;

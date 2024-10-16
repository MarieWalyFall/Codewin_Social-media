import styled from 'styled-components';

export const StyledMessages = styled.section`

  height: 100vh;
  display: grid;
  grid-template-areas: 'messaging right-side-message';
  grid-template-columns: minmax(0, 17fr) minmax(300px, 7fr);
  padding-top: 60px;
  justify-content: space-between;
  column-gap: 2.4em;
  grid-area: content;
  grid-template-rows: auto;
  row-gap: 2.4em;

  .right-side-message {
    grid-area: right-side-message;
    border: 1px solid $border;
  }
}

@media (max-width: 920px) {
  .message-page {
    grid-template-areas: 'messaging';
    grid-template-columns: minmax(0, 1fr);

    .right-side-message {
      display: none;
    }
  }
}
@media (max-width: 630px) {
  .message-page {
    .right-side-message {
    }
  }
`;

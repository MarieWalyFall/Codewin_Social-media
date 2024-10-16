import styled from 'styled-components';

export const FeedPage = styled.div`
  display: grid;
  grid-template-areas: 'left-side-bar posts right-side-bar';
  grid-template-columns: minmax(0, 5fr) minmax(0, 13fr) minmax(300px, 7fr);
  padding-top: 60px;
  justify-content: space-between;
  column-gap: 2.4em;
  grid-area: content;
  grid-template-rows: auto;
  row-gap: 2.4em;

  @media (max-width: 1160px) {
    grid-template-areas: 'left-side-bar posts';
    grid-template-columns: minmax(0, 5fr) minmax(0, 13fr);
  }

  @media (max-width: 700px) {
    grid-template-areas: 'posts';
    grid-template-columns: 1fr;
    margin: 0 30px;
    column-gap: 0;
  }

  @media (max-width: 746px) {
    margin: 0;
  }
`;

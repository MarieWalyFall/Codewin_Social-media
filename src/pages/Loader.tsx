import React from 'react';
import { LoadingIndicator } from '../components/LoadingIndicator';
import styled from 'styled-components';

const LoaderPage = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f5f5f5;
  color: #333; /* Replace with your desired text color */
  font-size: 20px;
`;

const LoaderText = styled.h1`
  margin-bottom: 1rem;
`;

const Loader = () => {
  return (
    <LoaderPage>
      <LoaderText>Loading...</LoaderText>
      <LoadingIndicator />
    </LoaderPage>
  );
};

export default Loader;

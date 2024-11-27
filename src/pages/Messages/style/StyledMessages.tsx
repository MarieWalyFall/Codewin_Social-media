import styled from 'styled-components';

export const StyledMessages = styled.div`
  display: flex;
  flex-direction: row;
  height: 100vh;

  .right-side-message {
    flex-grow: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
    background: #fafafa;
    border-left: 1px solid #e1e4e8;

    p {
      font-size: 1.1rem;
      color: #888;
      text-align: center;
    }
  }

  /* Chat Bubble Styles */
  .message-bubble {
    display: inline-block;
    max-width: 70%;
    margin: 10px;
    padding: 15px;
    border-radius: 10px;
    font-size: 0.95rem;
    word-wrap: break-word;
  }

  .message-bubble.sent {
    align-self: flex-end;
    background-color: #007bff;
    color: white;
    border-top-right-radius: 0;
  }

  .message-bubble.received {
    align-self: flex-start;
    background-color: #f0f0f0;
    color: #333;
    border-top-left-radius: 0;
  }

  /* Chat Input */
  .chat-input-container {
    display: flex;
    align-items: center;
    padding: 10px;
    border-top: 1px solid #e1e4e8;
    background: #fff;

    input {
      flex-grow: 1;
      padding: 10px;
      font-size: 1rem;
      border: 1px solid #ddd;
      border-radius: 20px;
      outline: none;
      transition: border 0.2s;

      &:focus {
        border: 1px solid #007bff;
      }
    }

    button {
      margin-left: 10px;
      padding: 10px 15px;
      font-size: 0.9rem;
      font-weight: bold;
      color: white;
      background-color: #007bff;
      border: none;
      border-radius: 20px;
      cursor: pointer;
      transition: background-color 0.2s;

      &:hover {
        background-color: #0056b3;
      }

      &:disabled {
        background-color: #9ec6ff;
        cursor: not-allowed;
      }
    }
  }

  /* Conversation Header */
  .chat-header {
    display: flex;
    align-items: center;
    padding: 15px;
    background: #007bff;
    color: white;
    font-size: 1.2rem;
    font-weight: bold;

    .back-button {
      margin-right: 10px;
      font-size: 1.5rem;
      cursor: pointer;
      color: white;
      transition: opacity 0.2s;

      &:hover {
        opacity: 0.8;
      }
    }

    .user-info {
      flex-grow: 1;
      display: flex;
      flex-direction: column;

      .user-name {
        font-weight: bold;
        font-size: 1.2rem;
      }

      .status {
        font-size: 0.9rem;
        color: #d8eaff;
      }
    }
  }
`;

export const StyledMessagesPage = styled.div`
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;

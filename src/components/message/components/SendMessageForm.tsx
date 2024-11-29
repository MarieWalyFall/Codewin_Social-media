import { useEffect, useState, useRef, ChangeEvent, FormEvent } from 'react';
import { SendMessageFormProps } from 'types';

export const SendMessageForm: React.FC<SendMessageFormProps> = ({
  onSendMessage,
  messagesToShow,
}) => {
  const [newMessage, setNewMessage] = useState<string>('');
  const inputRef = useRef<HTMLTextAreaElement | null>(null);

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setNewMessage(e.target.value); // Update state directly with input value
  };

  const doSubmit = () => {
    if (newMessage.trim()) {
      // Only send if message is non-empty
      onSendMessage(newMessage); // Send the message
      setNewMessage(''); // Clear the input field
    }
  };

  useEffect(() => {
    setNewMessage(''); // Clear the message input
    if (inputRef.current) {
      inputRef.current.focus(); // Focus the input field
    }
  }, [messagesToShow]); // Trigger this effect when messagesToShow changes

  return (
    <form
      className="send-msg-container"
      onSubmit={(ev: FormEvent<HTMLFormElement>) => {
        ev.preventDefault(); // Prevent default form submission
        doSubmit(); // Handle form submission
      }}
    >
      <div className="input-container">
        <textarea
          ref={inputRef}
          required
          onChange={handleChange}
          placeholder="Write a message..."
          id="body"
          name="body"
          value={newMessage} // Bind state to textarea value
        />
      </div>

      <div className="btns-container">
        <button type="submit">Send</button>
      </div>
    </form>
  );
};

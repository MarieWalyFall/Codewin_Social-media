import { useEffect, useState, useRef, ChangeEvent, FormEvent } from 'react';
import { Message, NewMessage, SendMessageFormProps } from 'types';

export const SendMessageForm: React.FC<SendMessageFormProps> = ({
  onSendMessage,
  messagesToShow,
}) => {
  const [newMessage, setNewMessage] = useState<NewMessage>({ content: '' });
  const inputRef = useRef<HTMLTextAreaElement | null>(null);

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewMessage((prevMessage) => ({ ...prevMessage, [name]: value }));
  };

  const doSubmit = () => {
    if (newMessage) {
      if (onSendMessage) onSendMessage(newMessage);
      setNewMessage({ content: '' });
    }
  };

  useEffect(() => {
    setNewMessage({ content: '' });
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [messagesToShow]);

  return (
    <form
      className="send-msg-container"
      onSubmit={(ev: FormEvent<HTMLFormElement>) => {
        ev.preventDefault();
        doSubmit();
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
          value={newMessage.body}
        />
      </div>

      <div className="btns-container">
        <button type="submit">Send</button>
      </div>
    </form>
  );
};

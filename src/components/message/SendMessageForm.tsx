import { useEffect, useState, useRef, ChangeEvent, FormEvent } from 'react';
import { Message, NewMessage, SendMessageFormProps } from 'types';



export const SendMessageForm: React.FC<SendMessageFormProps> = ({onSendMsg, messagesToShow }) => {
  const [newMsg, setNewMsg] = useState<NewMessage>({content: '' });
  const inputRef = useRef<HTMLTextAreaElement | null>(null);

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewMsg((prevMsg) => ({ ...prevMsg, [name]: value }));
  };

  const doSubmit = () => {
    if (newMsg) {
      onSendMsg(newMsg);
      setNewMsg({ content: '' });
    }
  };

  useEffect(() => {
    setNewMsg({ txt: '' });
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
          id="txt"
          name="txt"
          value={newMsg.txt}
        />
      </div>

      <div className="btns-container">
        <button type="submit">Send</button>
      </div>
    </form>
  );
};

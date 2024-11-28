import { Message, ThreadMessageListProps } from 'types';
import { ThreadMessagePreview } from './ThreadMessagePreview';
import { StyledThreadMessageList } from '../style/StyledMessage';

export const ThreadMessageList: React.FC<ThreadMessageListProps> = ({
  messagesToShow,
}) => {
  if (!messagesToShow || !messagesToShow.length) {
    return <div>No msgs yet..</div>;
  }

  return (
    <StyledThreadMessageList className="thread-msg-list">
      <div className="list">
        {messagesToShow.map((msg) => (
          <ThreadMessagePreview key={msg.id} msg={msg} />
        ))}
      </div>
    </StyledThreadMessageList>
  );
};

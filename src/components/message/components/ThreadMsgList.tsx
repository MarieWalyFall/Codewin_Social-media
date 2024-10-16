import { Message, ThreadMsgListProps } from 'types';
import { ThreadMsgPreview } from './ThreadMsgPreview';
import { StyledThreadMessageList } from '../style/StyledMessage';

export const ThreadMsgList: React.FC<ThreadMsgListProps> = ({
  messagesToShow,
}) => {
  if (!messagesToShow || !messagesToShow.length) {
    return <div>No msgs yet..</div>;
  }

  return (
    <StyledThreadMessageList className="thread-msg-list">
      <div className="list">
        {messagesToShow.map((msg) => (
          <ThreadMsgPreview key={msg.id} msg={msg} />
        ))}
      </div>
    </StyledThreadMessageList>
  );
};

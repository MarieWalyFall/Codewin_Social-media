import { FC } from 'react';
import { ReplyPreview } from './ReplyPreview';
import { ReplyListProps } from 'types';


export const ReplyList: FC<ReplyListProps> = ({ replies, updateReply }) => {
  return (
    <section className="reply-list">
      {replies.map((reply) => (
        <ReplyPreview key={reply.id} reply={reply} updateReply={updateReply} />
      ))}
    </section>
  );
};

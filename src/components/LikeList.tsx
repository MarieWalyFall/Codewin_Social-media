import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { utilService } from '../services/utilService';
import { LikePreview } from './LikePreview';
import { LikeListProps } from 'types';


export function LikeList({ reactions, toggleLikes }: LikeListProps) {
  return (
    <section className="like-list">
      <div className="title">
        <h2>Reactions:</h2>
        Icon
      </div>
      <div>
        <div className="all">
          <p>All {reactions?.length}</p>
        </div>
      </div>
      <div className="list">
        {reactions.map((reaction) => (
          <LikePreview key={reaction.userId} reaction={reaction} />
        ))}
      </div>
    </section>
  );
}

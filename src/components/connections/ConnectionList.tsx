import { ConnectionsList } from 'types';
import { utilService } from 'services/utilService';
import { ConnectionPreview } from './ConnectionPreview';

interface ConnectionsListProps {

  connections: ConnectionsList;
}
export const ConnectionList: React.FC<ConnectionsListProps> = ({ connections }) => {
  return (
    <ul className="connection-list">
      {connections.map((connection) => (
        <ConnectionPreview key={utilService.makeId()} user={connection} />
      ))}
    </ul>
  );
};
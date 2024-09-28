import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { MyConnectionPreview } from '../../components/connections/MyConnectionPreview';
import { RootState } from '../../store'; // Adjust this import based on your store setup
import { User } from '../../types'; // Adjust this import based on your type definitions
import { FaSearch } from 'react-icons/fa';

interface Field {
  [key: string]: any;
}

function Connections() {
  const [connections, setConnections] = useState<any[]>([]); // Replace 'any' with the appropriate type if available
  const [field, setField] = useState<Field>({ fullname: '' });

  const { loggedInUser } = useSelector((state: RootState) => state.userModule);

  const handleChange = async ({
    target,
  }: React.ChangeEvent<HTMLInputElement>) => {
    const field = target.name;
    const value = target.type === 'number' ? +target.value || '' : target.value;
    setField({ [field]: value } as Field);
    setFilter(String(value));
  };

  useEffect(() => {
    if (loggedInUser?.connections) {
      setConnections([...loggedInUser.connections]);
    }
  }, [loggedInUser]);

  const setFilter = (txt: string) => {
    const regex = new RegExp(txt, 'i');
    const filteredConnections = [...(loggedInUser?.connections || [])].filter(
      (connection) => regex.test(connection.name)
    );
    setConnections(filteredConnections);
  };

  if (!loggedInUser) return null;

  return (
    <section className="connections-page">
      <div className="left main">
        <div className="container">
          <div className="count">
            <h3>{loggedInUser.connections?.length} Connections</h3>
          </div>

          <div className="filter-container">
            <div className="search">
              <FaSearch />
              <input
                type="text"
                onChange={handleChange}
                id="fullname"
                name="fullname"
                value={field.fullname}
                placeholder="Search by name"
                className="connections-input"
              />
            </div>
          </div>

          <div className="my-connection-list">
            {connections.map((connection) => (
              <MyConnectionPreview
                key={connection.id}
                connection={connection}
              /> // Assuming each connection has a unique 'id'
            ))}
          </div>
        </div>
      </div>

      <div className="right aside">
        <div></div>
      </div>
    </section>
  );
}

export default Connections;

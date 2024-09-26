import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface MapMenuProps {
  menuPosition: { x: number; y: number }; // Adjust type according to the actual structure of menuPosition
  setIsCreateShowPost: (show: boolean) => void;
}

export const MapMenu: React.FC<MapMenuProps> = ({ menuPosition, setIsCreateShowPost }) => {
  return (
    <section className="map-menu" style={{ left: menuPosition.x, top: menuPosition.y }}>
      <span className="location-icon">
       Icon
      </span>

      <div className="opts-container">
        <div
          className="add-post-to-map opt"
          onClick={() => {
            setIsCreateShowPost(true);
          }}
        >
          <p>Add a post here</p>
        </div>
      </div>
    </section>
  );
};

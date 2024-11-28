import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { userService } from 'services/user/userService';

// Define the Reaction type
interface Reaction {
  userId: string; // Adjust the type based on your actual userId type
}

// Define the User type
interface User {
  id: string;
  imgUrl: string;
  name: string;
  profession: string;
}

// Define the props for the LikePreview component
interface LikePreviewProps {
  reaction: Reaction | null; // Allow for null if reaction can be absent
}

export function LikePreview({ reaction }: LikePreviewProps) {
  const [user, setUser] = useState<User | null>(null); // User can be null initially

  const navigate = useNavigate();

  const loadUser = async (id: string) => {
    if (!reaction) return;
    const userPost = await userService.getById(id);
    setUser(userPost);
  };

  useEffect(() => {
    if (reaction) {
      loadUser(reaction.userId);
    }
  }, [reaction]);

  if (!user) return null;

  return (
    <section className="like-preview">
      <div
        className="container-name"
        onClick={() => navigate(`/profile/${user.id}`)}
      >
        <div className="img-container">
          <img src={user.imgUrl} alt={user.name} className="img" />
        </div>
        <div className="name">
          <p>{user.name}</p>
          <p>{user.profession}</p>
        </div>
      </div>
      <div>
        <button>Connect</button>
      </div>
    </section>
  );
}

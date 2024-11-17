import React from 'react';
import {
  ArticleContainer,
  EventContainer,
  PostContainer, // Now PostContainer will be the textarea itself
} from './style/StyledPosts';

interface PostInputContainerProps {
  postType: 'default' | 'event' | 'article';
  postContent: string | Record<string, string>;
  setPostContent: (content: string | Record<string, string>) => void;
}

export const PostInputContainer: React.FC<PostInputContainerProps> = ({
  postType,
  postContent,
  setPostContent,
}) => {
  // Handle content change based on postType
  const handleContentChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (postType === 'default') {
      setPostContent(e.target.value); // Simple string content for 'default'
    } else if (typeof postContent === 'object') {
      setPostContent({
        ...postContent,
        body: e.target.value, // Update 'body' for event/article types
      });
    }
  };

  // For 'event' type, render event-specific fields
  if (postType === 'event') {
    return (
      <EventContainer className="event-input-container">
        <input
          type="text"
          placeholder="Event Title"
          onChange={(e) =>
            setPostContent({
              ...(typeof postContent === 'object' ? postContent : {}),
              title: e.target.value,
            })
          }
          className="event-title-input"
        />
        <input
          type="date"
          placeholder="Event Date"
          onChange={(e) =>
            setPostContent({
              ...(typeof postContent === 'object' ? postContent : {}),
              date: e.target.value,
            })
          }
          className="event-date-input"
        />
        <input
          type="text"
          placeholder="Location"
          onChange={(e) =>
            setPostContent({
              ...(typeof postContent === 'object' ? postContent : {}),
              location: e.target.value,
            })
          }
          className="event-location-input"
        />
      </EventContainer>
    );
  }

  // For 'article' type, render article-specific fields
  if (postType === 'article') {
    return (
      <ArticleContainer className="article-input-container">
        <input
          type="text"
          placeholder="Article Title"
          onChange={(e) =>
            setPostContent({
              ...(typeof postContent === 'object' ? postContent : {}),
              title: e.target.value,
            })
          }
          className="article-title-input"
        />
        <textarea
          placeholder="Write your article here..."
          onChange={(e) =>
            setPostContent({
              ...(typeof postContent === 'object' ? postContent : {}),
              content: e.target.value,
            })
          }
          className="article-content-input"
        />
      </ArticleContainer>
    );
  }

  // Default: use PostContainer as the textarea for 'default' postType
  return (
    <PostContainer
      className="input-container"
      placeholder="Start a post"
      value={
        typeof postContent === 'string' ? postContent : postContent.body || ''
      }
      onChange={handleContentChange}
    />
  );
};

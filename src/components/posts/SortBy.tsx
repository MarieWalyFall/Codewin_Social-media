import React from 'react';
import { SortByOptions } from 'types';
import { StyledSortBy } from './style/StyledPosts';

interface SortByProps {
  onSetSort: (value: SortByOptions) => void;
}

export const SortBy: React.FC<SortByProps> = ({ onSetSort }) => {
  return (
    <StyledSortBy className="sort-by">
      <hr className="divider" />
      <form action="" className="sort-container">
        <label htmlFor="sortBy" className="label">
          Sort by:
          <select
            name="sortBy"
            id="opts"
            onChange={(e) => {
              onSetSort(e.target.value as SortByOptions);
            }}
            defaultValue={'date-newest'}
          >
            <option value="date-newest">Newest</option>
            <option value="date-oldest">Oldest</option>
          </select>
        </label>
      </form>
    </StyledSortBy>
  );
};

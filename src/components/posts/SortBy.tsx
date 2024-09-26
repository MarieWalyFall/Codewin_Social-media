import React from 'react';

interface SortByProps {
  onSetSort: (value: string) => void;
}

export const SortBy: React.FC<SortByProps> = ({ onSetSort }) => {
  return (
    <section className="sort-by">
      <hr className="divider" />
      <form action="" className="sort-container">
        <label htmlFor="sortBy" className="label">
          Sort by:
          <select
            name="sortBy"
            id="opts"
            onChange={(e) => {
              onSetSort(e.target.value);
            }}
          >
            <option value="-1">Newest</option>
            <option value="1">Oldest</option>
          </select>
        </label>
      </form>
    </section>
  );
};

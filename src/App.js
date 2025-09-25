import React, { useState } from 'react';

// MODIFIED by the Component Builder to include filter/sort controls
const SearchForm = ({ onSearch, onSortByCost, onSortByTime, onToggleEcoFriendly, showFilters }) => {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    if (from && to) {
      onSearch(from, to);
    }
  };

  return (
    <div>
      <form className="search-form" onSubmit={handleSubmit}>
        <input
          type="text"
          className="search-input"
          placeholder="From"
          value={from}
          onChange={(e) => setFrom(e.target.value)}
        />
        <input
          type="text"
          className="search-input"
          placeholder="To"
          value={to}
          onChange={(e) => setTo(e.target.value)}
        />
        <button type="submit" className="search-button">Search</button>
      </form>

      {/* NEW UI: Filter and Sort buttons */}
      {showFilters && (
        <div className="filter-controls">
          <button onClick={onSortByCost}>Sort by Cost</button>
          <button onClick={onSortByTime}>Sort by Time</button>
          <button onClick={onToggleEcoFriendly}>Show Eco-Friendly Only</button>
        </div>
      )}
    </div>
  );
};

export default SearchForm;


import React from 'react';

/**
 * Renders a search form with inputs and filter/sort buttons.
 * @param {object} props - The component props.
 * @param {Function} props.onSearch - Callback for form submission.
 * @param {Function} props.onSortByCost - Callback for sorting by cost.
 * @param {Function} props.onSortByTime - Callback for sorting by time.
 * @param {Function} props.onToggleEcoFriendly - Callback for toggling eco-friendly filter.
 */
const SearchForm = ({
  onSearch,
  onSortByCost,
  onSortByTime,
  onToggleEcoFriendly,
}) => {
  const handleSubmit = (event) => {
    event.preventDefault();
    const from = event.target.elements.from.value;
    const to = event.target.elements.to.value;
    onSearch({ from, to });
  };

  return (
    // A wrapper for both the form and the controls
    <div>
      <form className="search-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="from"
          className="search-input"
          placeholder="From"
          required
        />
        <input
          type="text"
          name="to"
          className="search-input"
          placeholder="To"
          required
        />
        <button type="submit" className="search-button">
          Search
        </button>
      </form>

      {/* Container for the new filter and sort controls */}
      <div className="filter-controls">
        <button type="button" className="filter-button" onClick={onSortByCost}>
          Sort by Cost
        </button>
        <button type="button" className="filter-button" onClick={onSortByTime}>
          Sort by Time
        </button>
        <button type="button" className="filter-button" onClick={onToggleEcoFriendly}>
          Show Eco-Friendly Only
        </button>
      </div>
    </div>
  );
};

export default SearchForm;

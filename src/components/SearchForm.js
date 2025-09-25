import React from 'react';

/**
 * Renders a search form with 'From' and 'To' inputs.
 * @param {object} props - The component props.
 * @param {Function} props.onSearch - Callback function to execute on form submission.
 */
const SearchForm = ({ onSearch }) => {
  const handleSubmit = (event) => {
    event.preventDefault();
    const from = event.target.elements.from.value;
    const to = event.target.elements.to.value;
    onSearch({ from, to });
  };

  return (
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
  );
};

export default SearchForm;



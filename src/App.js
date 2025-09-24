import React, { useState } from 'react';

// --- MOCK DATA (from data.json) ---
// In a real app, this would be fetched from an API.
const travelData = [
  {
    "from": "New York",
    "to": "London",
    "options": [
      { "id": 1, "type": "Flight", "carrier": "British Airways", "departureTime": "08:00", "arrivalTime": "20:00", "duration": "8h", "price": 650 },
      { "id": 2, "type": "Flight", "carrier": "Virgin Atlantic", "departureTime": "10:30", "arrivalTime": "22:30", "duration": "8h", "price": 680 },
      { "id": 3, "type": "Flight", "carrier": "American Airlines", "departureTime": "21:00", "arrivalTime": "09:00", "duration": "8h", "price": 620 }
    ]
  },
  {
    "from": "Paris",
    "to": "Amsterdam",
    "options": [
      { "id": 4, "type": "Train", "carrier": "Thalys", "departureTime": "07:15", "arrivalTime": "10:30", "duration": "3h 15m", "price": 120 },
      { "id": 5, "type": "Bus", "carrier": "FlixBus", "departureTime": "09:00", "arrivalTime": "16:00", "duration": "7h", "price": 45 },
      { "id": 6, "type": "Train", "carrier": "Eurostar", "departureTime": "11:00", "arrivalTime": "14:15", "duration": "3h 15m", "price": 135 }
    ]
  },
  {
    "from": "Tokyo",
    "to": "Kyoto",
    "options": [
      { "id": 7, "type": "Train", "carrier": "Shinkansen", "departureTime": "14:00", "arrivalTime": "16:15", "duration": "2h 15m", "price": 130 },
      { "id": 8, "type": "Train", "carrier": "Shinkansen", "departureTime": "15:30", "arrivalTime": "17:45", "duration": "2h 15m", "price": 130 }
    ]
  },
  // --- ADDED DATA: New route from Kochi to Kolkata ---
  {
    "from": "Kochi Grand Hayyat",
    "to": "Kolkata",
    "options": [
      { "id": 9, "type": "Flight", "carrier": "IndiGo", "departureTime": "06:30", "arrivalTime": "09:00", "duration": "2h 30m", "price": 150 },
      { "id": 10, "type": "Flight", "carrier": "Air India", "departureTime": "10:00", "arrivalTime": "12:45", "duration": "2h 45m", "price": 175 },
      { "id": 11, "type": "Train", "carrier": "Indian Railways", "departureTime": "19:00", "arrivalTime": "05:00", "duration": "34h", "price": 50 }
    ]
  }
];

// --- STYLES (from App.css) ---
const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

  body {
    font-family: 'Inter', sans-serif;
    background-color: #f0f4f8;
    color: #1e293b;
    margin: 0;
    padding: 20px;
  }

  .app-container {
    max-width: 800px;
    margin: 0 auto;
    background-color: #ffffff;
    border-radius: 12px;
    box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
    overflow: hidden;
  }

  .app-header {
    background-color: #4f46e5;
    color: white;
    padding: 24px;
    text-align: center;
  }

  .app-header h1 {
    margin: 0;
    font-size: 2.25rem;
    font-weight: 700;
  }
  
  .app-header p {
    margin: 4px 0 0;
    opacity: 0.9;
  }

  .content-wrapper {
    padding: 24px;
  }

  /* SearchForm Styles */
  .search-form {
    display: flex;
    flex-direction: column;
    gap: 16px;
    margin-bottom: 24px;
  }
  
  .search-form-inputs {
    display: flex;
    gap: 16px;
    flex-wrap: wrap;
  }

  .search-form input {
    flex-grow: 1;
    padding: 12px;
    border: 1px solid #cbd5e1;
    border-radius: 8px;
    font-size: 1rem;
    transition: border-color 0.2s, box-shadow 0.2s;
  }

  .search-form input:focus {
    outline: none;
    border-color: #4f46e5;
    box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.2);
  }

  .search-form button {
    background-color: #4f46e5;
    color: white;
    border: none;
    padding: 12px 20px;
    border-radius: 8px;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: background-color 0.2s;
    width: 100%;
  }
  
  @media (min-width: 640px) {
    .search-form {
      flex-direction: row;
      align-items: center;
    }
    .search-form button {
      width: auto;
    }
  }

  .search-form button:hover {
    background-color: #4338ca;
  }

  /* ResultsDisplay & ResultCard Styles */
  .results-container h2 {
    font-size: 1.5rem;
    margin-bottom: 16px;
    color: #334155;
  }

  .results-grid {
    display: grid;
    gap: 16px;
  }

  .result-card {
    background-color: #f8fafc;
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    padding: 16px;
    display: flex;
    flex-direction: column;
    gap: 12px;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1);
  }
  
  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .card-header .type {
    background-color: #e0e7ff;
    color: #4338ca;
    padding: 4px 10px;
    border-radius: 9999px;
    font-weight: 500;
    font-size: 0.875rem;
  }
  
  .card-header .price {
    font-size: 1.5rem;
    font-weight: 700;
    color: #1e293b;
  }
  
  .card-body .carrier {
    font-weight: 600;
    font-size: 1.125rem;
    color: #475569;
  }
  
  .card-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #64748b;
    font-size: 0.875rem;
  }
  
  .no-results {
    text-align: center;
    padding: 40px;
    background-color: #f8fafc;
    border-radius: 8px;
  }
`;

// --- COMPONENT: ResultCard.js ---
const ResultCard = ({ option }) => {
  return (
    <div className="result-card">
      <div className="card-header">
        <span className="type">{option.type}</span>
        <span className="price">${option.price}</span>
      </div>
      <div className="card-body">
        <p className="carrier">{option.carrier}</p>
      </div>
      <div className="card-footer">
        <span>{option.departureTime} &rarr; {option.arrivalTime}</span>
        <span>{option.duration}</span>
      </div>
    </div>
  );
};

// --- COMPONENT: ResultsDisplay.js ---
const ResultsDisplay = ({ searchResults }) => {
  return (
    <div className="results-container">
      <h2>Available Options</h2>
      {searchResults.length > 0 ? (
        <div className="results-grid">
          {searchResults.map(option => (
            <ResultCard key={option.id} option={option} />
          ))}
        </div>
      ) : (
        <div className="no-results">
          <p>No results found. Please enter a valid route to see options.</p>
        </div>
      )}
    </div>
  );
};

// --- COMPONENT: SearchForm.js ---
const SearchForm = ({ handleSearch }) => {
  const [from, setFrom] = useState('Kochi Grand Hayyat');
  const [to, setTo] = useState('Kolkata');

  const handleSubmit = (event) => {
    event.preventDefault();
    if (from && to) {
      handleSearch(from, to);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="search-form">
      <div className="search-form-inputs">
        <input
          type="text"
          value={from}
          onChange={(e) => setFrom(e.target.value)}
          placeholder="From"
          aria-label="Departure location"
        />
        <input
          type="text"
          value={to}
          onChange={(e) => setTo(e.target.value)}
          placeholder="To"
          aria-label="Arrival location"
        />
      </div>
      <button type="submit">Search</button>
    </form>
  );
};


// --- MAIN COMPONENT: App.js (The Assembler) ---
export default function App() {
  const [searchResults, setSearchResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState({ from: '', to: '' });

  const handleSearch = (from, to) => {
    setSearchQuery({ from, to });
    const matchingRoute = travelData.find(
      route =>
        route.from.toLowerCase() === from.toLowerCase() &&
        route.to.toLowerCase() === to.toLowerCase()
    );

    if (matchingRoute) {
      setSearchResults(matchingRoute.options);
    } else {
      setSearchResults([]);
    }
  };
  
  React.useEffect(() => {
    handleSearch('Kochi Grand Hayyat', 'Kolkata');
  }, []);

  return (
    <>
      <style>{styles}</style>
      <div className="app-container">
        <header className="app-header">
          <h1>TravelMate</h1>
          <p>Your simple travel planner</p>
        </header>
        <main className="content-wrapper">
          <SearchForm handleSearch={handleSearch} />
          <ResultsDisplay searchResults={searchResults} />
        </main>
      </div>
    </>
  );
}


import React, { useState, useEffect } from 'react';

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

// --- STYLES (from App.css, adapted for this component structure) ---
const styles = `
  /* -------------------------------------------------- */
  /* 1. General & Base Styles w/ CSS Variables          */
  /* -------------------------------------------------- */
  :root {
      /* Light Mode (Default) */
      --primary-color: #005A9C;
      --primary-color-darker: #004B80;
      --background-color: #F8F9FA;
      --text-color: #333333;
      --text-color-light: #555;
      --card-background: #FFFFFF;
      --card-shadow: rgba(0, 0, 0, 0.08);
      --border-color: #dcdcdc;
      --focus-shadow: rgba(0, 90, 156, 0.2);
      --switch-bg: #ccc;
      --switch-handle: white;
  }

  body.dark-mode {
      /* Dark Mode */
      --primary-color: #4dabf7;
      --primary-color-darker: #3690e3;
      --background-color: #121212;
      --text-color: #e0e0e0;
      --text-color-light: #a0a0a0;
      --card-background: #1e1e1e;
      --card-shadow: rgba(0, 0, 0, 0.4);
      --border-color: #444;
      --focus-shadow: rgba(77, 171, 247, 0.3);
      --switch-bg: #005A9C;
      --switch-handle: #121212;
  }

  * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
  }

  body {
      font-family: 'Inter', 'Poppins', sans-serif;
      background-color: var(--background-color);
      color: var(--text-color);
      line-height: 1.6;
      transition: background-color 0.3s ease, color 0.3s ease;
      padding: 20px;
  }

  /* -------------------------------------------------- */
  /* 2. Main App Layout & Typography                  */
  /* -------------------------------------------------- */
  .app-container {
      max-width: 800px;
      margin: 0 auto;
      text-align: center;
  }

  .app-header {
      padding: 24px;
      text-align: center;
  }
  
  .logo-container {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 2rem;
  }

  .logo-icon {
      width: 50px;
      height: 50px;
      margin-right: 15px;
      fill: var(--primary-color);
      transition: fill 0.3s ease;
  }

  .logo-text {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      font-weight: 700;
      font-size: 2.5rem;
      color: var(--primary-color);
      user-select: none;
      letter-spacing: 0.02em;
      transition: color 0.3s ease;
  }

  .app-header h1 {
      font-size: 2.5rem;
      font-weight: 700;
      color: var(--primary-color);
      text-align: center;
      margin-bottom: 8px;
      transition: color 0.3s ease;
  }

  .app-header p {
      text-align: center;
      font-size: 1.125rem;
      max-width: 600px;
      margin: 0 auto 40px auto;
      color: var(--text-color-light);
      transition: color 0.3s ease;
  }

  /* -------------------------------------------------- */
  /* 3. Search Form                                   */
  /* -------------------------------------------------- */
  .search-form {
      display: flex;
      gap: 16px;
      align-items: center;
      margin-bottom: 48px;
  }

  .search-form input {
      flex-grow: 1;
      padding: 14px 16px;
      font-size: 1rem;
      border: 1px solid var(--border-color);
      border-radius: 8px;
      background-color: var(--card-background);
      color: var(--text-color);
      transition: border-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out, background-color 0.3s ease, color 0.3s ease;
  }

  .search-form input:focus {
      outline: none;
      border-color: var(--primary-color);
      box-shadow: 0 0 0 3px var(--focus-shadow);
  }

  .search-form button {
      padding: 14px 28px;
      font-size: 1rem;
      font-weight: 600;
      color: #FFFFFF;
      background-color: var(--primary-color);
      border: none;
      border-radius: 8px;
      cursor: pointer;
      transition: background-color 0.2s ease-in-out, transform 0.1s ease;
  }

  .search-form button:hover {
      background-color: var(--primary-color-darker);
  }

  .search-form button:active {
      transform: translateY(1px);
  }

  /* -------------------------------------------------- */
  /* 4. Results Section                               */
  /* -------------------------------------------------- */
  .results-container {
      text-align: left;
  }

  .results-container h2 {
    font-size: 1.5rem;
    margin-bottom: 16px;
    color: var(--text-color);
  }
  
  .results-grid {
      display: grid;
      gap: 20px;
  }

  .result-card {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 24px;
      background-color: var(--card-background);
      border-radius: 12px;
      box-shadow: 0 4px 12px var(--card-shadow);
      transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out, background-color 0.3s ease;
      text-align: left;
  }

  .result-card:hover {
      transform: translateY(-4px);
      box-shadow: 0 6px 16px var(--card-shadow);
  }
  
  .card-header .type {
      font-size: 1.25rem;
      font-weight: 600;
      color: var(--primary-color);
      transition: color 0.3s ease;
  }
  
  .card-body {
    margin-top: 4px;
  }
  
  .card-body .carrier {
      font-size: 1rem;
      color: var(--text-color-light);
  }

  .card-footer {
      display: flex;
      align-items: center;
      gap: 32px;
      text-align: right;
  }

  .card-footer div {
      display: flex;
      flex-direction: column;
  }

  .card-footer .label {
      font-size: 0.875rem;
      color: var(--text-color-light);
      margin-bottom: 2px;
      transition: color 0.3s ease;
  }

  .card-footer .value {
      font-size: 1rem;
      font-weight: 500;
      color: var(--text-color);
  }
  
  .no-results {
    text-align: center;
    padding: 40px;
    background-color: var(--card-background);
    border-radius: 12px;
    box-shadow: 0 4px 12px var(--card-shadow);
  }


  /* -------------------------------------------------- */
  /* 5. Responsive Design                             */
  /* -------------------------------------------------- */
  @media (max-width: 640px) {
      .logo-text {
          font-size: 32px; /* 2rem */
      }

      .app-header h1 {
          font-size: 2rem;
      }
      .app-header p {
          font-size: 1rem;
      }

      .search-form {
          flex-direction: column;
          align-items: stretch;
      }

      .result-card {
          flex-direction: column;
          align-items: flex-start;
          gap: 16px;
      }

      .card-footer {
          justify-content: space-between;
          width: 100%;
          text-align: left;
          gap: 16px;
      }
  }
`;

// --- COMPONENT: ResultCard.js ---
const ResultCard = ({ option }) => {
  return (
    <div className="result-card">
        <div>
            <div className="card-header">
                <span className="type">{option.type}</span>
            </div>
            <div className="card-body">
                <p className="carrier">{option.carrier}</p>
            </div>
        </div>
      <div className="card-footer">
          <div>
            <span className="label">Depart</span>
            <span className="value">{option.departureTime}</span>
          </div>
          <div>
            <span className="label">Arrive</span>
            <span className="value">{option.arrivalTime}</span>
          </div>
          <div>
            <span className="label">Duration</span>
            <span className="value">{option.duration}</span>
          </div>
          <div>
            <span className="label">Price</span>
            <span className="value">${option.price}</span>
          </div>
      </div>
    </div>
  );
};

// --- COMPONENT: ResultsDisplay.js ---
const ResultsDisplay = ({ searchResults }) => {
  return (
    <div className="results-container">
      {searchResults.length > 0 ? (
          <>
            <h2>Available Options</h2>
            <div className="results-grid">
              {searchResults.map(option => (
                <ResultCard key={option.id} option={option} />
              ))}
            </div>
          </>
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
 
  useEffect(() => {
    // Perform an initial search on component mount
    handleSearch('Kochi Grand Hayyat', 'Kolkata');
  }, []);

  return (
    <>
      <style>{styles}</style>
      <div className="app-container">
        <header className="app-header">
            <div className="logo-container">
                <svg className="logo-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zM12 11.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"></path></svg>
                <div className="logo-text">TravelMate</div>
            </div>
            <h1>Find Your Next Journey</h1>
            <p>Enter your origin and destination to see the best options.</p>
        </header>
        <main className="content-wrapper">
          <SearchForm handleSearch={handleSearch} />
          <ResultsDisplay searchResults={searchResults} />
        </main>
      </div>
    </>
  );
}

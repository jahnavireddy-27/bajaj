
import React, { useState } from 'react';
import './App.css';
const url = 'http://localhost:3001/';

function App() {
  const [jsonInput, setJsonInput] = useState('');
  const [responseData, setResponseData] = useState(null);
  const [visibleSections, setVisibleSections] = useState({
    numbers: true,
    alphabets: true,
    highestAlphabet: true
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      // Validate and parse JSON input
      let parsedData;
      try {
        parsedData = JSON.parse(jsonInput);
        if (!Array.isArray(parsedData)) {
          throw new Error('Input is not an array');
        }
      } catch (err) {
        console.error('Invalid JSON input:', err);
        setResponseData({ error: 'Invalid JSON input' });
        return;
      }
  
      // Send POST request
      const response = await fetch(url + 'bfhl', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ data: parsedData })
      });

      console.log('Response status:', response.status); // Added for debugging
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json();
      console.log('Response data:', data); // Added for debugging
      setResponseData(data);
    } catch (error) {
      console.error('Error:', error);
      setResponseData({ error: 'Failed to fetch data from backend' });
    }
  };
  
  const handleToggleVisibility = (section) => {
    setVisibleSections(prevState => ({
      ...prevState,
      [section]: !prevState[section]
    }));
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>API HOSTING</h1>
        <form className='mt-5'onSubmit={handleSubmit}>
          <textarea className= "form-control "
            value={jsonInput}
            onChange={(e) => setJsonInput(e.target.value)}
            placeholder='Enter JSON here'
          />
          <button className= "btn btn-outline-success" type="submit">Submit</button>
        </form>

        {responseData && (
          <div className='container mt-5'>
            <h2>Response:</h2>
            <button className= "btn btn-outline-primary mx-3" onClick={() => handleToggleVisibility('numbers')}>Numbers</button>
            <button className= "btn btn-outline-primary mx-3"onClick={() => handleToggleVisibility('alphabets')}>Alphabets</button>
            <button className= "btn btn-outline-primary mx-3" onClick={() => handleToggleVisibility('highestAlphabet')}>Highest Alphabet</button>

            {visibleSections.numbers && (
              <div className='container mt-5'>
                <h3>Numbers:</h3>
                <p>{responseData.numbers ? responseData.numbers.join(', ') : 'No numbers found'}</p>
              </div>
            )}

            {visibleSections.alphabets && (
              <div className='container mt-5'>
                <h3>Alphabets:</h3>
                <p>{responseData.alphabets ? responseData.alphabets.join(', ') : 'No alphabets found'}</p>
              </div>
            )}

            {visibleSections.highestAlphabet && (
              <div className='container mt-5'>
                <h3>Highest Alphabet:</h3>
                <p>{responseData.highest_alphabet ? responseData.highest_alphabet.join(', ') : 'No highest alphabet found'}</p>
              </div>
            )}
          </div>
        )}
      </header>
    </div>
  );
}

export default App;


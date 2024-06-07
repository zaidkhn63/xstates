import React, { useState, useEffect } from 'react';

const LocationSelector = () => {
  // State variables to hold selected country, state, and city
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [selectedCity, setSelectedCity] = useState('');

  // State variables to hold lists of countries, states, and cities
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
console.log(states)
  // Function to fetch list of countries from the API
  const fetchCountries = async () => {
    try {
      const response = await fetch('https://crio-location-selector.onrender.com/countries');
      const data = await response.json();
      setCountries(data); // Set the list of countries directly
    } catch (error) {
      console.error('Error fetching countries:', error);
    }
  };

  // Function to fetch list of states for a selected country from the API
  const fetchStates = async (country) => {
    try {
      const response = await fetch(`https://crio-location-selector.onrender.com/country=${country}/states`);
      console.log('resopnse',response)
      const data = await response.json();
      setStates(data.map(state => state));
    } catch (error) {
      console.error('Error fetching states:', error);
    }
  };

  // Function to fetch list of cities for a selected state in a selected country from the API
  const fetchCities = async (country, state) => {
    try {
      const response = await fetch(`https://crio-location-selector.onrender.com/country=${country}/state=${state}/cities`);
      const data = await response.json();
      setCities(data.map(city => city));
    } catch (error) {
      console.error('Error fetching cities:', error);
    }
  };

  // useEffect hook to fetch countries data on component mount
  useEffect(() => {
    fetchCountries();
  }, []);

  // Event handler to handle country selection
  const handleCountryChange = (e) => {
    setSelectedCountry(e.target.value);
    setSelectedState('');
    setSelectedCity('');
    fetchStates(e.target.value);
  };

  // Event handler to handle state selection
  const handleStateChange = (e) => {
    setSelectedState(e.target.value);
    setSelectedCity('');
    fetchCities(selectedCountry, e.target.value);
  };

  // Event handler to handle city selection
  const handleCityChange = (e) => {
    setSelectedCity(e.target.value);
  };

  return (
    <div>
      <h1>Select Location</h1>
      <div>
        <label htmlFor="country">Select Country:</label>
        <select id="country" value={selectedCountry} onChange={handleCountryChange}>
          <option value="">-- Select Country --</option>
          {countries.map((country, index) => (
            <option key={index} value={country}>
              {country}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="state">Select State:</label>
        <select id="state" value={selectedState} onChange={handleStateChange}>
          <option value="">-- Select State --</option>
          {states.map((state, index) => (
            <option key={index} value={state}>
              {state}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="city">Select City:</label>
        <select id="city" value={selectedCity} onChange={handleCityChange}>
          <option value="">-- Select City --</option>
          {cities.map((city, index) => (
            <option key={index} value={city}>
              {city}
            </option>
          ))}
        </select>
      </div>
      {selectedCountry && selectedState && selectedCity && (
        <p>You selected {selectedCity}, {selectedState}, {selectedCountry}</p>
      )}
    </div>
  );
};

export default LocationSelector;

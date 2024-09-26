import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CountryFlags = () => {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get('https://xcountries-backend.azurewebsites.net/all');
        setCountries(response.data);
      } catch (err) {
        console.error("Error fetching data: ", err);
        setError("Error fetching data: " + err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCountries();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="flag-grid p-4">
      {countries.map((country) => (
        <div key={country.name} className="country-card">
          <img
            src={country.flag}
            alt={`Flag of ${country.name}`}
            className="w-full h-auto"
          />
          <p>{country.name}</p>
        </div>
      ))}
    </div>
  );
};

export default CountryFlags;

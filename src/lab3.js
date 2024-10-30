/* // CountryDetail.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const CountryDetail = () => {
  const { code } = useParams();
  const [country, setCountry] = useState(null);

  useEffect(() => {
    fetch(`https://restcountries.com/v3.1/alpha/${code}`)
      .then(response => response.json())
      .then(data => setCountry(data[0]));
  }, [code]);

  if (!country) return <div>Loading...</div>;

  return (
    <div>
      <h1>{country.name.common}</h1>
      <p>Capital: {country.capital}</p>
      <p>Region: {country.region}</p>
      <p>Coordinates: {country.latlng.join(', ')}</p>
      <a 
        href={`https://www.google.com/maps?q=${country.latlng[0]},${country.latlng[1]}`} 
        target="_blank" 
        rel="noopener noreferrer"
      >
        Google Maps дээр харуулах
      </a>
      {/* Энд 10 төрлийн мэдээллийг нэмж оруулна }
    </div>
  );
};

export default CountryDetail;  */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';

const ITEMS_PER_PAGE = 10;

const App = () => {
  const [countries, setCountries] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCountries, setTotalCountries] = useState(0);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchCountries = async () => {
      const response = await axios.get(`https://restcountries.com/v3.1/all`);
      setCountries(response.data);
      setTotalCountries(response.data.length);
    };
    fetchCountries();
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    const response = await axios.get(`https://restcountries.com/v3.1/name/${search}`);
    setCountries(response.data);
    setTotalCountries(response.data.length);
    setCurrentPage(1); // Reset to the first page
  };

  const handlePagination = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const displayedCountries = countries.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  return (
    <Router>
      <div>
        <h1>Countries</h1>
        <form onSubmit={handleSearch}>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by country name"
          />
          <button type="submit">Search</button>
        </form>

        <ul>
          {displayedCountries.map((country) => (
            <li key={country.cca3}>
              <Link to={`/country/${country.cca3}`}>
                {country.name.common}
              </Link>
            </li>
          ))}
        </ul>

        <Pagination
          currentPage={currentPage}
          totalCountries={totalCountries}
          itemsPerPage={ITEMS_PER_PAGE}
          onPageChange={handlePagination}
        />

        <Switch>
          <Route path="/country/:code" component={CountryDetail} />
        </Switch>
      </div>
    </Router>
  );
};

const Pagination = ({ currentPage, totalCountries, itemsPerPage, onPageChange }) => {
  const totalPages = Math.ceil(totalCountries / itemsPerPage);

  return (
    <div>
      {Array.from({ length: totalPages }, (_, index) => (
        <button key={index + 1} onClick={() => onPageChange(index + 1)}>
          {index + 1}
        </button>
      ))}
    </div>
  );
};

const CountryDetail = ({ match }) => {
  const [country, setCountry] = useState(null);

  useEffect(() => {
    const fetchCountryDetail = async () => {
      const response = await axios.get(`https://restcountries.com/v3.1/alpha/${match.params.code}`);
      setCountry(response.data[0]);
    };
    fetchCountryDetail();
  }, [match.params.code]);

  if (!country) return <div>Loading...</div>;

  return (
    <div>
      <h2>{country.name.common}</h2>
      <p>Capital: {country.capital}</p>
      <p>Population: {country.population}</p>
      <p>Area: {country.area} km²</p>
      <p>Region: {country.region}</p>
      <p>Subregion: {country.subregion}</p>
      <p>Languages: {Object.values(country.languages).join(', ')}</p>
      <p>Currencies: {Object.values(country.currencies).map(curr => curr.name).join(', ')}</p>
      <p>Coordinates: {country.latlng.join(', ')}</p>
      <a href={`https://www.google.com/maps/search/?api=1&query=${country.latlng[0]},${country.latlng[1]}`} target="_blank" rel="noopener noreferrer">
        View on Google Maps
      </a>
    </div>
  );
};

export default App;


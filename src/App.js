import React, { useEffect, useState } from "react";
import CountryList from "./CountryList";
import CountryDetail from "./CountryDetail";
import './App.css';

const App = () => {
  const [countries, setCountries] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const countriesPerPage = 10;

  useEffect(() => {
    const fetchCountries = async () => {
      const response = await fetch("https://restcountries.com/v3.1/all");
      const data = await response.json();
      setCountries(data);
    };
    fetchCountries();
  }, []);

  const indexOfLastCountry = currentPage * countriesPerPage;
  const indexOfFirstCountry = indexOfLastCountry - countriesPerPage;
  const currentCountries = countries.slice(indexOfFirstCountry, indexOfLastCountry);

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  const handleSearch = async () => {
    const response = await fetch(`https://restcountries.com/v3.1/name/${searchTerm}`);
    const data = await response.json();
    setCountries(data);
  };

  const handleCountryClick = (country) => {
    setSelectedCountry(country);
  };

  // Буцах функц
  const handleBack = () => {
    setSelectedCountry(null);
  };

  return (
    <div>
      <h1>Дэлхийн улсууд</h1>
      <input
        type="text"
        placeholder="Хайх улсын нэрээ бичнэ үү..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button onClick={handleSearch}>Хайх</button>
      {selectedCountry ? (
        <CountryDetail country={selectedCountry} onBack={handleBack} />
      ) : (
        <CountryList
          countries={currentCountries}
          onCountryClick={handleCountryClick}
          handlePageChange={handlePageChange}
          currentPage={currentPage}
          totalPages={Math.ceil(countries.length / countriesPerPage)}
        />
      )}
    </div>
  );
};

export default App;

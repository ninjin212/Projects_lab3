import React from "react";

const CountryDetail = ({ country, onBack }) => {
  return (
    <div className="country-detail">
      {/* Буцах товч (>) */}
      <button onClick={onBack} style={{ cursor: "pointer", marginBottom: "20px" }}>
        &gt; 
      </button>

      <h2>{country.name.common}</h2>
      <img
        src={country.flags.png}
        alt={`Flag of ${country.name.common}`}
        style={{ width: "150px", height: "auto", marginBottom: "20px" }}
      />
      <p>Хүн ам: {country.population}</p>
      <p>Нийслэл: {country.capital ? country.capital[0] : "Мэдээлэл байхгүй"}</p>
      <p>Газар зүйн байршил: {country.latlng[0]}, {country.latlng[1]}</p>
      <p>Бүс: {country.region}</p>
      <a href={`https://www.google.com/maps?q=${country.latlng[0]},${country.latlng[1]}`} target="_blank" rel="noopener noreferrer">
        Google Maps дээр харах
      </a>
    </div>
  );
};

export default CountryDetail;

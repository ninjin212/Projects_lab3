import React from "react";

const CountryList = ({ countries, onCountryClick, handlePageChange, currentPage, totalPages }) => {
  return (
    <div>
      <ul>
        {countries.map((country) => (
          <li key={country.cca3}>
            <img
              src={country.flags.png} 
              alt={`Flag of ${country.name.common}`} 
              style={{ width: "50px", height: "auto", marginRight: "10px" }}
            />
            <span>{country.name.common}</span> - {country.population} хүн амтай
            {/* > тэмдэгт дээр дарахад улс орны дэлгэрэнгүй мэдээллийг харуулах */}
            <button
              style={{ marginLeft: "10px", cursor: "pointer" }}
              onClick={() => onCountryClick(country)}
            >
              &gt;
            </button>
          </li>
        ))}
      </ul>
      <div className="pagination">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => handlePageChange(page)}
            className={currentPage === page ? "active" : ""}
          >
            {page}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CountryList;

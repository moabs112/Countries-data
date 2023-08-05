import React, { useEffect, useState } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';

const PopulationData = () => {
  const [countriesData, setCountriesData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchPopulationData = async () => {
      try {
        const response = await axios.get("https://restcountries.com/v2/all");
        setCountriesData(response.data);
        setFilteredData(response.data);
      } catch (error) {
        console.error("Error fetching population data:", error);
      }
    };

    fetchPopulationData();
  }, []);

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    const filtered = countriesData.filter((country) =>
      country.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredData(filtered);
  };

  const columns = [
    {
      name: "Country",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Population",
      selector: (row) => row.population,
      sortable: true,
      cell: (row) => {
        if (row.population) {
          const populationWithCommas = row.population.toLocaleString();
          return <div>{populationWithCommas}</div>;
        }
        return <div>-</div>;
      },
    },
    {
      name: "Area (sq km)",
      selector: (row) => row.area,
      sortable: true,
      cell: (row) => {
        if (row.area) {
          const areaWithCommas = row.area.toLocaleString();
          return <div>{areaWithCommas}</div>;
        }
        return <div>-</div>;
      },
    },
    {
      name: "Capital",
      selector: (row) => row.capital,
      sortable: true,
    },
    {
      name: "Languages",
      selector: (row) => row.languages,
      cell: (row) => {
        if (row.languages && row.languages.length > 0) {
          const languageNames = row.languages.map((language) => language.name);
          return <div>{languageNames.join(", ")}</div>;
        }
        return <div>-</div>;
      },
    },
    {
      name: "Currencies",
      selector: (row) =>
        row.currencies
          ? row.currencies.map((currency) => currency.name).join(", ")
          : "-",
      sortable: true,
    },
    {
      name: "Borders",
      selector: (row) => (row.borders ? row.borders.join(", ") : "-"),
      sortable: true,
    },

    {
      name: "Region",
      selector: (row) => row.region,
      sortable: true,
    },
    {
      name: "Calling Codes",
      selector: (row) => row.callingCodes.join(", "),
      sortable: true,
    },
    {
      name: "Native Name",
      selector: (row) => row.nativeName,
      sortable: true,
    },
    {
      name: "Flag",
      cell: (row) => <img src={row.flags.png} alt={row.name} width="50" />,
      sortable: false,
    },
  ];
  const customStyles = {
    rows: {
      style: {
        fontSize: "15px", // Adjust the font size as per your preference
      },
    },
    cells: {
      style: {
        fontSize: "15px", // Adjust the font size as per your preference
      },
    },
   
  };


  return (
    <div>
      <h2>Population Data</h2>
      <input
        type="text"
        placeholder="Search country"
        value={searchQuery}
        onChange={handleSearchChange}
      />
      <DataTable
        columns={columns}
        data={filteredData}
        striped
        highlightOnHover
        responsive
        pagination
        customStyles={customStyles}
      />
    </div>
  );
};

export default PopulationData;

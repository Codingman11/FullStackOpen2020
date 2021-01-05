import axios from "axios";
import React, { useEffect, useState } from "react";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [newCountry, setNewCountry] = useState([]);
  const api_key = "25b4c230df18ad83b31f61a53d2c0ee4";
  useEffect(() => {
    axios.get("https://restcountries.eu/rest/v2/all").then((res) => {
      setCountries(res.data);
      console.log("Done");
    });
  }, []);

  const getWeather = (name) => {
    axios
      .get(
        `http://api.weatherstack.com/current?access_key=${api_key}
        &query=${name}`
      )
      .then((res) => {
        console.log(res);
      });
  };
  const findCountry = (event) => {
    event.preventDefault();

    const search = countries.filter(
      (country) => country.name === event.target.value
    );

    search.forEach((sea) => {
      const languages = sea.languages;

      const countryObject = [
        {
          name: sea.name,
          capital: sea.capital,
          population: sea.population,
          flag: sea.flag,
          languages: languages,
        },
      ];
      setNewCountry(countryObject);
      getWeather(sea.name);
    });
  };

  return (
    <div>
      find countries <input type="search" onKeyUp={findCountry} />
      <div>
        {newCountry.map((country, i) => (
          <div key={i}>
            <h1>{country.name}</h1>
            <p>{country.capital}</p>
            <p>{country.population}</p>
            <h2>Spoken Langauges</h2>
            {country.languages.map((language) => (
              <li>{language.name}</li>
            ))}
            <img src={country.flag} height="266.5px" width="400px"></img>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;

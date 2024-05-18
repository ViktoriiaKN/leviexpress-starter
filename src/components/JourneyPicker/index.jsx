import React, { useEffect, useState } from "react";
import "./style.css";

const CityOptions = ({ cities }) => {
  return (
    <>
      <option value="">Vyberte</option>
      {cities.map((city) => (
        <option key={city.code} value={city.code}>
          {city.name}
        </option>
      ))}
    </>
  );
};

const DatesOptions = ({ dates }) => {
  return (
    <>
      <option value="">Vyberte</option>
      {dates.map((date) => (
        <option key={date.dateBasic} value={date.dateBasic}>
          {date.dateCs}
        </option>
      ))}
    </>
  );
};

export const JourneyPicker = ({ onJourneyChange }) => {
  const [fromCity, setFromCity] = useState("");
  const [toCity, setToCity] = useState("");
  const [date, setDate] = useState('');
  const [dates, setDates] = useState([])
  const [cities, setCities] = useState([]);

  useEffect(() => {
    const fetchCities = async () => {
      const resp = await fetch(
        "https://apps.kodim.cz/daweb/leviexpress/api/cities"
      );
      const data = await resp.json();
      setCities(data.results);
    };
    fetchCities();

    const fetchDates = async () => {
      const resp = await fetch(
        "https://apps.kodim.cz/daweb/leviexpress/api/dates"
      );
      const data = await resp.json();
      setDates(data.results);
    };
    fetchDates();
  }, []);


  function handleSubmit(event) {
    event.preventDefault();
    console.log(`${fromCity}, ${toCity}, ${date}`);
  }

  return (
    <div className="journey-picker container">
      <h2 className="journey-picker__head">Kam chcete jet?</h2>
      <div className="journey-picker__body">
        <form className="journey-picker__form" onSubmit={handleSubmit}>
          <label>
            <div className="journey-picker__label">Odkud:</div>
            <select
              onChange={(event) => setFromCity(event.target.value)}
              value={fromCity}
            >
              <CityOptions cities={cities} />
            </select>
          </label>
          <label>
            <div className="journey-picker__label">Kam:</div>
            <select
              onChange={(event) => setToCity(event.target.value)}
              value={toCity}
            >
              <CityOptions cities={cities} />
            </select>
          </label>
          <label>
            <div className="journey-picker__label">Datum:</div>
            <select
              onChange={(event) => setDate(event.target.value)}
              value={date}
            >
              <DatesOptions dates={dates} />
            </select>
          </label>
          <div className="journey-picker__controls">
            <button className="btn" type="submit">
              Vyhledat spoj
            </button>
          </div>
        </form>
        <img className="journey-picker__map" src="/map.svg" />
      </div>
    </div>
  );
};

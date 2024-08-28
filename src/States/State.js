import React, { useEffect, useState } from "react";
import "./State.css";

const State = () => {
  const [data, setData] = useState({
    countries: [],
    state: [],
    city: [],
  });
  const [isSelected, setIsSelected] = useState({
    country: "",
    state: "",
    city: "",
  });
  const fetchCountry = async () => {
    const res = await fetch(
      "https://crio-location-selector.onrender.com/countries"
    );
    const jsonData = await res.json();
    setData({ ...data, countries: jsonData });
  };
  const handleFetch = async (name, value) => {
    console.log(name, value);
    if (name === "country" && value) {
      const res = await fetch(
        `https://crio-location-selector.onrender.com/country=${value}/states`
      );
      const jsonData = await res.json();
      setData({ ...data, state: jsonData });
    } else if (name === "state" && value) {
      const res = await fetch(
        `https://crio-location-selector.onrender.com/country=${isSelected.country}/state=${value}/cities`
      );
      const jsonData = await res.json();
      setData({ ...data, city: jsonData });
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setIsSelected({ ...isSelected, [name]: value });
    handleFetch(name, value);
  };

  useEffect(() => {
    fetchCountry();
  }, []);
  Object.keys(data).map((items) => console.log(items));
  return (
    <div className='state_container'>
      <h2>Select Location</h2>
      <div className='state_wrapper'>
        <select name='country' onChange={handleChange} className='country'>
          {data.countries.map((item) => (
            <option value={item} key={item}>
              {item}
            </option>
          ))}
        </select>
        <select name='state' onChange={handleChange} className='state'>
          {data.state.map((item) => (
            <option value={item} key={item}>
              {item}
            </option>
          ))}
        </select>
        <select name='city' onChange={handleChange} className='city'>
          {data.city.map((item) => (
            <option value={item} key={item}>
              {item}
            </option>
          ))}
        </select>
      </div>
      {isSelected.city && isSelected.country && isSelected.state && (
        <p>
          <b>You selected {isSelected.city}</b>,{isSelected.state},
          {isSelected.country}
        </p>
      )}
    </div>
  );
};

export default State;

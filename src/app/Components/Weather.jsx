"use client";

import React, { useState } from "react";
import { fetchWeather } from "../fetchWeather";

export default function Weather() {
  const [city, setCity] = useState(""); // State to store the city name
  const [weather, setWeather] = useState(null); // State to store weather data
  const [loading, setLoading] = useState(false); // State to handle loading state
  const [error, setError] = useState(null); // State to store error messages

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Ensure the city input is not empty before proceeding
    if (!city.trim()) {
      alert("Please enter a city name");
      return;
    }

    setLoading(true); // Start loading
    setError(null); // Reset any previous errors
    setWeather(null); // Clear the previous weather data

    try {
      const data = await fetchWeather(city); // Fetch weather data
      setWeather(data); // Set the fetched weather data in state
      console.log(city);
    } catch (err) {
      setError(err.message); // Set error state if the request fails
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Search City"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            width="50"
            height="50"
            viewBox="0 0 50 50"
          >
            <path d="M 21 3 C 11.621094 3 4 10.621094 4 20 C 4 29.378906 11.621094 37 21 37 C 24.710938 37 28.140625 35.804688 30.9375 33.78125 L 44.09375 46.90625 L 46.90625 44.09375 L 33.90625 31.0625 C 36.460938 28.085938 38 24.222656 38 20 C 38 10.621094 30.378906 3 21 3 Z M 21 5 C 29.296875 5 36 11.703125 36 20 C 36 28.296875 29.296875 35 21 35 C 12.703125 35 6 28.296875 6 20 C 6 11.703125 12.703125 5 21 5 Z"></path>
          </svg>
        </button>
      </form>
      {weather && (
        <div>
          <h2>Weather in {weather.name}</h2>
          <p>Feels like {weather.main.feels_like}</p>
          <p>Humidity {weather.main.humidity}</p>
          <p>Weather {weather.weather[0].description}</p>
        </div>
      )}
    </>
  );
}

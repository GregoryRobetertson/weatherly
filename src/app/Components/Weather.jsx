"use client";

import React, { useState } from "react";
import { fetchWeather } from "../fetchWeather";

export default function Weather() {
  const [city, setCity] = useState(""); // State to store the city name
  const [weather, setWeather] = useState(null); // State to store weather data
  const [loading, setLoading] = useState(false); // State to handle loading state
  const [error, setError] = useState(null); // State to store error messages

  const handleSubmit = async () => {
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
    } catch (err) {
      setError(err.message); // Set error state if the request fails
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div>
      <h1>Search weather by entering a city name</h1>
    </div>
  );
}

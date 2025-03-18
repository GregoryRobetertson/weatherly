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
      <div className="relative flex justify-between items-center max-w-[500px] w-full m-auto pt-4  z-20">
        <form
          className="flex justify-between items-center w-full m-auto p-3 bg-transparent border  rounded-2xl"
          onSubmit={handleSubmit}
        >
          {" "}
          {/* Added onSubmit handler */}
          <div>
            <input
              className="bg-transparent border-none focus:outline-none text-2xl placeholder:"
              type="text"
              placeholder="Search city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </div>
          <button className="" type="submit">
            {" "}
            {/* Changed to submit button */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="2rem"
              height="2rem"
              viewBox="0 0 24 24"
            >
              <path
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m21 21l-4.343-4.343m0 0A8 8 0 1 0 5.343 5.343a8 8 0 0 0 11.314 11.314"
              ></path>
            </svg>
          </button>
        </form>
      </div>

      {weather && (
        <div className="max-w-sm mx-auto  rounded-lg overflow-hidden p-6">
          <h2 className="text-2xl font-semibold text-center text-blue-500">
            Weather in {weather.name}
          </h2>
          <div className="mt-4 space-y-3">
            <p className="text-lg text-gray-700">
              Feels like{" "}
              <span className="font-medium text-blue-600">
                {weather.main.feels_like}°C
              </span>
            </p>
            <p className="text-lg text-gray-700">
              Humidity{" "}
              <span className="font-medium text-blue-600">
                {weather.main.humidity}%
              </span>
            </p>
            <p className="text-lg text-gray-700">
              Weather{" "}
              <span className="font-medium text-blue-600 capitalize">
                {weather.weather[0].description}
              </span>
            </p>
          </div>
        </div>
      )}
    </>
  );
}

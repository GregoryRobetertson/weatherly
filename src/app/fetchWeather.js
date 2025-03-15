"use client";

import axios from "axios";

export const fetchWeather = async (city) => {
  try {
    // Ensure the city is not empty
    if (!city) throw new Error("City name cannot be empty");

    // Construct the API URL using template literals correctly
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}`
    );

    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch weather data! " + error.message);
  }
};

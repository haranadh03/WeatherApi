import { useState } from "react";
import './App.css';

export default function App() {
    const [weather, setWeather] = useState(null);
    const [error, setError] = useState("");
    const API_KEY = "16c519cf65e5ab95ea8dd98caaeed198";

    const getWeather = async (event) => {
        event.preventDefault();

        const city = event.target.userInput.value;
        try {
            const res = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
            );

            const data = await res.json();
            console.log(data);
            if(!res.ok) {
                setWeather(null);
                setError("Invalid city");
                return;
            }
                setWeather(data);
                setError("");
        } catch (err) {
            setError(null);
            setError("Something went wrong");
            console.log(err);
        }
    };

    return (
        <div className="Okay">
        <div className="weather">
            <form onSubmit={getWeather}>
                <input type="text" name="userInput" placeholder="Enter city" />
                <button type="submit">Search</button>
            </form>
            <div className="dad">
            {error && <h3>{error}</h3>}
            {weather && (
                <>
                    <h2>City Name: {weather.name}</h2>
                    <h3>Temperature: {weather.main.temp}°C</h3>
                    <h3>{weather.coord.lat}</h3>
                    <h3>{weather.coord.lon}</h3>
                    <h3>Condition:{weather.weather[0].description}</h3>
                    <h3>Feels Like:{weather.main.feels_like}</h3>
                    <h3>min temprature:{weather.main.temp_min}</h3>
                </>
            )}
            </div>
        </div>
        </div>
    );
}
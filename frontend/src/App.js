import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import axios from "axios";
import Pagination from 'react-bootstrap/Pagination';
import WeatherData from "./WeatherData";
import { Icon } from 'leaflet';
import markerIconPng from "leaflet/dist/images/marker-icon.png"
import 'leaflet/dist/leaflet.css';
import './App.css';
import './Weather.css';

const App = () => {
    const [weatherData, setWeatherData] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async function () {
            const data = await axios.get(`http://localhost:4000/getWeather/${page}`);
            setWeatherData(data.data);
            setLoading(false);
        })();
    }, [page]);

    useEffect(() => {
        if (page < 1) {
            setPage(1);
        }
        if (page > 3) {
            setPage(3);
        }
    }, [page]);

    const position = [39, 34];
    return (
        <>
            {
                loading ?
                    <div className="loader-container">
                        <div className="spinner"></div>
                    </div>
                    :
                    <React.Fragment>
                        <MapContainer center={position} zoom={2} scrollWheelZoom={true}>
                            <TileLayer
                                attribution=
                                '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                url=
                                'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
                            />
                            {
                                weatherData.map(weather => {
                                    return (
                                        <Marker
                                            key={weather.coord.lat}
                                            position={[weather.coord.lat, weather.coord.lon]}
                                            icon={new Icon({ iconUrl: markerIconPng, iconSize: [25, 41], iconAnchor: [12, 41] })}
                                        >
                                            <Popup>
                                                <div className="weather-data">
                                                    <div className="left">
                                                        <div className="line1">
                                                            {weather.name}
                                                        </div>
                                                        <div className="temp">
                                                            {weather.main.temp}<sup>o</sup> F
                                                        </div>
                                                        <div className="weather-text">
                                                            {weather.weather[0].description}
                                                        </div>
                                                        <div className="visibility-km">
                                                            Visibility is {weather.visibility} KMs
                                                        </div>
                                                        <div className="wind-speed">
                                                            Wind speed is {weather.wind.speed} KMPH
                                                        </div>
                                                    </div>
                                                    <div className="right"><br />
                                                        <img src={`http://openweathermap.org/img/w/${weather.weather[0].icon}.png`} alt="" />
                                                    </div>
                                                </div>
                                            </Popup>
                                        </Marker>
                                    )
                                })
                            }
                        </MapContainer >
                        <WeatherData data={weatherData} page={page} />
                        <div className="pagination justify-content-center" style={{ fontSize: '1.7em' }}>
                            <Pagination>
                                <Pagination.Prev onClick={_ => {
                                    setPage(page - 1); setLoading(true)
                                }} />
                                <Pagination.Item onClick={_ => {
                                    setPage(1); setLoading(true)
                                }}
                                    active={page === 1}
                                >1</Pagination.Item>
                                <Pagination.Item onClick={_ => {
                                    setPage(2); setLoading(true)
                                }}
                                    active={page === 2}
                                >2</Pagination.Item>
                                <Pagination.Item onClick={_ => {
                                    setPage(3); setLoading(true)
                                }}
                                    active={page === 3}>3</Pagination.Item>
                                <Pagination.Next
                                    onClick={_ => {
                                        setPage(page + 1); setLoading(true)
                                    }} />
                            </Pagination>
                        </div>
                    </React.Fragment>
            }
        </>
    );
}

export default App;
import React from "react";
let indexes = [];
const WeatherData = ({ data, page }) => {
    let initialPage = page === 1 ? 1 : page === 2 ? 11 : 21;
    for (let i = 0; i < 10; i++) {
        indexes[i] = initialPage++;
    }
    return (
        <div style={{ paddingTop: '40px' }}>
            <h3 className="p-3 text-center">Locations</h3>
            <table className="table table-striped table-bordered"
                style={{
                    overflowY: "auto",
                    tableLayout: "fixed",
                    wordWrap: "break-word",
                    marginBottom: "10px",
                }}
            >
                <thead>
                    <tr>
                        <th style={{ width: "6vw" }}>Index</th>
                        <th style={{ width: "7vw" }}>Location</th>
                        <th style={{ width: "7vw" }}>Country</th>
                        <th style={{ width: "7vw" }}>Geo</th>
                    </tr>
                </thead>
                <tbody>
                    {data && data.map((weather, index) =>
                        <tr key={indexes[index]}>
                            <td>{indexes[index]}</td>
                            <td>{weather.name}</td>
                            <td>{weather.sys.country}</td>
                            <td>
                                Latitude : {weather.coord.lat}
                                <br />
                                Longitude : {weather.coord.lon}
                            </td>
                        </tr>
                    )
                    }
                </tbody>
            </table>
        </div>
    );
}

export default WeatherData;
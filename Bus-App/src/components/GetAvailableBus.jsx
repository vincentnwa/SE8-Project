import { useState, useEffect } from "react";
import Database from "./DatabaseAvailableBus"; // Adjust the import if necessary

function GetAvailableBus({ busStopCode }) {
    const [busData, setBusData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!busStopCode) return;

        const apiKey = import.meta.env.VITE_APP_API_KEY;

        const fetchBusData = async () => {
            setLoading(true); // Set loading to true before fetching
            setError(null); // Reset error state

            try {
                const response = await fetch(
                    `/api/ltaodataservice/v3/BusArrival?BusStopCode=${busStopCode}`,
                    {
                        headers: {
                            AccountKey: apiKey,
                            Accept: "application/json",
                        },
                    }
                );

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const data = await response.json();

                if (data.Services && data.Services.length > 0) {
                    setBusData(data.Services);
                    Database.save("AvailableBus", data.Services); // Save data to local storage
                } else {
                    throw new Error("No bus services available for this stop.");
                }
            } catch (err) {
                setError(err.message || "Failed to fetch bus data. Please try again.");
            } finally {
                setLoading(false); // Set loading to false after fetching
            }
        };

        fetchBusData();
    }, [busStopCode]);

    if (loading) return <div>Loading...</div>; // Show loading state
    if (error) return <div>{error}</div>; // Show error state

    return (
        <ul>
            {busData.map((bus) => (
                <li key={bus.ServiceNo}>{bus.ServiceNo}</li> // Display bus numbers, using ServiceNo as key
            ))}
        </ul>
    );
}

export default GetAvailableBus;

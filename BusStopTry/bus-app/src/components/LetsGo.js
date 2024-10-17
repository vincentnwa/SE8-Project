import { useState, useEffect, useRef } from "react";
import "leaflet/dist/leaflet.css";
import styles from "./LetsGo.module.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { icon } from "leaflet";
import axios from "axios";

function LetsGo() {
  const [busStopsCollection, setBusStopsCollection] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [userLocation, setUserLocation] = useState(null);
  const [selectedBusStop, setSelectedBusStop] = useState(null); // Store selected bus stop
  const [busStopDetails, setBusStopDetails] = useState([]); // Store details from the Bus Arrival API
  const mapRef = useRef();

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation([latitude, longitude]);
          if (mapRef.current) {
            mapRef.current.setView([latitude, longitude], 17);
          }
        },
        (error) => {
          console.error("Turn on location:", error);
        }
      );
    } else {
      console.error("Turn on location if not something else is wrong.");
    }
  }, []);

  const fetchBusStops = async () => {
    setIsLoading(true);
    let skip = 0;
    const limit = 500;
    let hasMore = true;
    const busStops = [];

    while (hasMore) {
      try {
        const response = await axios.get(
          `https://cors-anywhere.herokuapp.com/https://datamall2.mytransport.sg/ltaodataservice/BusStops?$skip=${skip}`,
          {
            headers: {
              AccountKey: "V/dLDh/xTX6Z41u9GTWrPg==", 
              accept: "application/json",
            },
          }
        );

        const newBusStops = response.data.value;

        newBusStops.forEach((stop) => {
          busStops.push({
            BusStopCode: stop.BusStopCode,
            RoadName: stop.RoadName,
            Latitude: stop.Latitude,
            Longitude: stop.Longitude,
          });
        });

        if (newBusStops.length < limit) {
          hasMore = false;
        }

        skip += limit;
      } catch (err) {
        console.error(err);
        hasMore = false;
      }
    }

    setBusStopsCollection(busStops); 
    setIsLoading(false);
  };

  const fetchBusStopDetails = async (busStopCode) => {
    try {
      const response = await axios.get(
        `https://cors-anywhere.herokuapp.com/https://datamall2.mytransport.sg/ltaodataservice/v3/BusArrival?BusStopCode=${busStopCode}`,
        {
          headers: {
            AccountKey: "V/dLDh/xTX6Z41u9GTWrPg==", 
            accept: "application/json",
          },
        }
      );
      setBusStopDetails(response.data.Services); 
    } catch (err) {
      console.error(err);
    }
  };

  const cIcon = new icon({
    iconUrl: require("../img/busMarker.png"),
    iconSize: [30, 30],
  });
  const userIcon = new icon({
    iconUrl: require("../img/userMarker.png"),
    iconSize: [35, 35],
  });

  const getMinutesUntilArrival = (estimatedArrival) => {
    const currentTime = new Date();
    const arrivalTime = new Date(estimatedArrival);
    const diffInMs = arrivalTime - currentTime;
    const diffInMinutes = Math.round(diffInMs / 1000 / 60);
    return diffInMinutes > 0 ? diffInMinutes + " Mins" : "Arrived"; 
  };

  return (
    <div className={styles.container}>
      <h1>Let's Go!</h1>
      <h3 >Enable your location and we will find you and click the Get Bus Stops button to get all
         the nearest Bus Stops then click on the Bus Stop you want to show the Bus Arrival times of.</h3>

      <MapContainer
        center={[1.3521, 103.8198]} 
        zoom={17}
        className={styles.map}
        ref={mapRef}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {busStopsCollection.map((busStop) => (
          <Marker
            key={busStop.BusStopCode}
            position={[busStop.Latitude, busStop.Longitude]}
            icon={cIcon}
            eventHandlers={{
              click: () => {
                setSelectedBusStop(busStop); 
                fetchBusStopDetails(busStop.BusStopCode); 
              },
            }}
          >
            <Popup>{`${busStop.BusStopCode} | ${busStop.RoadName}`}</Popup>
          </Marker>
        ))}
        {userLocation && (
          <Marker position={userLocation} icon={userIcon}>
            <Popup>Your Current Location</Popup>
          </Marker>
        )}
      </MapContainer>

      <h1>Bus Stops</h1>
      <button onClick={fetchBusStops} disabled={isLoading} className={styles.button}>
        {isLoading ? "Loading..." : "Get Bus Stops"}
      </button>

      {selectedBusStop && (
        <div className={styles.timeList}>
          <h3>Bus Arrival Information for Bus Stop {selectedBusStop.BusStopCode}</h3>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Service No</th>
                <th>Next Bus Arrival</th>
                <th>Upcoming Bus Arrival</th>
              </tr>
            </thead>
            <tbody>
              {busStopDetails.map((service, index) => (
                <tr key={index}>
                  <td>{service.ServiceNo}</td>
                  <td>{getMinutesUntilArrival(service.NextBus.EstimatedArrival)}</td>
                  <td>{getMinutesUntilArrival(service.NextBus2.EstimatedArrival)} </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default LetsGo;

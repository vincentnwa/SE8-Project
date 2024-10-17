import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./BusDashboard.module.css";
import Card from "./Card";
import MessageModal from "./MessageModal";
import Joi from "joi";
import GetBusStop from "./GetBusStop";
import HeaderSection from "./HeaderSection";
import Database from "./Database"; // Import Database to retrieve bus stops
import GetAvailableBus from "./GetAvailableBus"; // Import the GetAvailableBus component

function BusDashboard() {
  const navigate = useNavigate();
  const [currentLocation, setCurrentLocation] = useState({
    latitude: "",
    longitude: "",
    placeName: "",
  });
  const [modalMessage, setModalMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [busStops, setBusStops] = useState([]);
  const [filteredCurrentLocations, setFilteredCurrentLocations] = useState([]);
  const [showCurrentSuggestions, setShowCurrentSuggestions] = useState(false);
  const [selectedBusStopCode, setSelectedBusStopCode] = useState("");

  const locationSchema = Joi.object({
    currentLocation: Joi.string().min(3).required().messages({
      "string.min": "Please enter a valid location",
      "any.required": "Current location is required",
    }),
  });

  // Fetch bus stops from local storage on mount
  useEffect(() => {
    const storedBusStops = Database.get("busStops");
    if (storedBusStops) {
      setBusStops(storedBusStops);
    }
  }, []);

  // Filter bus stops based on current location input
  useEffect(() => {
    if (currentLocation.placeName) {
      const searchTerm = currentLocation.placeName.toLowerCase();
      const filteredStops = busStops.filter(
        (stop) =>
          stop.BusStopCode.toLowerCase().includes(searchTerm) ||
          stop.RoadName.toLowerCase().includes(searchTerm) ||
          stop.Description.toLowerCase().includes(searchTerm)
      );

      setFilteredCurrentLocations(filteredStops);
      setShowCurrentSuggestions(filteredStops.length > 0);
    } else {
      setFilteredCurrentLocations([]);
      setShowCurrentSuggestions(false);
    }
  }, [currentLocation.placeName, busStops]);

  // Handle search for bus route
  const handlerSearchRoute = () => {
    const { error } = locationSchema.validate({
      currentLocation: currentLocation.placeName,
    });

    if (error) {
      setModalMessage(error.details[0].message);
      setIsModalOpen(true);
      return;
    }

    if (filteredCurrentLocations.length === 0) {
      setModalMessage("No matching bus stops found");
      setIsModalOpen(true);
      return;
    }

    const busStopCode = selectedBusStopCode;
    if (!busStopCode) {
      setModalMessage("Invalid bus stop code");
      setIsModalOpen(true);
      return;
    }

    // Reset the current location input and hide suggestions
    setCurrentLocation({ latitude: "", longitude: "", placeName: "" });
    setShowCurrentSuggestions(false);
    setIsModalOpen(false);
  };

  // Navigate back to home
  const handlerReturnHome = () => {
    navigate("/");
  };

  // Close the modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <Card>
      <GetBusStop />
      <div className={styles.mainContainer}>
        <div className={styles.container}>
          <HeaderSection appTitle="Bus Route Dashboard" />
          <div className={styles.locationInputContainer}>
            <input
              className={styles.searchCurrent}
              type="text"
              placeholder="Enter Bus Stop Code, Road Name, or Description..."
              value={currentLocation.placeName}
              onChange={(e) => {
                setCurrentLocation({
                  ...currentLocation,
                  placeName: e.target.value,
                });
              }}
            />
            {showCurrentSuggestions && filteredCurrentLocations.length > 0 && (
              <ul className={styles.suggestionsList}>
                {filteredCurrentLocations.map((stop) => (
                  <li
                    key={stop.BusStopCode}
                    onClick={() => {
                      setCurrentLocation({
                        ...currentLocation,
                        placeName: `${stop.BusStopCode}: ${stop.RoadName} - ${stop.Description}`,
                      });
                      setSelectedBusStopCode(stop.BusStopCode);
                      setShowCurrentSuggestions(false);
                    }}
                    className={styles.suggestionItem}
                  >
                    <strong>{stop.BusStopCode}:</strong> {stop.RoadName} -{" "}
                    {stop.Description}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className={styles.busResultContainer}>
            {selectedBusStopCode && (
              <GetAvailableBus busStopCode={selectedBusStopCode} className={styles.busNoTag}/>
            )}
          </div>
          Ï
          {/* <button className={styles.searchButton} onClick={handlerSearchRoute}>
            Search
          </button>
          <button className={styles.favoriteButton}>Show My Favorite</button> */}
          <button className={styles.returnButton} onClick={handlerReturnHome}>
            Logout
          </button>
        </div>
      </div>

      {isModalOpen && (
        <MessageModal message={modalMessage} onClose={closeModal} />
      )}
    </Card>
  );
}

export default BusDashboard;

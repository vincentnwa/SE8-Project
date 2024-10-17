// \src\components\GetBusStop.jsx

import { useEffect } from "react";
import Database from "./Database"; // Assuming you're using this to store data

const GetBusStop = () => {
  useEffect(() => {
    const fetchBusStops = async () => {
      const apiKey = import.meta.env.VITE_APP_API_KEY;
      let offset = 0;
      const limit = 500;

      try {
        const allBusStops = []; // Array to accumulate all fetched bus stops
        let hasMoreData = true;

        while (hasMoreData) {
          const response = await fetch(
            `/api/ltaodataservice/BusStops?$skip=${offset}`,
            {
              headers: {
                "AccountKey": apiKey,
                accept: "application/json",
              },
            }
          );

          if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
          }

          const data = await response.json();

          // Check if the bus stops data is in `value` array
          if (data.value && data.value.length > 0) {
            // Map the data to include only essential properties
            const busStopDataToSave = data.value.map(stop => ({
              BusStopCode: stop.BusStopCode,
              RoadName: stop.Description,
              Description: stop.Description,
            }));

            // Accumulate the fetched data
            allBusStops.push(...busStopDataToSave);

            // Update offset for the next batch
            offset += limit;
          } else {
            // No more data
            hasMoreData = false;
          }
        }

        // Save all accumulated bus stops to the database after fetching is complete
        Database.save("busStops", allBusStops);

      } catch (error) {
        console.error("Failed to fetch bus stops:", error);
      }
    };

    fetchBusStops();
  }, []); // Empty array to ensure this runs only once

  return null;
};

export default GetBusStop;

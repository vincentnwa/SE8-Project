// .\src\components\BusRoutes.jsx
import React from "react";
import AvailableBusData from "./GetAvailableBus";

function BusRoutes() {
  const busStopCode = "01559"; // You can pass this dynamically based on your use case

  const busData = AvailableBusData({ busStopCode });

  return (
    <div>
      <h1>Bus Arrival Information</h1>
      {busData ? (
        <ul>
          {busData.map((bus) => (
            <li key={bus.ServiceNo}>
              <p>Bus No: {bus.ServiceNo}</p>
              <p>Next Bus Arrival: {bus.NextBus.EstimatedArrival}</p>
              {bus.NextBus2.EstimatedArrival && <p>Next Bus 2 Arrival: {bus.NextBus2.EstimatedArrival}</p>}
              {bus.NextBus3.EstimatedArrival && <p>Next Bus 3 Arrival: {bus.NextBus3.EstimatedArrival}</p>}
            </li>
          ))}
        </ul>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default BusRoutes;

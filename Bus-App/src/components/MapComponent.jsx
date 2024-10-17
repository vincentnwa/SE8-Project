// .\src\components\MapComponent.jsx

async function fetchBusStops(latitude, longitude) {
  const accountKey = 'YOUR_ACCOUNT_KEY'; // Replace with your actual account key
  const url = `https://datamall2.mytransport.sg/ltaodataservice/BusStops?Latitude=${latitude}&Longitude=${longitude}`;

  try {
      const response = await fetch(url, {
          method: 'GET',
          headers: {
              'AccountKey': accountKey,
              'Content-Type': 'application/json'
          }
      });

      if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Bus Stops:', data.value); // Log the bus stops information
  } catch (error) {
      console.error('Error fetching bus stops:', error);
  }
}

// Example usage
const latitude = 1.3991936; // Replace with desired latitude
const longitude = 103.9040512; // Replace with desired longitude
fetchBusStops(latitude, longitude);

import "./App.css";
import Header from "./components/Header";
import { useState } from "react";
import NavBar from "./components/NavBar";
import LetsGo from "./components/LetsGo";
import Contact from "./components/Contact";
import AboutUs from "./components/AboutUs";
import { BrowserRouter, Route, Routes } from "react-router-dom";
//import BusStops from "./components/BusStops";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLoginStatus = (status) => {
    setIsLoggedIn(status);
  };

  return (
    <>
      <Header onLoginStatusChange={handleLoginStatus} />
      <div className="App">
        {isLoggedIn ? (
          <div>
            <BrowserRouter>
            <NavBar/>
            {/* <h1>Welcome to Buss-Off</h1>
            <h3>The best Bus Tracking app in Singapore</h3> */}
            <Routes>
            <Route path='map' element={<LetsGo/>}/>
            <Route path='contact' element={<Contact/>}/>
            <Route path='aboutus' element={<AboutUs/>}/>
            </Routes>
            </BrowserRouter>
            
          </div>
        ) : (
          <h2>Please log in to access the app.</h2>
        )}
      </div>
    </>
  );
}

export default App;

import React from "react";
import logo from "./logo.svg";
import "./App.css";
import ArcGisQueryTest from "./ArcGisQueryTest";
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <a
          className="App-link"
          href="https://developers.arcgis.com/rest/users-groups-and-items/search.htm"
          target="_blank"
          rel="noopener noreferrer"
        >
          Search ArcGIS Portal
        </a>
      </header>
      <ArcGisQueryTest topic="San Antonio" />
    </div>
  );
}

export default App;

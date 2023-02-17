import React from "react";
import logo from "./logo.svg";
import "./App.css";
import ArcGisQueryTest from "./ArcGisQueryTest";

import Paper from '@mui/material/Paper'
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import DirectionsIcon from '@mui/icons-material/Directions';
import TextField from '@mui/material/TextField';

function App() {
  const [term, setTerm] = React.useState<string>()
  const [searchText, setSearchText] = React.useState('')
  return (
    <div className="App">
      <header className="App-header">

        <Paper
      component="form"
      sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
    >
      <IconButton sx={{ p: '10px' }} aria-label="menu">
        <MenuIcon />
      </IconButton>
      <TextField
        id="searchTerm"
        sx={{ ml: 1, flex: 1 }}
        value={searchText}
        onKeyDown={(e: React.KeyboardEvent) => {if (e && (e.key === "Enter" || e.key === "Tab")) {
          e.preventDefault()
          setTerm(searchText)
        }}}
        onChange= {(event: React.ChangeEvent<HTMLInputElement>) => {
          console.log(`Search text: ${event.target.value}`)
          setSearchText(event.target.value)
        }}
        placeholder="Search ArcGIS Portal"
        inputProps={{ 'aria-label': 'search arcgis portal' }}
      />
      <IconButton type="button" sx={{ p: '10px' }}
       aria-label="search"
        onClick={() => setTerm(searchText)}>
        <SearchIcon />
      </IconButton>
    </Paper>

      </header>
      <ArcGisQueryTest topic={term} />
    </div>
  );
}

export default App;

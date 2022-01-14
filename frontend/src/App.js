import * as React from 'react';
import { useState } from 'react';
import { AppBar, Box, Toolbar, Button } from "@mui/material"

import GraphPage from './Pages/GraphPage';
import AboutPage from './Pages/AboutPage';

const App = () => {
  const [route, setRoute] = useState(<GraphPage />)

  return (
    <div>
      <Box sx={{ flexGrow: 1 }} >
        <AppBar>
          <Toolbar>
            <Button sx={{ height: "60px" }} color="inherit" variant="h6" component="div" onClick={() => { setRoute(<GraphPage />) }}>
              Graph
            </Button>
            <Button sx={{ height: "60px" }} color="inherit" variant="h6" component="div" onClick={() => { setRoute(<AboutPage />) }}>
              About Us
            </Button>
          </Toolbar>
        </AppBar>
      </Box>
      {route}
    </div>
  );

}

export default App;
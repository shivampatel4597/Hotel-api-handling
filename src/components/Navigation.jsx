import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { Box, AppBar, Toolbar, IconButton, Typography, Button } from '@mui/material';
import { Fullscreen, Search } from '@mui/icons-material';
class Navigation extends Component {



  render() {
    return (
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position='static'>

          <Toolbar sx={{ backgroundColor: "primary.light", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <IconButton size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ ml: 3 }}><Search /></IconButton>

            <Typography color='inherit' component={Link} to="/menus" sx={{
              fontSize: "1.3rem",
              textDecoration: 'none',
              '&:hover': {
                textDecoration: 'none',
                color: "black",
                transition: 'color 0.3s ease'

              },
            }}>Menus</Typography>
            {/* <Typography color="inherit" component={Link} to="/foodItems" sx={{
              fontSize: "1.3rem",
              textDecoration: 'none',
              '&:hover': {
                textDecoration: 'none',
                color: "black",
                transition: 'color 0.3s ease'

              },
            }}>Food Items</Typography> */}

            {/* table booking */}
            <Typography color="inherit" component={Link} to="/tables" sx={{
              fontSize: "1.3rem",
              textDecoration: 'none',
              '&:hover': {
                textDecoration: 'none',
                color: "black",
                transition: 'color 0.3s ease'

              },
            }}>Book your seat</Typography>
            <Button color='inherit' sx={{ backgroundColor: "black" }} disableRipple >Login</Button>
          </Toolbar>


        </AppBar>

      </Box>
    )
  }
}


export default Navigation;
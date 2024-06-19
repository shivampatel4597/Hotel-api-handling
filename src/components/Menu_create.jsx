import React, { Component } from 'react';
import { Box, FormControl, TextField, InputLabel, Button } from '@mui/material';

export default class MenuCreate extends Component {
  render() {
    return (
      <Box
        component="form"
        sx={{
          padding: "20px",
          width: "300px",
          border: "2px solid black",
          borderRadius: "7px",
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          backgroundColor: "#fff176",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "20px"
        }}
      >
        <FormControl sx={{ width: '100%' }}>
         
          <TextField
            id="menu-name"
            variant="outlined"
            sx={{
              '& .MuiInputBase-root': {
                backgroundColor: "#e1bee7",
                height: '2.5rem',
                padding: '0.5rem',
                fontSize: '1rem',
              },
            }}
            placeholder="Enter text"
            fullWidth
          />
        </FormControl>
        <Button 
          variant="contained" 
          color="primary"
          sx={{ 
            mt: 2, 
            backgroundColor: '#3f51b5', 
            color: 'white', 
            '&:hover': {
              backgroundColor: '#303f9f'
            }
          }}
        >
          Submit
        </Button>
      </Box>
    );
  }
}

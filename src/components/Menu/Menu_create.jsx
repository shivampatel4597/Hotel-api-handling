import React, { Component } from 'react';
import { Box, FormControl, TextField, InputLabel, Button, IconButton } from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';
export default class MenuCreate extends Component {
  constructor(props){
    super(props)
    this.state = {input:""}
  }

  submit = ()=>{

this.creating().then((data)=>{
  console.log("data posted succesfully")
}).catch((error)=>{
  console.log(error)
})
    this.props.closePopup()
   
  }

  creating  = ()=>{
     console.log(this.state.input);
    return fetch("https://renderhm.onrender.com/menus",{
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body:JSON.stringify({
        
          "id": null,
          "menu_type": this.state.input,
          "food_items": []
      
      
      })
    }).then((response)=>{
      if(!response.ok){
        throw new Error("Network response was not working")
      }
      return response.json()
    }).catch(error =>{
      throw error;
  })

  }

  render() {
    console.log(this.props)
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
         
          <TextField onChange={(e)=>this.setState({input:e.target.value})}
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
        <Box sx= {{display:"flex", alignItems:"center", justifyContent:"center"}}>
        <Button  onClick={this.submit}
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
        <IconButton  size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            ><CancelIcon/></IconButton> </Box>
      </Box>
    );
  }
}

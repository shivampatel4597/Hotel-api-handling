import React, { Component } from 'react';
import { Button, Typography, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import Menu_create from './Menu_create';

import Update_food from '../Update_food';
class Menu extends Component {
  constructor(props) {
    super(props)
    this.state = { menu: [], error: "", foodList: [], createMenu: false, foodMenu: false, currentFoodItem: null }
  }

  componentDidMount() {

    this.fetchMenu()


      .then((data) => {

        this.setState({ menu: data });
        console.log(data)
      }).catch((error) => {
        this.setState({ error: error })
      })

  }

  fetchMenu = () => {
    return fetch("https://renderhm.onrender.com/menus")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network request failed")
        }

        return response.json()
      }).catch((error) => {
        throw error;
      })
  }

  componentDidUpdate(_, prevState) {
    // (prevState.createMenu !== this.state.createMenu && this.state.createMenu === false) || 
    if (
      (prevState.foodMenu !== this.state.foodMenu && this.state.foodMenu === false)) {

      this.fetchMenu().then((data) => {
        this.setState({ menu: data }, () => {
          console.log("updated this :", this.state.menu)
        });
        console.log(data);
      }).catch((error) => {
        this.setState({ error: error });
      });


    }
  }

  foodItems = (index) => {

    let matched = this.state.menu[index]
    if (matched) {
      this.setState({ foodList: matched.food_items }, () => {
        console.log(this.state.foodList)
      })
    }


  }

  // update food items
  foodUpdate = (foodIndex) => {
    this.setState({ foodMenu: true })
    let matched = this.state.foodList[foodIndex];
    console.log("Matched item is :", matched.id)
    this.setState({ currentFoodItem: matched.id })

  }
  menuPopup = () => {

    this.setState({ createMenu: true })
  }


  closePopup = () => {
    // alert("closing")
    this.setState({ createMenu: false })
  }

  closeFoodPopup = () => {
    this.setState({ foodMenu: false })
  }
  render() {
    const { menu, error, foodList, createMenu, foodMenu, currentFoodItem } = this.state;
    return (

      <>
        <Button onClick={this.menuPopup}
          variant='contained'
          sx={{ marginTop: '10px', fontSize: "1rem" }}
        >
          Create menu
        </Button>
        <div style={{

          width: "100%",
          placeItems: "center",
          display: "grid",
          marginTop: "3rem",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "10px",
          // justifyContent: "center"
        }}>
          {menu && menu.map((item, index) => {
            return (
              <div
                key={index + 1}
                style={{
                  fontSize: "28px",
                  color: "white",
                  padding: "10px",
                  width: "200px",
                  height: "230px",
                  backgroundColor: "blue",
                  border: "2px solid black",
                  borderRadius: "10px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  textAlign: "center",
                  cursor: "pointer"
                }}>
                <p>{item.menu_type}</p>
                {/* component={Link} to={'/foodItems/${index}'} */}

                <Button variant='contained' onClick={() => this.foodItems(index)} sx={{ padding: "0.5rem", color: "black", backgroundColor: "white" }}>Show Food</Button>

              </div>
            );
          })}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: "repeat(3,1fr)", placeItems: "center", justifyContent: "center", gap: "20px", marginTop: "30px" }}>
          {
            foodList && foodList.map((item, foodIndex) => {
              return <div key={foodIndex} style={{
                fontSize: "15px",
                color: "white",
                padding: "10px",
                width: "200px",
                height: "200px",
                backgroundColor: "red",
                border: "2px solid black",
                borderRadius: "10px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                cursor: "pointer"
              }}>
                <p>{item.food_name}</p>
                <p>Half Plate :{item.quantity_half}</p>
                <p>Full Plate :{item.quantity_full}</p>
                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "5px" }}>


                  <Button variant='contained' onClick={() => this.foodUpdate(foodIndex)} sx={{ marginTop: "6px", padding: "0.3rem", color: "black", backgroundColor: "yellow" }}>Update </Button>
                  <Button variant='contained' onClick={() => this.foodDelete(foodIndex)} sx={{ marginTop: "6px", padding: "0.3rem", color: "white", backgroundColor: "black" }}>Delete </Button>
                </Box>
              </div>
            })

          }
        </div>

        {createMenu ? <Menu_create closePopup={this.closePopup} /> : null}
        {foodMenu ? <Update_food closeFoodPopup={this.closeFoodPopup} foodItem={currentFoodItem} /> : null}
      </>
    )
  }
}

export default Menu;
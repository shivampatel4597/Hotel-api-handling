import React, {Component} from 'react';
import { Button } from '@mui/material';
import Menu_create from './Menu_create';
class Menu extends Component{
    constructor(props){
        super(props)
        this.state = {menu:[], error:"", foodList:[], createMenu:false}
    }

    componentDidMount(){

        this.fetchMenu()


.then((data)=>{
    
  this.setState({menu:data});
  console.log(data)
}).catch((error)=>{
    this.setState({error:error})
})

    }

    fetchMenu = ()=>{
     return fetch("https://renderhm.onrender.com/menus")
     .then((response)=>{
        if(!response.ok){
            throw new Error("Network request failed")
        }

        return response.json()
     }).catch((error)=>{
        throw error;
     })
    }
foodItems = (index)=>{

let matched = this.state.menu[index]
if(matched){
    this.setState({foodList:matched.food_items})
}
    
    console.log(this.state.foodList)
}

menuPopup = ()=>{
  
  this.setState({createMenu:true})
}
    render(){
        const {menu, error, foodList, createMenu} = this.state;
        return(

  <>
    <Button  onClick={this.menuPopup}
      variant='contained' 
      sx={{ marginTop: '10px', fontSize:"1rem" }}
    >
      Create menu
    </Button>
  <div style={{ 
   
  width: "100%", 
  placeItems:"center",
  display: "grid", 
  gridTemplateColumns: "repeat(3, 1fr)", 
  gap: "10px",
  // justifyContent: "center"
}}>
  {menu && menu.map((item, index) => {
    return (
      <div 
        key={index + 1} 
        style={{
            fontSize:"28px",
            color:"white",
            padding:"10px",
          width: "200px",
          height: "200px", 
          backgroundColor: "blue", 
          border: "2px solid black",
          borderRadius: "10px",
          display: "flex", 
          flexDirection:"column",
          alignItems: "center", 
          justifyContent: "center",
          textAlign: "center", 
          cursor: "pointer"
        }}>
        <p>{item.menu_type}</p>

        <button onClick={()=> this.foodItems(index)}>click</button>

      </div>
    );
  })}
</div>

<div style={{display:'grid', gridTemplateColumns:"repeat(3,1fr)", placeItems:"center", justifyContent:"center", gap:"20px", marginTop:"30px"}}>
    {
        foodList && foodList.map((item,index)=>{
           return  <div style={{
            fontSize:"28px",
            color:"white",
            padding:"10px",
          width: "200px",
          height: "200px", 
          backgroundColor: "red", 
          border: "2px solid black",
          borderRadius: "10px",
          display: "flex", 
          flexDirection:"column",
          alignItems: "center", 
          justifyContent: "center",
          textAlign: "center", 
          cursor: "pointer"
        }}>
            <p>{item.food_name}</p>
            <p>Half Plate :{item.quantity_half}</p>
            <p>Full Plate :{item.quantity_full}</p>
            </div>
        })

    }
</div>

  {createMenu ? <Menu_create/>: null}
 
  </>
        )
    }
}

export default Menu;
import React, {Component} from 'react';

class Menu extends Component{
    constructor(props){
        super(props)
        this.state = {menu:[], error:"", foodList:[]}
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


    render(){
        const {menu, error, foodList} = this.state;
        return(

  <>
  <h1>Getting menu items</h1>
  <div style={{ 
   
  width: "100%", 
  placeItems:"center",
  display: "grid", 
  gridTemplateColumns: "repeat(3, 1fr)", 
  gap: "10px",
  justifyContent: "center"
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

<div style={{display:'flex', alignItems:"center", justifyContent:"center", gap:"20px", marginTop:"30px"}}>
    {
        foodList && foodList.map((item,index)=>{
           return  <div style={{
            fontSize:"28px",
            color:"white",
            padding:"10px",
          width: "200px",
          height: "200px", 
          backgroundColor: "orange", 
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
            <p>{item.quantity_half}</p>
            <p>{item.quantity_full}</p>
            </div>
        })

    }
</div>

 
  </>
        )
    }
}

export default Menu;
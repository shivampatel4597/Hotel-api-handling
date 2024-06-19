import React, {Component} from 'react';
import Navigation from './Navigation';

class Hotel extends Component{
constructor(props){
    super(props)
    this.state = {name:"Daddy's kitchen"}
}

render(){
    return(
        <>
        
{/* <h1>{this.state.name}</h1> */}
<Navigation/>
        </>

    )
}
}

export default Hotel;
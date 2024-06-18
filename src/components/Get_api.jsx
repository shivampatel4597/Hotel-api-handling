import React, {Component} from "react";
 

class Get_api extends Component{
    constructor(props){
        super(props)

        this.state = {data:[], error:""}

    }

    componentDidMount(){
    this.getData().then(response =>{
        this.setState({data:response})
        console.log(response)
        console.log("finally we are getting this data", this.state.data)
    })
    .catch((error)=>{
        this.setState({error:error})
    })
    }

    getData = ()=>{
        return fetch('https://jsonplaceholder.typicode.com/todos/')
        .then(response =>{
            if(!response.ok){
                throw new Error("Network response was not working")
            }

            return response.json();
        }).catch(error =>{
            throw error;
        })
    }


    render(){
        const {data, error} = this.state;
        return(
            
            <>
            <h1>Getting data from json placeholder</h1>
            <div style={{ width:"100%", display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:"10px"}}>
            {
data && data.map((list,index)=>{
    return <div key={index+1}  style={{width:"350px",border:"2px solid black"}}>
        <p>{list.id}</p>
        <p>{list.completed}</p>
        <p>{list.title}</p>
    </div>
})

}

            </div>


 
<p>{error}</p>

</>
        )
    }
}

export default Get_api
import React, {Component} from "react";

class Postdata extends Component{
    constructor(props){
        super(props)
        this.state = {userId:1, id:"", title:"Football Match", completed:false}
    }


    submit = ()=>{
    this.postingData().then((data)=>{
        console.log("Posting data is :", data)
    }).catch((error)=>{
        console.log("error is ", error)
    })
    }

    postingData = ()=>{

       return fetch('https://jsonplaceholder.typicode.com/todos/', {
            method:'POST',
            headers: {
                'content-type': "application/json"
            },
            body: JSON.stringify(this.state)
        }).then(response =>{
            if(!response.ok){
                throw new Error("Network response was not working")
            }

            return response.json();
        }).catch(error =>{
            throw error;
        })
    }

    render(){
        return(
<>
            <h1>post data using json place holder</h1>

      <button onClick={this.submit}>Submit</button>

            </>
        )
    }
}

export default Postdata
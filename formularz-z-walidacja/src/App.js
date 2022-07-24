import React, { Component } from 'react';
import './App.css';

class App extends Component {
  state = {
    username: "",
    email: "",
    password: "",
    accept: false,
    message: "",
  

  errors: {
    username: false,
    email: false,
    password: false,
    accept: false,
  } }

  messages = {
    username_incorrect: " nazwa musi być dłuższa niż 10 znaków i nie może zawierać spacji",
    email_incorrect: " brak @ w emailu",
    password_incorrect: "  Hasło musi mieć 8 znaków",
    accpet_incorrect: " Nie potwierdzona zgoda",
  }
 


  handleChange = (e) => {

    const type = e.target.type;
    const name = e.target.name;

    if(type==="text" || type === "password" || type === "email") {

     const value = e.target.value;
    
    this.setState({
     [name]: value
    })
  } else if (type==="checkbox") {
    const checked = e.target.checked;
   
    this.setState({
     [name]: checked
  } 
)}}


  handleSubmit = (e) => {
    e.preventDefault()

    const validation = this.formValidation();
    console.log(validation);
    console.log("działa");


    if(validation.correct) {
    this.setState({
        
    username: "",
    email: "",
    password: "",
    accept: false,
    message: "Formularz został wysłany",
       
      
     errors: {
       username: false,
         email: false,
         password: false,
        accept: false,
         } 
      })
      console.log("formularz wysłany")
      } else {
        this.setState({
          errors: {
            username: !validation.username,
            email: !validation.email,
            password: !validation.password,
           accept: !validation.accept,
         } 
      })

      }
    }
  

formValidation= () => {
   //false - zle
  //true - ok
  let username = false;
  let email = false;
  let password = false;
  let accept = false;
  let correct = false;

  if(this.state.username.length > 10 
    && this.state.username.indexOf(" ") === -1) {
    username = true;
  }

  if(this.state.email.indexOf("@") !== -1 ) {
    email = true;
  }

  if(this.state.password.length === 8) {
    password = true;
  }

  if(this.state.accept === true) {
    accept = true;
  }

  if (username && email && password && accept ) {
    correct = true;
  }

  return ({
    correct,
    username,
    email,
    password,
    accept,
})

}

componentDidUpdate(){
  console.log("update");
  if(this.state.message !== "") {
    setTimeout(()=> this.setState({
      message: " ",
    }), 3000)
  }
}

  render() {
    return (
      <div className="App">
      <form onSubmit={this.handleSubmit} noValidate>
        <label htmlFor='user'>Twoje imię:
        <input type="text" id="user" name="username" 
        value={this.state.username} onChange ={this.handleChange}></input>
        {this.state.errors.username && <span>{this.messages.username_incorrect}</span>}
        </label>
           
           <label htmlFor='email'>Twój email: 
        <input type="email" id="email" name="email" 
        value={this.state.email} onChange ={this.handleChange}></input>
        {this.state.errors.email && <span>{this.messages.email_incorrect}</span>}
        </label>
          
        <label htmlFor='password'>Twoje hasło:
        <input type="password" id="password" name="password" 
        value={this.state.password} onChange ={this.handleChange}></input>
        {this.state.errors.password && <span>{this.messages.password_incorrect}</span>}
        </label> 

        <label htmlFor='accept'>
          <input type="checkbox" id="accept" name='accept' 
          checked={this.state.accept} onChange={this.handleChange}/> Wyrażam zgodę 
          
        </label>
        {this.state.errors.accept && <span>{this.messages.accpet_incorrect}</span>}
        <button>Zapisz się</button>
      </form> 

      {this.state.message && <h3>{this.state.message}</h3>}
      </div>
      

    );
  }
}

export default App;

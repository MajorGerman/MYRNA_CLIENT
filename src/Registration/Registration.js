import React, {useState} from 'react';
import {request, gql} from 'graphql-request';
import "./Registration.css"

function Registration (props) {

  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [firstName, setFirstname] = useState("");
  const [lastName, setLastname] = useState("");

  let query = gql`
    mutation Signup {
      signup(email: "${email}", password: "${pass}", first_name: "${firstName}", last_name: "${lastName}") {
        token
        user {
          id
          email
          first_name
          last_name
        }
      }
    }
  `;

  async function handleSubmit(e) {
    e.preventDefault();

    try {

      const res = await fetch("https://myrna-server.herokuapp.com/", {
          headers: {'Content-Type': 'application/json'},
          method: 'POST',
          body: JSON.stringify({"query": query})
      })

      console.log(await res)
      console.log(await res.json());

      //props.setUserToken()

    } catch (err) {

      console.log(err)

    } 
    
  }

  function handleEmailChange(e) {
    setEmail(e.target.value);
  }

  function handlePassChange(e) {
    setPass(e.target.value);
  }

  function handleFirstnameChange(e) {
    setFirstname(e.target.value);
  }

  function handleLastnameChange(e) {
    setLastname(e.target.value);
  }
    
  return (

    <div className="regPage">

      <div className="regForm">

        <div className="regFormTitle">
          <p className="regFormTitleText"> Registration </p>
        </div>

        <form method='POST' onSubmit={handleSubmit}>

          <input type="email" name="email" onChange={handleEmailChange} value={email} placeholder='Email' required></input><br></br>
          <input type="text" minLength={9} name="pass" onChange={handlePassChange} value={pass} placeholder='Password' required></input><br></br>
          <input type="text" name="firstname" onChange={handleFirstnameChange} value={firstName} placeholder='First Name' required></input><br></br>
          <input type="text" name="lastname" onChange={handleLastnameChange} value={lastName} placeholder='Last Name' required></input><br></br>

          <input type="submit" value="Sign Up"></input>

        </form>

      </div>

    </div>

    
  );
}

export default Registration;
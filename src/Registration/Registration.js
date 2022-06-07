import React, {useState} from 'react';
import {request, gql} from 'graphql-request';
import "./Registration.css"

function Registration (props) {

  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [firstName, setFirstname] = useState("");
  const [lastName, setLastname] = useState("");

  const [errorStyle, setErrorStyle] = useState("");
  const [errorText, setErrorText] = useState("");

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

  async function signUp(e) {
    e.preventDefault();

    try {

      const res = await fetch(process.env.REACT_APP_SERVER_IP, {
          headers: {'Content-Type': 'application/json'},
          method: 'POST',
          body: JSON.stringify({"query": query})
      })

      const res_json = await res.json()

      localStorage.setItem("user_id", res_json.data.signup.user.id);
      localStorage.setItem("token", res_json.data.signup.token);

      //window.location.href = "http://localhost:3000/profile";

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

    <div className='modal'>

      <div className="regPage">

          <div className="regFormDiv">

            <div className="regFormTitle">
              <p className="regFormTitleText"> Sign Up </p>
            </div>

            <div className={errorStyle}>
              <p className="regFormErrorText">{errorText}</p>
            </div>

            <form className='regForm' method='POST' onSubmit={signUp}>
              <input type="email" name="email" onChange={handleEmailChange} value={email} placeholder='Email' required></input><br></br>
              <input type="password"  name="pass" minLength={9} onChange={handlePassChange} value={pass} placeholder='Password' required></input><br></br>
              <input type="text" name="firstname" onChange={handleFirstnameChange} value={firstName} placeholder='First Name' required></input><br></br>
              <input type="text" name="lastname" onChange={handleLastnameChange} value={lastName} placeholder='Last Name' required></input><br></br>
              <div className="regFormButtonsDiv">
                <div className='regFormButtons'>
                  <input type="submit" value="Let's create an account"></input>
                </div>
              </div>
            </form>

          </div>

      </div>
      
    </div>

  );
}

export default Registration;
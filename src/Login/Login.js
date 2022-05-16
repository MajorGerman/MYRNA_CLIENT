import React, {useState} from 'react';
import {gql} from 'graphql-request';
import "./Login.css"
import Modal from 'react-modal/lib/components/Modal';

import crossImg from '../img/cross.svg'

function Login(props) {

  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  const [isOpen, changeOpen] = useState(true);

  let query = gql`
    mutation Signin($email: String!, $password: String!) {
      signin(email: ${email}, password: ${pass}) {
        token
        user {
          id
          roles
        }
      }
    }
  `;

  function closeModal() {
    changeOpen(false);
    props.setLogin(false);
  }

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
    
  return (

      <Modal className="modal"

        isOpen={isOpen}
        ariaHideApp={false}
        onRequestClose={closeModal}

        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">

        <div className="logPage">

            <div className="logXDiv">
              <div className="logX" onClick={closeModal} to="/"> <img src={crossImg}></img> </div>
            </div>

            <div className="logFormDiv">

              <div className="logFormTitle">
                <p className="logFormTitleText"> Sign in </p>
              </div>

              <form className='logForm' method='POST' onSubmit={handleSubmit}>
                <input type="email" name="email" onChange={handleEmailChange} value={email} placeholder='Email' required></input><br></br>
                <input type="text"  name="pass" onChange={handlePassChange} value={pass} placeholder='Password' required></input><br></br>
                <div className="logFormButtonsDiv">
                  <div className='logFormButtons'>
                    <input type="submit" value="Log In"></input>
                    <p>I forgot my password</p>
                  </div>
                </div>
              </form>

            </div>

            <hr></hr>

            <div className="logRegDiv">

              <p> Don't have an account yet? </p>

              <input type="button" value="Register"></input>

            </div>

        </div>

      </Modal>
    
  );
}

export default Login;
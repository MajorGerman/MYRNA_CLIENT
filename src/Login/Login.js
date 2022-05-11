import React, {useState} from 'react';
import {request, gql} from 'graphql-request';
import "./Login.css"
import Modal from 'react-modal/lib/components/Modal';
import {Link} from 'react-router-dom';

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
     
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description">

        <div className="logPage">
          <Link onClick={closeModal} to="/"> X </Link>
        <div className="logForm">
          <div className="logFormTitle">
            <p className="logFormTitleText"> Login </p>
          </div>
          <form method='POST' onSubmit={handleSubmit}>
            <input type="email" name="email" onChange={handleEmailChange} value={email} placeholder='Email' required></input><br></br>
            <input type="text"  name="pass" onChange={handlePassChange} value={pass} placeholder='Password' required></input><br></br>
            <input type="submit" value="Log In"></input>
          </form>
        </div>
      </div>

    </Modal>
    
  );
}

export default Login;
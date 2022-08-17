import React, {useState} from 'react'
import axios from 'axios'
import { Form, Button } from "react-bootstrap";
import Cookies from "universal-cookie";
const cookies = new Cookies();


export default function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [login, setLogin] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    const configuration = {
      method: 'post',
      url: "https://nodejs-mongodb-auth-myapp.herokuapp.com/login",
      data: {
        email,
        password
      }
    }
    axios(configuration)
    .then((result) => {
      cookies.set("TOKEN", result.data.token, {
        path: "/",
      });
      window.location.href ="/auth"
      setLogin(true)
    })
    .catch((error) => {console.log(error)})
  }
  return (
    <>
      <h2>Login</h2>
      <Form>
        {/* email */}
        <Form.Group controlId="formBasicEmail" onSubmit={e=>handleSubmit(e)}>
          <Form.Label>Email address</Form.Label>
          <Form.Control 
          name="email"
          type="email" 
          onChange={e=>setEmail(e.target.value)}
          placeholder="Enter email" />
        </Form.Group>

        {/* password */}
        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control 
          name="password" 
          type="password"
          onChange={e=>setPassword(e.target.value)}
          placeholder="Password" />
        </Form.Group>

        {/* submit button */}
        <Button variant="primary" type="submit" onClick={e=>handleSubmit(e)}>
          Submit
        </Button>
        {login ? (
          <p className="text-success">You are logged in successfully</p>
        ) : (
          <p className="text-danger">You are not logged in</p>
        )}
      </Form>
    </>
  )
}
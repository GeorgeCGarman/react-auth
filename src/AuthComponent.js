import axios from "axios"
import React, { useEffect, useState } from "react"
import Cookies from "universal-cookie"
import {Button} from 'react-bootstrap'
const cookies = new Cookies()
const token = cookies.get("TOKEN")
console.log(token)

export default function AuthComponent() {
  const [message, setMessage] = useState("")

  useEffect(() => {
    const configuration = {
      method: 'get',
      url: "https://nodejs-mongodb-auth-myapp.herokuapp.com/auth-endpoint",
      headers: {
        Authorization: `Bearer ${token}`
      }

    }

    axios(configuration)
    .then((result) => {
      console.log(result);
      setMessage(result.data.message)
    })
    .catch((error) => {
      error = new Error()
    })
  }, [])

  const logout = () => {
    cookies.remove("TOKEN", {path: '/'})
    window.location.href = '/'
  }
  return (
    <div className='text-center'>
      <h1 className="text-center">Auth Component</h1>
      <h3 className="text-center text-success">{message}</h3>
      <Button type='submit' variant='danger' onClick={() => logout()}>
      Logout
      </Button>
    </div>
  )
}
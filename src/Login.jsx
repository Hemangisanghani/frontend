import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios';
import './index.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom'
import { AuthContext } from './auth/Auth'
import Button from 'react-bootstrap/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';


const Login = () => {
  const navigate = useNavigate()
  const { currentUser, onAuthChange } = useContext(AuthContext)
  useEffect(() => {
    if (currentUser) {
      navigate('/')
    }
  }, [currentUser])

  const [data, setData] = useState({
    email: '',
    password: '',
  })

  const inputEvent = (event) => {
    const { value, name } = event.target

    setData((prev) => {
      console.log(prev)
      return {
        ...prev,
        [name]: value,
      }
    })
  }

  const onSubmit = (event) => {
    event.preventDefault()
    const { email, password } = data
    const user = { email, password }
    axios
      .post('http://localhost:3001/api/v1/users/login', user)
      .then(function (response) {
        console.log(response.data)
        localStorage.setItem('token', response.data.token)
        setTimeout(() => {
          onAuthChange(response.data.token)
          navigate('/')
        }, 2000)
        toast(response.data.status, { autoClose: 2000 })
      })
      .catch(function (error) {
        console.log(error)
        toast(error.response.data.message, { autoClose: 3000 })
      })
  }

  return (
    <>
      <div className="App">
        <header className="App-header">
          <div className="Login">
            <h1>Login</h1>
            <Box
              sx={{
                '& .MuiTextField-root': { m: 1, width: '25ch' },
              }}
              noValidate
              autoComplete="off"
            >
              <form onSubmit={onSubmit}>

                <div>
                  <TextField
                    required
                    id="outlined-email-input"
                    label="Email"
                    type='email'
                    placeholder="Enter Your email"
                    className="form-control"
                    name='email'
                    onChange={inputEvent}
                    value={data.email}
                  />
                </div>
                <br />
                <div>
                  <TextField
                    required
                    id="outlined-password-input"
                    label="Password"
                    type='password'
                    placeholder="Enter Your password"
                    name='password'
                    className="form-control"
                    onChange={inputEvent}
                    value={data.password}
                  />
                </div>
                <br />
                <Button style={{ marginLeft: '70px', display: 'flex' }} type="submit" >
                  Login{' '}
                </Button>
                <ToastContainer />
              </form>
            </Box>
          </div>
        </header>
      </div>

    </>
  )
}
export default Login

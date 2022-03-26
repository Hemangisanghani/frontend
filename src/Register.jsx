import React, { useContext, useEffect, useState } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import axios from 'axios'
import './index.css'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle';
import Button from 'react-bootstrap/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { AuthContext } from './auth/Auth'
import { useNavigate } from 'react-router-dom'


const Register = () => {
  const navigate = useNavigate()
  const { currentUser, onAuthChange } = useContext(AuthContext)

  useEffect(() => {
    if (currentUser) {
      navigate('/')
    }
  }, [currentUser])

  const [data, setData] = useState({
    name: '',
    email: '',
    password: '',
  })
  const [file, setFile] = useState('')

  const fileHandler = (e) => {
    console.log(e.target.files[0])
    setFile(e.target.files[0])
  }

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
    const { name, email, password } = data
    const user = { name, email, password }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("avatar", file);
    axios
      .post('http://localhost:3001/api/v1/users/register', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
      })
      .then(function (response) {
        console.log(response)
        console.log(response.data.status)
        toast(response.data.message, { autoClose: 10000 })
      })
      .catch(function (error, response) {
        console.log(error.response.data.message)
        toast(error.response.data.message, { autoClose: 5000 })
      })
    setData('')

    localStorage.setItem('email', data.email)
    localStorage.setItem('password', data, password)
  }


  return (
    <>
  
      <div className="App" >
        <header className="App-header">
          <div className="Login">
          <h1>Register</h1>
            <Box
              sx={{
                '& .MuiTextField-root': { m: 1, width: '28ch' },
              }}
              noValidate
              autoComplete="off"
            >
              <form onSubmit={onSubmit}>
                <div>
                  <TextField
                    id="outlined-email-input"
                    label="Name"
                    type="name"
                    className="form-control"
                    name="name"
                    onChange={inputEvent}
                    value={data.name} />
                </div>
                <div>
                  <TextField
                    id="outlined-email-input"
                    label="Email"
                    type="email"
                    className="form-control"
                    name="email"
                    onChange={inputEvent}
                    value={data.email} />
                </div>
                <div>
                  <TextField
                    id="outlined-password-input"
                    label="Password"
                    type="password"
                    className="form-control"
                    onChange={inputEvent}
                    value={data.password}
                    name="password"
                    placeholder='Enter Password'
                  />
                </div>
                <div>
                {file && (
                  <img
                    type="file"
                    src={URL.createObjectURL(file)}
                    alt="Add Profile Pick"
                    style={ {width:'150px',height:'150px',marginLeft:'10px'}}
                  />
                )}
                <br/>
                <input
                  required
                  type="file"
                  onChange={fileHandler}
                  name="avatar"
                  style={{width:'225px'}}
                />
                </div>
                <ToastContainer />
                <br />
                <Button style={{ marginLeft: '70px', display: 'flex' }} variant="primary" type="submit">
                  Register
                </Button>{' '}
              </form>
            </Box>
          </div>
        </header>
      </div>
    
    </>
  )
}



export default Register

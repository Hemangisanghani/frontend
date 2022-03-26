import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Register from './Register'
import Login from './Login'
import GetAllPost from './GetAllPost'
import AllUsers from './GetAllUsers'
import PostByUserId from './GetPostById.jsx'
import PostByPostId from './PostByPostId'
import Appbar from './Navbar'
import PrivateRoute from './auth/PrivateRoute'
import { AuthProvider } from './auth/Auth';

import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import '../node_modules/bootstrap/dist/js/bootstrap.bundle'

const App = () => {
    return (
        <>
            <AuthProvider>
        <Appbar />
        <Routes>
          <Route
            exact
            path="/"
            element={
              <PrivateRoute>
                <GetAllPost />
              </PrivateRoute>
            }
          />
                <Route exact path="register" element={<Register />}></Route>
                <Route exact path="login" element={<Login />}></Route>
                <Route exact path="/" element={<GetAllPost />}></Route>
                <Route exact path="getallusers" element={<AllUsers />}></Route>
                <Route path="/posts/:user_id" element={<PostByUserId />}></Route>
                <Route path="/posts/post/:post_id" element={  <PostByPostId />}></Route>
                <Route path="/posts/create" element={<PostByUserId />}></Route>

            </Routes>
            </AuthProvider>
        </>
    )}
export default App

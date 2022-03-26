import React, { useEffect, useState } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import axios from 'axios'
import { useParams, Link, useRoutes } from 'react-router-dom'
import CircularProgress from '@mui/material/CircularProgress'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import { Divider } from '@mui/material'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import Button from 'react-bootstrap/Button';
import InputLabel from '@mui/material/InputLabel';
import EditIcon from '@mui/icons-material/Edit';

const PostByUserId = () => {
    const { user_id } = useParams()
    const [loader, setloader] = useState(false)
    const [data, setData] = useState({
        topicname: ' ',
        description: ' '
    })
    const [data1, setData1] = useState([])

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

    const upload = (event) => {
        const token = localStorage.getItem('token')
        event.preventDefault()
        const params = {
            user_id: user_id,
            topicname: data.topicname,
            description: data.description,
        }

        axios
            .post('http://localhost:3001/api/v1/posts/create', params, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then(function (response) {
                console.log(response.data)
                fetchPosts()
                toast(response.data.status)
            })
            .catch(function (error) {
                console.log(error)
                toast(error.response.data.message, { autoClose: 5000 })
            })
    }

    useEffect(() => {
        if (user_id) {
            async function getData() {
                setloader(true)
                const token = localStorage.getItem("token");
                axios
                    .get(`http://localhost:3001/api/v1/posts/${user_id}`, {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    })
                    .then(function (response) {
                        const item = response.data
                        console.log(item);
                        setloader(false)
                        setData1(item)
                    })
                    .catch(function (error) {
                        console.log(error)
                        toast(error.response.data.message, { autoClose: 5000 })
                        setloader(false)

                    })
            }
            getData();
        }
    }, [user_id])

    const fetchPosts = () => {
        if (user_id) {
            setloader(true)
            axios
                .get(`http://localhost:3001/api/v1/posts/${user_id}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                })
                .then(function (response) {
                    console.log(response.data)
                    setData1(response.data)
                    setloader(false)

                })
                .catch(function (error) {
                    console.log(error)
                    toast(error.response.data.message, { autoClose: 5000 })
                    setloader(false)
                })
        }
    }


    const deletePost = (post_id) => {
        setloader(true)
        if (post_id) {
            axios
                .delete(`http://localhost:3001/api/v1/posts/${post_id}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                })
                .then(function (response) {
                    toast(response.status)
                    console.log("delete")
                    fetchPosts()
                    setloader(false)
                })
                .catch(function (error) {
                    console.log(error)
                    toast(error.response.message, { autoClose: 5000 })
                    setloader(false)
                })
        }
    }

    // const editPost = (post_id) => {
    //     setloader(true)
    //     if (post_id) {
    //         axios
    //             .put(`http://localhost:3001/api/v1/posts/${post_id}`, {
    //                 headers: {
    //                     Authorization: `Bearer ${localStorage.getItem('token')}`,
    //                 },
    //             })
    //             .then(function (response) {
    //                 toast(response.status)
    //                 console.log("delete")
    //                 fetchPosts()
    //                 setloader(false)
    //             })
    //             .catch(function (error) {
    //                 console.log(error)
    //                 toast(error.response.message, { autoClose: 5000 })
    //                 setloader(false)
    //             })
    //     }
    // }

    if (loader) {
        return (
            <Box
                sx={{
                    position: 'fixed',
                    top: '50%',
                    left: '50%',
                }}
            >
                <CircularProgress color="secondary" />
            </Box>
        )
    }

    if (user_id) {
        return (
            <>
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                        justifyContent: 'left',
                        paddingTop: '70px',
                        marginLeft:'30px'
                    }}>
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            flexWrap: 'wrap',
                            justifyContent: 'left',
                            alignItems: 'center',
                        }}>
                        <form onSubmit={upload}>
                            {/* <Card >
                            <div className="card_info"> */}
                            <InputLabel shrink htmlFor="bootstrap-input">
                                TopicName
                            </InputLabel>
                            
                            <TextField
                                required
                                id="filled-basic"
                                variant="filled"
                                onChange={inputEvent}
                                name="topicname"
                                value={data.topicname} 
                                style = {{width: 1800}} 
                                />
                            <br /><br />
                            <InputLabel shrink htmlFor="bootstrap-input">
                                Description
                            </InputLabel>
                            <TextField
                                required
                                id="filled-basic"
                                variant="filled"
                                onChange={inputEvent}
                                name="description"
                                value={data.description}
                                style = {{width: 1800 }} 
                                size="large"

                                 />
                            <br />
                            <Button type="submit" variant='primary' style={{ marginTop: '15px' }}>
                                Uplaod
                            </Button>
                            <ToastContainer />
                        </form>
                    </div>
                </div>
                <Divider>Posts</Divider>
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                        justifyContent: 'space-around',
                        padding: '5px',
                    }}
                >
                    {data1.map((val, index) => (
                        <div key={index} style={{ paddingBottom: '20px', borderRadius: '10PX', borderColor: 'gray' }}>
                            <Card sx={{ width: 400, backgroundColor: ' #ededed' }}>
                                <div key={val.post_id}>
                                    <CardContent>
                                        <Typography variant="h5" component="div" style={{ fontWeight: '500', textTransform: "capitalize" }}>
                                            {val.topicname}
                                        </Typography>
                                        <hr/>
                                        <Typography variant="h8" component="div" style={{ fontWeight: '500', textTransform: "capitalize"  }}>
                                            Description:{val.description}
                                        </Typography>
                                        <hr />
                                        <span>
                                            <Link style={{ paddingBottom: '10px', marginLeft: '8px' }} to={`/posts/post/${val.post_id}`}>
                                                Comment
                                            </Link>
                                            <Button onClick={() => deletePost(val.post_id)} style={{ marginLeft: '220px', fontWeight: '500' }}>
                                                <DeleteOutlineIcon />
                                            </Button>
                                            {/* <Button onClick={() => editPost(val.post_id)} style={{ marginLeft: '16px', fontWeight: '500' }}>
                                                <EditIcon/>
                                            </Button> */}
                                        </span>
                                    </CardContent>
                                </div>
                            </Card>
                        </div>
                    ))}
                </div>
            </>
        )
    }
}


export default PostByUserId
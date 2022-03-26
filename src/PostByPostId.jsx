import React, { useEffect, useState } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import axios from 'axios'
import { useNavigate, useParams, Link } from 'react-router-dom'
import CircularProgress from '@mui/material/CircularProgress'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import { Divider } from '@mui/material'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import Button from 'react-bootstrap/Button';
import AddCommentTwoToneIcon from '@mui/icons-material/AddCommentTwoTone';
import CardActions from '@mui/material/CardActions';


const PostByPostId = () => {
    const { post_id } = useParams()
    const [loader, setloader] = useState(false)
    const [data, setData] = useState([])
    const [comments, setComments] = useState([])
    const [data1, setData1] = useState({
        comment: ' '

    })

    useEffect(() => {
        async function getData() {
            setloader(true)
            const token = localStorage.getItem("token");
            axios
                .get(`http://localhost:3001/api/v1/posts/post/${post_id}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })
                .then(function (response) {
                    const item = response.data
                    console.log(item);
                    setloader(false)
                    setData(item)
                })
                .catch(function (error) {
                    console.log(error)
                    toast(error.response.data.message, { autoClose: 5000 })
                    setloader(false)

                })
        }
        getData();
    }, [post_id])

    const addEvent = (event) => {
        const { value, name } = event.target

        setData1((prev) => {
            console.log(prev)
            return {
                ...prev,
                [name]: value
            }
        });
    }

    const addComment = (event) => {
        if (post_id) {
            event.preventDefault();
            setloader(true)
            const { comment } = (data1);
            const params = {
                comment: comment,
                post_id: post_id
            }
            axios
                .post(`http://localhost:3001/api/v1/comments/create`, params, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                })
                .then(function (response) {
                    const item = response.data
                    console.log(item)
                    console.log(response)
                    toast(response.data.status, { autoClose: 3000 })
                    fetchPostComments()
                    setloader(false)

                })
                .catch(function (error) {
                    toast(error.response.data.message, { autoClose: 3000 })
                    setloader(false)
                    console.log(error);
                })
        }
    }

    useEffect(() => {
        if (post_id) {
            setloader(true)
            axios
                .get(`http://localhost:3001/api/v1/comments/${post_id}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                })
                .then(function (response) {
                    console.log(response.data)
                    setComments(response.data)
                    setloader(false)

                })
                .catch(function (error) {
                    console.log(error)
                    toast(error.response.data.message, { autoClose: 5000 })
                    setloader(false)

                })
        }
    }, [post_id])

    const fetchPostComments = () => {
        if (post_id) {
            setloader(true)
            axios
                .get(`http://localhost:3001/api/v1/comments/${post_id}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                })
                .then(function (response) {
                    console.log(response.data)
                    setComments(response.data)
                    setloader(false)

                })
                .catch(function (error) {
                    console.log(error)
                    toast(error.response.data.message, { autoClose: 5000 })
                    setloader(false)

                })
        }

    }


    const deleteComment = (commentId) => {
        if (commentId) {
            setloader(true)
            axios
                .delete(`http://localhost:3001/api/v1/comments/${commentId}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                })
                .then(function (response) {
                    toast(response.status)
                    console.log(response)
                    fetchPostComments()
                    setloader(false)
                })
                .catch(function (error) {
                    console.log(error)
                    toast(error.response.message, { autoClose: 5000 })
                    setloader(false)
                })
        }
    }

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
    return (
        <>
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    justifyContent: 'space-around',
                    padding: '10spx',
                }}
            >
                {data.map((val, index) => (
                    <div key={index} style={{  borderRadius: '10PX', borderColor: 'gray' }}>
                        <Card sx={{ width: 400, backgroundColor: '#ededed', marginTop: '30px' }}>
                            <div key={val.post_id}>

                                <CardContent>
                                    <Typography variant="h5" component="div" style={{ fontWeight:'500' }}>
                                        {val.topicname}
                                    </Typography>
                                    <hr />
                                    <Typography variant="h8" component="div" style={{ fontWeight:'500' }}>
                                        Description:{val.description}
                                    </Typography>
                                    <br />
                                    <CardActions>
                                        <Typography variant="h8" component="div"  style={{ marginLeft:'150px' }}>
                                            {val.created_on}
                                        </Typography>

                                    </CardActions>
                                </CardContent>
                            </div>
                            <div className="input-group">
                                <input className="form-control" type="text" placeholder="Add Comment" name='comment' onChange={addEvent} value={data1.comment} /><br />
                                <span className="input-group-btn">
                                    <button className="btn btn-primary" onClick={addComment}><AddCommentTwoToneIcon /></button>
                                </span>
                                <ToastContainer />
                            </div>

                        </Card>
                    </div>
                ))}
            </div>
            <Divider>Comments</Divider>
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    justifyContent: 'space-around',
                }}>
                {(comments || []).map((comment) => {
                    return (
                        <div className="icards">
                            <div key={comment.comment_id}>
                                <div className="icard" style={{ height: 'auto' }}>
                                    <div className="icard_info" style={{ backgroundColor: "lightgray", marginLeft: '30px' }}>
                                        <div style={{ marginLeft: '5px', fontWeight: '500' }}>
                                            {comment.comment}
                                        </div>
                                        <Button style={{ marginLeft: '130px', marginTop: '30px' }} onClick={() => deleteComment(comment.comment_id)} >
                                            <DeleteOutlineIcon />
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>

                    )
                })}
            </div>
        </>
    )
}

export default PostByPostId
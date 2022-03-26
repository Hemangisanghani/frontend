import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import './index.css'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import '../node_modules/bootstrap/dist/js/bootstrap.bundle'
import CircularProgress from '@mui/material/CircularProgress'
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Image from 'react-bootstrap/Image'
import CardHeader from '@mui/material/CardHeader';
import Avatar from '@mui/material/Avatar';
import { red } from '@mui/material/colors';


const GetAllPost = () => {
    const [data, setData] = useState([])
    const [loader, setloader] = useState([])

    useEffect(() => {
        getData()
    }, [])

    async function getData() {
        const token = localStorage.getItem('token')
        setloader(true)
        axios
            .get(`http://localhost:3001/api/v1/posts`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            .then(function (response) {
                const item = response.data
                console.log(item)
                setData(item)
                setloader(false)
            })
            .catch(function (error) {
                console.log(error)
                toast(error.response.data.message, { autoClose: 5000 })
                setloader(false)
            })
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
            <>
                {/* <ul> */}
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                        justifyContent: 'space-around',
                        padding: '10px',
                    }}
                >
                    {data.map((val, index) => (
                        <div key={index} style={{ paddingBottom: '20px', borderRadius: '10PX', borderColor: 'gray' }}>
                            <Card sx={{ width: 400, backgroundColor: ' #ededed' }}>
                                <div key={val.id}>
                                    <CardHeader
                                        avatar={
                                            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                                                <Image src={`http://localhost:3001/images/${val.user_avatar}`} />
                                           </Avatar>
                                        }
                                        title={val.name}
                                    />
                                    <hr/>
                                    <CardContent>
                                        <Typography variant="h7" component="div" style={{ fontWeight: '600', paddingBottom: '10px', textTransform: "capitalize" }}>
                                            TopicName:{val.topicname}

                                        </Typography>
                                        <Typography variant="h8" component="div" style={{ fontWeight: '400', paddingBottom: '10px', textTransform: "capitalize" }}>
                                            Description:{val.description}
                                        </Typography>
                                        <Typography variant="h8" component="div" style={{ marginLeft: '180px' }}>
                                            {val.created_on}
                                        </Typography>
                                    </CardContent>

                                </div>
                            </Card>
                        </div>

                    ))}
                </div>
            </>
        </>
    )
}

export default GetAllPost

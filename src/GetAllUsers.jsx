import axios from 'axios';
import React, { useEffect, useState } from 'react'
import './index.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'
import { Link } from 'react-router-dom';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Image from 'react-bootstrap/Image'


const AllUsers = () => {
    const [data, setdata] = useState([]);
    const [searchTerm, setSearchTerm] = useState('')
    const [loader, setloader] = useState(false)

    useEffect(() => {
        async function getData() {
            setloader(true)
            const token = localStorage.getItem("token");
            axios
                .get('http://localhost:3001/api/v1/users', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })
                .then(function (response) {
                    const item = response.data
                    console.log(item);
                    setdata(item)
                    setloader(false)
                })
                .catch(function (error) {
                    console.log(error)
                    toast(error.response.data.message, { autoClose: 5000 })
                    setloader(false)

                })
        }
        getData();
    }, [])

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
            <div className="my-1">
                <h1 className="text-center" style={{ fontFamily: 'Gugi , cursive' }}>Mange AllUsers</h1>
            </div>
            <div className="my-5 bg-transparent">
                <div className="row">
                    <div className="col-md-9 col-10 mx-auto">
                        <TableContainer component={Paper}>
                            <Table aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                    <TableCell>User No</TableCell>
                                        <TableCell>User Image</TableCell>
                                        <TableCell>User Name</TableCell>
                                        <TableCell>User Email</TableCell>
                                        <TableCell align="right">Operations ( Add Post )</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                              {data.map((row, index) => (
                                        <TableRow key={index}>
                                                <>
                                                    <TableCell >{index + 1}</TableCell>
                                                    <TableCell component="th" scope="row" >
                                                        <Image style={{ width: '45px' ,height:'45px' }} src={`http://localhost:3001/images/${row.user_avatar}`} />
                                                    </TableCell>
                                                    <TableCell component="th" scope="row">{row.name}</TableCell>
                                                    <TableCell component="th" scope="row" >{row.email}</TableCell>
                                                    <TableCell align="right">
                                                        <Link style={{ paddingBottom: '20px' }} to={`/posts/${row.user_id}`} >
                                                            Add Post
                                                        </Link>
                                                    </TableCell>
                                                </>
                                               
                                                <>

                                                </>
                                        </TableRow>

                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AllUsers
import React, { useContext } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import { NavLink } from "react-router-dom";
import { AuthContext } from './auth/Auth'

const Appbar = () => {
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const { currentUser, onAuthChange } = useContext(AuthContext)

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>

                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                        >            {!currentUser && (
                            <>
                                <MenuItem onClick={handleCloseNavMenu}>
                                    <NavLink to="register">Register </NavLink>
                                </MenuItem>
                                <MenuItem onClick={handleCloseNavMenu}>
                                    <NavLink to="login">Login</NavLink>
                                </MenuItem>
                            </>
                        )}
                            {currentUser && (
                                <>
                                    <MenuItem onClick={handleCloseNavMenu}>
                                        <NavLink to="getallusers">Users</NavLink>
                                    </MenuItem>
                                    <MenuItem onClick={handleCloseNavMenu}>
                                        <NavLink to="/">GetAllPost</NavLink>
                                    </MenuItem>
                                    <MenuItem onClick={handleCloseNavMenu}>
                                        <NavLink to={' '}
                                            onClick={() => {
                                                localStorage.removeItem('token')
                                                onAuthChange(null)
                                            }}>LogOut</NavLink>
                                    </MenuItem>
                                </>
                            )}
                        </Menu>
                    </Box>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        {!currentUser && (
                            <>
                                <Button
                                    onClick={handleCloseNavMenu}
                                    sx={{ my: 2, color: 'white', display: 'block' }}
                                >
                                    <NavLink style={{ color: 'white', textDecoration: 'none' }} to={'register'}>Register</NavLink>
                                </Button>
                                <Button
                                    onClick={handleCloseNavMenu}
                                    sx={{ my: 2, color: 'white', display: 'block' }}
                                >
                                    <NavLink style={{ color: 'white', textDecoration: 'none' }} to={'login'}>Login</NavLink>
                                </Button>
                            </>
                        )}
                        {currentUser && (
                            <>
                                <Button
                                    onClick={handleCloseNavMenu}
                                    sx={{ my: 2, color: 'white', display: 'block' }}
                                >
                                    <NavLink style={{ color: 'white', textDecoration: 'none', fontWeight: '500' }} to={'getallusers'}>users</NavLink>
                                </Button>

                                <Button
                                    onClick={handleCloseNavMenu}
                                    sx={{ my: 2, color: 'white', display: 'block' }}
                                >
                                    <NavLink style={{ color: 'white', textDecoration: 'none' }} to={'/'}>GetAllPost</NavLink>
                                </Button>

                            </>
                        )}
                    </Box>
                    <Box sx={{ flexGrow: 0 }}>
                        <Button
                            onClick={handleCloseNavMenu}
                            sx={{ my: 2, color: 'white', display: 'block' }}
                        >
                            <NavLink style={{ color: 'white', textDecoration: 'none' }} to={''}
                                onClick={() => {
                                    localStorage.removeItem('token')
                                    onAuthChange(null)
                                }}>LogOut</NavLink>
                        </Button>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
};
export default Appbar;

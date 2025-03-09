import * as React from 'react';
import { useState } from 'react';
import {
  AppBar, Toolbar, IconButton, Typography, Menu,
  Container, Avatar, Button, Tooltip, MenuItem, TextField,
  Dialog, DialogActions, DialogContent, DialogTitle, Box
} from '@mui/material';

import MenuIcon from '@mui/icons-material/Menu';
import AdbIcon from '@mui/icons-material/Adb';

const pages = ['Home', 'Menu', 'Offers', 'Contact'];
const settings = ['Profile', 'Orders', 'Settings', 'Logout'];

function Navb() {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [openLogin, setOpenLogin] = useState(false);
  const [loginData, setLoginData] = useState({ uname: '', pwd: '' });
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleOpenNavMenu = (event) => setAnchorElNav(event.currentTarget);
  const handleOpenUserMenu = (event) => setAnchorElUser(event.currentTarget);
  const handleCloseNavMenu = () => setAnchorElNav(null);
  const handleCloseUserMenu = () => setAnchorElUser(null);
  const handleLoginClick = () => setOpenLogin(true);
  const handleCloseLogin = () => setOpenLogin(false);
  
  const handleInputChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };
  
  const handleLoginSubmit = async () => {
    try {
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginData),
      });

      const data = await response.json();
      if (response.ok) {
        alert('Login Successful!');
        setIsLoggedIn(true);
        handleCloseLogin();
      } else {
        alert(data.message || 'Invalid Credentials');
      }
    } catch (error) {
      alert('Login Failed');
    }
  };

  return (
    <>
      <AppBar position="static" sx={{ backgroundColor: '#1e1e2f', padding: '10px 0' }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1, color: '#ffcc00' }} />
            <Typography
              variant="h5"
              component="a"
              href="#"
              sx={{
                flexGrow: 1,
                color: '#ffcc00',
                textDecoration: 'none',
                fontWeight: 'bold',
              }}
            >
              Digital Menu
            </Typography>

            <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 2 }}>
              {pages.map((page) => (
                <Button key={page} sx={{ color: 'white', textTransform: 'uppercase' }}>
                  {page}
                </Button>
              ))}
            </Box>

            <Box sx={{ flexGrow: 0 }}>
              {isLoggedIn ? (
                <Tooltip title="Account Settings">
                  <IconButton onClick={handleOpenUserMenu}>
                    <Avatar alt="User" src="/static/images/avatar/1.jpg" />
                  </IconButton>
                </Tooltip>
              ) : (
                <Button variant="contained" sx={{ backgroundColor: '#ffcc00', color: '#1e1e2f' }} onClick={handleLoginClick}>
                  Login
                </Button>
              )}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      <Dialog open={openLogin} onClose={handleCloseLogin}>
        <DialogTitle sx={{ textAlign: 'center', fontWeight: 'bold' }}>Login</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Username"
            type="text"
            name="uname"
            fullWidth
            variant="outlined"
            value={loginData.uname}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            label="Password"
            type="password"
            name="pwd"
            fullWidth
            variant="outlined"
            value={loginData.pwd}
            onChange={handleInputChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseLogin}>Cancel</Button>
          <Button onClick={handleLoginSubmit} variant="contained" sx={{ backgroundColor: '#ffcc00', color: '#1e1e2f' }}>
            Login
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default Navb;

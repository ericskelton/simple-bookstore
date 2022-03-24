// modified from https://mui.com/components/app-bar/#main-content App Bar with search field
import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import {useNavigate} from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import MenuIcon from '@mui/icons-material/Menu';
import Button from '@mui/material/Button';



export default function SearchAppBar(props) {
  const navigate = (path) => {
    window.location.href = path;
  }
  return (
    <>
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="sticky">
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            Simple Bookstore
          </Typography>
          <Button color="secondary" onClick={() => navigate('/admin')}>Admin</Button>
          {/*<Button color="secondary" onClick={() => navigate('/login')}>Login</Button>*/}
          <Button color="secondary" onClick={() => navigate('/')}>Home</Button>
          {/*<Button color="secondary" onClick={() => navigate('/register')}>Register</Button>*/}
        </Toolbar>
      </AppBar>
    </Box>
    {props.children}
    </>
  );
}
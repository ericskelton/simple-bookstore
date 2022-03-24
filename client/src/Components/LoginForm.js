import React, {useState, useContext} from 'react'
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../Auth/AuthContext';
import {TextField, Button, Switch, Typography} from '@mui/material';
import axios from 'axios';



export default function LoginForm(props) {
    const [auth, setAuth] = useContext(AuthContext);
    const navigate = useNavigate();
    const {variant} = props;
    // assert(variant === "login" || variant === "register", "variant must be either 'login' or 'register'");
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [admin, setAdmin] = useState(false);
    const send = () => {
        axios.post(variant, {
            username: username,
            password: password,
            admin: admin
            }).then(res => {
                
                setAuth({isLoggedIn: true, token: res.data.token, username: res.data.username});
                navigate(`/`);
            })
    }
    return (
        <div>
            <TextField
                label="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                variant="standard"
                sx={{paddingBottom: 1, paddingHorizontal: 15, marginHorizontal: 15}}
            />
            <TextField
                label="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                variant="standard"
                sx={{paddingBottom: 1, paddingHorizontal: 15, marginHorizontal: 15}}
            />
            {variant === 'register' && (<><Typography>Admin</Typography> <Switch onClick={() => setAdmin(!admin)} checked={admin} /></>)}
            <Button variant="contained" color="primary" onClick={send}>{variant}</Button>

        </div>
    )
}   

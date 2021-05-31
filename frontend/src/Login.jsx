import React, { useState, useEffect } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import axios from 'axios';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';

import Avatar from '@material-ui/core/Avatar';
// import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {Alert} from '@material-ui/lab';
// import { Alert, Modal } from 'react-bootstrap';

import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';

import { useForm } from "react-hook-form";

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://material-ui.com/">
                Your Website
        </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    root: {
        width: '100%',
        '& > * + *': {
            marginTop: theme.spacing(2),
        },
    },
}));



const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    // const [show, setShow] = useState(false);
    // const [error, setError] = useState(null);

    const firstEvent = (event, setFunction) => {
        setFunction(event.target.value)
    }

    const history = useHistory();
    let classes = useStyles();
    const {
        register,
        handleSubmit,
        errors
    } = useForm();
    const onSubmit = (data) => {
        console.log(data);
    };

    // const onSubmit = (e) => {
    //     e.preventDefault()
    //     const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    //     if (!email || !re.test(String(email).toLocaleLowerCase())) {
    //       setError("Please Check Email");
    //     }
    //     else if (password.length < 6) {
    //       setError("password length must be 6 charcter")
    //     }
    //     else {
    //         LoginUser();
    //     }
    //   }

    const LoginUser = async () => {
        try {
            const loginData = await axios({
                method: 'post',
                url: "http://localhost:8000/api/user/login",
                data: {
                    "email": email,
                    "password": password
                }
            })

            if (loginData.data.code === 200) {
                if (loginData.data.data.type === "Admin") {
                    // setShow(true)
                    // setError(null)
                    history.push('/dashboard')
                    // alert(loginData.data.data.message)
                    // { <div className={classes.root}>< Alert severity="success" > {loginData.data.data.message}</Alert > </div> }
                    logindatafunction(loginData.data.data.token);
                } else {
                    if (loginData.data.data.type === "User") {
                        // setShow(true)
                        // setError(null)
                        history.push('/userDashboard')
                        // alert(loginData.data.data.message)
                        // { <div className={classes.root}>< Alert severity="success" > {loginData.data.data.message}</Alert > </div> }
                        logindatafunction(loginData.data.data.token);
                    }
                }
            }
        } catch (e) {
            console.log("Error========", e.response);
            // alert(e.response.data.data)
            { < Alert severity="success" > {e.response.data.data}</Alert > }
        }
    }

    // const ShowError = () => {
    //     if (show)
    //       return (
    
    //         <Modal
    //           size="sm"
    //           show={show}
    //         >
    //           <Alert style={{ height: 80 }} variant="success" onClose={() => { setShow(false) }} dismissible>
    //             <Alert.Heading>Successfully Login </Alert.Heading>
    //           </Alert>
    //         </Modal>
    
    //       )
    //     else
    //       return (
    //         <div>
    //           {error ?
    //             <Alert style={{ height: 80 }} variant={'danger'} onClose={() => { setError(null) }} dismissible>
    //               <Alert.Heading>{error} </Alert.Heading>
    //             </Alert> :
    //             null
    //           }
    //         </div>
    //       )
    //   }

    function logindatafunction(data) {
        window.localStorage.setItem("data", data)
    }


    return (
        <>
            <div >
                <AppBar position="static">
                    <Toolbar>
                        <IconButton edge="start" className={classes.menuButton} color="inherit" >
                            <ShoppingCartIcon />
                        </IconButton>
                        <Typography variant="h6">
                            ECommerce
                        </Typography>
                        <Button color="inherit" style={{ marginLeft: "80%", backgroundColor: "white" }}><NavLink exact activeClassName="active_class" to="/" color="inherit">Home</NavLink></Button>
                    </Toolbar>
                </AppBar>
                <br />
            </div>
            {/* <div className="login">
                <input type="text" placeholder="Enter Email" autoComplete="off" onChange={(item) => { firstEvent(item, setEmail) }} />
                <br />
                <input type="password" placeholder="Enter Password" autoComplete="off" onChange={(item) => { firstEvent(item, setPassword) }} />
                <br />
                <button onClick={LoginUser} style={{ "cursor": "pointer" }}>Login</button>
                <br />
                <NavLink exact activeClassName="" to="/register" >You haven't Account?</NavLink>
            </div> */}
            <div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Container component="main" maxWidth="xs">
                        <CssBaseline />
                        <div className={classes.paper}>
                            <Avatar className={classes.avatar}>
                                <LockOutlinedIcon />
                            </Avatar>
                            <Typography component="h1" variant="h5">
                                Sign in
                         </Typography>
                            <ValidatorForm className={classes.form} >
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                    autoFocus
                                    onChange={(item) => { firstEvent(item, setEmail) }}
                                // ref={register({ required: true })}
                                />
                                {errors?.email?.type === "required" && <p>This field is required</p>}
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="current-password"
                                    onChange={(item) => { firstEvent(item, setPassword) }}
                                />
                                <FormControlLabel
                                    control={<Checkbox value="remember" color="primary" />}
                                    label="Remember me"
                                />
                                <Button
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    className={classes.submit}
                                    onClick={LoginUser}
                                >
                                    Sign In
                            </Button>
                                <Grid container>
                                    <Grid item xs>
                                        <Link href="#" variant="body2">
                                            Forgot password?
                                    </Link>
                                    </Grid>
                                    <Grid item>
                                        <Link href="/register" variant="body2">
                                            {"Don't have an account? Sign Up"}
                                        </Link>
                                    </Grid>
                                </Grid>
                            </ValidatorForm>
                        </div>
                        <Box mt={8}>
                            <Copyright />
                        </Box>
                        {/* <ShowError /> */}
                    </Container>
                </form>
            </div>
        </>
    )
}

export default Login;
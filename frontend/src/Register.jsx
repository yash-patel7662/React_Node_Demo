import React, { useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import axios from 'axios';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
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

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

// import { makeStyles } from '@material-ui/core/styles';
// import FormLabel from '@material-ui/core/FormLabel';
// import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
// import Checkbox from '@material-ui/core/Checkbox';

// function RadioButtonsGroup() {
//     const [value, setValue] = React.useState('female');

//     const handleChange = (event) => {
//         setValue(event.target.value);
//     };

//     return (
//         <FormControl component="fieldset">
//             <FormLabel component="legend">Gender</FormLabel>
//             <RadioGroup aria-label="gender" name="gender1" value={value} onChange={handleChange}>
//                 <FormControlLabel value="female" control={<Radio />} label="Female" />
//                 <FormControlLabel value="male" control={<Radio />} label="Male" />
//                 <FormControlLabel value="other" control={<Radio />} label="Other" />
//             </RadioGroup>
//         </FormControl>
//     );
// }

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
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 400,
    },
}));

const Register = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [DOB, setDOB] = useState('');
    const [Hobbies, setHobbies] = useState('');
    const [Gender, setGender] = useState('');

    const firstEvent = (event, setFunction) => {
        setFunction(event.target.value)
    }

    const history = useHistory();

    const Register = async (res, req, next) => {
        try {
            const data = {
                "firstname": firstName,
                "lastname": lastName,
                "password": password,
                "email": email,
                "dob": DOB,
                "hobbies": Hobbies,
                "gender": Gender
            }

            const register = await axios({
                method: 'post',
                url: "http://localhost:8000/api/user/createUser",
                data: data
            })
            if (register.data.code === 200) {
                alert("Success")
                history.push('/login');
            }
        } catch (e) {
            console.log("Error======", e.response);
            alert(e.response.data.data)
        }
    }

    const classes = useStyles();

    return (
        <>
            {/* <div className="register">
                Firstname: <input type="text" placeholder="Enter Firstname" onChange={(item) => { firstEvent(item, setFirstName) }} value={firstName} />
                <br /> <br />
                Lastname: <input type="text" placeholder="Enter Lastname" onChange={(item) => { firstEvent(item, setLastName) }} />
                <br /><br />
                Password: <input type="password" placeholder="Enter Password" onChange={(item) => { firstEvent(item, setPassword) }} />
                <br /><br />
                Email: <input type="email" placeholder="Enter Email" onChange={(item) => { firstEvent(item, setEmail) }} />
                <br /><br />
                DOB: <input type="date" placeholder="Enter DOB" onSelect={(item) => { firstEvent(item, setDOB) }} />
                <br /><br />
                Hobbies: <input type="checkbox" name="hobbies1" value="cricket" onClick={(item) => { firstEvent(item, setHobbies) }} />Cricket
                <input type="checkbox" name="hobbies2" value="chess" onClick={(item) => { firstEvent(item, setHobbies) }} />Chess
                <br /><br />
                Gender: <input type="radio" name="gender" value="male" onClick={(item) => { firstEvent(item, setGender) }} />Male
                <input type="radio" name="gender" value="female" onClick={(item) => { firstEvent(item, setGender) }} />Female
                <br /><br />
                <button onClick={Register} style={{ "cursor": "pointer" }}>Register</button>
                <br />
                <NavLink exact to="/login" >You have Already Account?</NavLink>
            </div> */}
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign up
                    </Typography>
                    <form className={classes.form} noValidate>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    autoComplete="fname"
                                    name="firstName"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="firstName"
                                    label="First Name"
                                    autoFocus
                                    onChange={(item) => { firstEvent(item, setFirstName) }}
                                    value={firstName}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="lastName"
                                    label="Last Name"
                                    name="lastName"
                                    autoComplete="lname"
                                    onChange={(item) => { firstEvent(item, setLastName) }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                    onChange={(item) => { firstEvent(item, setEmail) }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="current-password"
                                    onChange={(item) => { firstEvent(item, setPassword) }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    id="date"
                                    label="Date Of Birth"
                                    type="date"
                                    required
                                    defaultValue="2017-05-24"
                                    className={classes.textField}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    onSelect={(item) => { firstEvent(item, setDOB) }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <FormControl component="fieldset">
                                    <FormLabel component="legend">Gender</FormLabel>
                                    <RadioGroup aria-label="gender" name="gender1" value={Gender} row onChange={(item) => { firstEvent(item, setGender) }}>
                                        <FormControlLabel value="female" control={<Radio />} label="Female" />
                                        <FormControlLabel value="male" control={<Radio />} label="Male" />
                                        <FormControlLabel value="other" control={<Radio />} label="Other" />
                                    </RadioGroup>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <FormControl component="fieldset">
                                    <FormLabel component="legend">Hobbies</FormLabel>
                                    <FormGroup>
                                        <FormControlLabel
                                            control={<Checkbox onClick={(item) => { firstEvent(item, setHobbies) }} name="cricket" />}
                                            label="Cricket"
                                        />
                                        <FormControlLabel
                                            control={<Checkbox onClick={(item) => { firstEvent(item, setHobbies) }} name="swimming" />}
                                            label="Swimming"
                                        />
                                        <FormControlLabel
                                            control={<Checkbox onClick={(item) => { firstEvent(item, setHobbies) }} name="riding" />}
                                            label="Riding"
                                        />
                                    </FormGroup>
                                </FormControl>
                            </Grid>
                        </Grid>
                        <Button
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            onClick={Register}
                        >
                            Sign Up
                        </Button>
                        <Grid container justify="flex-end">
                            <Grid item>
                                <Link href="/login" variant="body2">
                                    Already have an account? Sign in
                                </Link>
                            </Grid>
                        </Grid>
                    </form>
                </div>
                <Box mt={5}>
                    <Copyright />
                </Box>
            </Container>
        </>
    )
}

export default Register;
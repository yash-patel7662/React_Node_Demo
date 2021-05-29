import React from 'react'
import { NavLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Slider from './Slider'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));


const Home = () => {
    const classes = useStyles();
    return (
        <>
            {/* <div className="menu_style">
                <NavLink exact activeClassName="active_class" to="/login" >Login</NavLink>
            </div >
            <h1>Home alone</h1> */}
            <div className={classes.root}>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton edge="start" className={classes.menuButton} color="inherit" >
                            <ShoppingCartIcon />
                        </IconButton>
                        <Typography variant="h6">
                            ECommerce
                        </Typography>
                        <Button color="inherit" style={{ marginLeft: "80%", backgroundColor: "white" }}><NavLink exact activeClassName="active_class" to="/login" color="inherit">Login</NavLink></Button>
                    </Toolbar>
                </AppBar>
                <br />
                <Slider />
            </div>
        </>
    )
}

export default Home;
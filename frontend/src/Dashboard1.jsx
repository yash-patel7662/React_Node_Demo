import { React, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import PeopleAltRoundedIcon from '@material-ui/icons/PeopleAltRounded';
import CategoryIcon from '@material-ui/icons/Category';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import StarBorder from '@material-ui/icons/StarBorder';
import Collapse from '@material-ui/core/Collapse';
import AddIcon from '@material-ui/icons/Add';
import ListIcon from '@material-ui/icons/List';
import Button from '@material-ui/core/Button';
import { NavLink, useHistory } from 'react-router-dom';
import AddProduct from './AddProduct'

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    drawerContainer: {
        overflow: 'auto',
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
}));



export default function ClippedDrawer() {
    const classes = useStyles();
    const hello = () => {
        alert("Hello")
    }
    const [open, setOpen] = useState(true);
    const [openCat, setOpenCat] = useState(true);
    const [openPro, setOpenPro] = useState(true);

    const handleClick = () => {
        setOpen(!open);
    };

    const handleClickCategory = () => {
        setOpenCat(!openCat);
    };

    const handleClickProduct = () => {
        setOpenPro(!openPro);
    };

    const storageClear = () => {
        window.localStorage.clear();
    }

    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar position="fixed" className={classes.appBar}>
                <Toolbar>
                    <Typography variant="h6" noWrap>
                        ECommerce
                    </Typography>
                    <Button color="inherit" style={{ marginLeft: "80%", backgroundColor: "white" }}><NavLink exact activeClassName="active_class" to="/login" color="inherit" onClick={storageClear}>Logout</NavLink></Button>
                </Toolbar>
            </AppBar>
            <Drawer
                className={classes.drawer}
                variant="permanent"
                classes={{
                    paper: classes.drawerPaper,
                }}
            >
                <Toolbar />
                <div className={classes.drawerContainer}>
                    <List>
                        <ListItem button onClick={hello}>
                            <ListItemIcon >
                                <DashboardIcon />
                            </ListItemIcon>
                            <ListItemText primary="Dashboard" />
                        </ListItem>
                        <ListItem button onClick={handleClick}>
                            <ListItemIcon>
                                <PeopleAltRoundedIcon />
                            </ListItemIcon>
                            <ListItemText primary="Users" />
                            {open ? <ExpandLess /> : <ExpandMore />}
                        </ListItem>
                        {/* Nested list */}
                        <Collapse in={!open} timeout="auto" unmountOnExit>
                            <List component="div" disablePadding>
                                <ListItem button className={classes.nested}>
                                    <ListItemIcon>
                                        <AddIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="Add Users" />
                                </ListItem>
                                <ListItem button className={classes.nested}>
                                    <ListItemIcon>
                                        <ListIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="List Users" />
                                </ListItem>
                            </List>
                        </Collapse>

                        <ListItem button onClick={handleClickCategory}>
                            <ListItemIcon>
                                <CategoryIcon />
                            </ListItemIcon>
                            <ListItemText primary="Category" />
                            {openCat ? <ExpandLess /> : <ExpandMore />}
                        </ListItem>
                        {/* Nested list */}
                        <Collapse in={!openCat} timeout="auto" unmountOnExit>
                            <List component="div" disablePadding>
                                <ListItem button className={classes.nested}>
                                    <ListItemIcon>
                                        <AddIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="Add Category" />
                                </ListItem>
                                <ListItem button className={classes.nested}>
                                    <ListItemIcon>
                                        <ListIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="List Category" />
                                </ListItem>
                            </List>
                        </Collapse>

                        <ListItem button onClick={handleClickProduct}>
                            <ListItemIcon>
                                <ShoppingCartIcon />
                            </ListItemIcon>
                            <ListItemText primary="Products" />
                            {openPro ? <ExpandLess /> : <ExpandMore />}
                        </ListItem>
                        {/* Nested list */}
                        <Collapse in={!openPro} timeout="auto" unmountOnExit>
                            <List component="div" disablePadding>
                                <ListItem button className={classes.nested} onClick={hello}>
                                    <ListItemIcon onClick={<AddProduct />} >
                                        <AddIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="Add Product" />
                                </ListItem>
                                <ListItem button className={classes.nested}>
                                    <ListItemIcon>
                                        <ListIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="List Product" />
                                </ListItem>
                            </List>
                        </Collapse>
                    </List>
                    {/* <Divider />
                    <List>
                        {['All mail', 'Trash', 'Spam'].map((text, index) => (
                            <ListItem button key={text}>
                                <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                                <ListItemText primary={text} />
                            </ListItem>
                        ))}
                    </List> */}
                </div>
            </Drawer>
        </div >
    );
}

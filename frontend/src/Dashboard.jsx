import React, { useState, useEffect } from 'react'
import { NavLink, useHistory } from 'react-router-dom';
import axios from 'axios'
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import EditIcon from '@material-ui/icons/Edit';
import Delete from './Delete'
import Modal from 'react-modal'
import Form from './Model'

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';

import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Typography from '@material-ui/core/Typography';

//sidebar
import clsx from 'clsx';
// import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
// import AppBar from '@material-ui/core/AppBar';
// import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
// import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
// import IconButton from '@material-ui/core/IconButton';
// import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import PeopleAltRoundedIcon from '@material-ui/icons/PeopleAltRounded';
import CategoryIcon from '@material-ui/icons/Category';

//sidebar
const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    appBar: {
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: -drawerWidth,
    },
    contentShift: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    },
    table: {
        minWidth: 650,
    },
}));

const Dashboard = () => {

    //table
    // const useStyles = makeStyles({
    //     table: {
    //         minWidth: 650,
    //     },
    // });
    const classes = useStyles();

    //api
    const [fetchUser, setFetchUser] = useState([]);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [editUser, setEditUser] = useState();

    const history = useHistory();

    const listUser = async () => {
        try {
            const access_token = window.localStorage.getItem('data')
            if (!access_token) {
                history.push('/login')
            }
            let list = await axios({
                method: "get",
                url: "http://localhost:8000/api/user/listAllUsers",
                headers: {
                    'authorization': `Bearer ${access_token}`
                }
            })
            return setFetchUser([...list.data.data])
        } catch (e) {
            console.log("Error", e.response);
            alert(e.response.data.data)
        }
    }

    useEffect(() => {
        listUser()
    }, [fetchUser.length])

    const deleteItem = (_id) => async () => {
        try {
            const access_token = window.localStorage.getItem('data')
            let list = await axios({
                method: "delete",
                url: `http://localhost:8000/api/user/deleteUser/${_id}`,
                headers: {
                    'authorization': `Bearer ${access_token}`
                }
            })
            if (list.data.code === 200) {
                let cloneUserList = fetchUser.filter((i) => i._id !== _id)
                setFetchUser(cloneUserList);
                alert(list.data.data)
            }
        } catch (e) {
            console.log("Error", e.response);
            alert(e.response.data.data)
        }
    }

    //modal
    const setModalIsOpenToTrue = (_id) => {
        let cloneUser = fetchUser.filter((i) => i._id === _id)
        setEditUser(cloneUser);
        setModalIsOpen(true)
    }

    const setModalIsOpenToFalse = () => {
        setModalIsOpen(false)
    }

    const storageClear = () => {
        window.localStorage.clear();
    }

    //sidebar
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    return (
        <>
            {/* <div className="menu_style">
                <NavLink exact activeClassName="active_class" to="/login" onClick={storageClear}>Logout</NavLink>
            </div > */}
            {/* <h1>Dashboard</h1> */}

            <div >
                <AppBar position="static" className={clsx(classes.appBar, {
                    [classes.appBarShift]: open,
                })}>
                    <Toolbar>
                        <IconButton color="inherit"
                            aria-label="open drawer"
                            onClick={handleDrawerOpen}
                            edge="start"
                            className={clsx(classes.menuButton, open && classes.hide)} >
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6">
                            ECommerce
                        </Typography>
                        <Button color="inherit" style={{ marginLeft: "80%", backgroundColor: "white" }}><NavLink exact activeClassName="active_class" to="/login" color="inherit" onClick={storageClear}>Logout</NavLink></Button>
                    </Toolbar>
                </AppBar>
                <Drawer
                    className={classes.drawer}
                    variant="persistent"
                    anchor="left"
                    open={open}
                    classes={{
                        paper: classes.drawerPaper,
                    }}
                >
                    <div className={classes.drawerHeader}>
                        <IconButton onClick={handleDrawerClose}>
                            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                        </IconButton>
                    </div>
                    <Divider />
                    <List>
                        {['Users', 'Categories', 'Products'].map((text, index) => (
                            <ListItem button key={text}>
                                <ListItemIcon>{index % 2 === 0 ? <PeopleAltRoundedIcon /> : <CategoryIcon />}</ListItemIcon>
                                <ListItemText primary={text} />
                            </ListItem>
                        ))}
                    </List>
                    {/* <Divider /> */}
                    {/* <List>
                        {['All mail', 'Trash', 'Spam'].map((text, index) => (
                            <ListItem button key={text}>
                                <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                                <ListItemText primary={text} />
                            </ListItem>
                        ))}
                    </List> */}
                </Drawer>
                <br />
            </div>

            <TableContainer render={Paper}>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell style={{ "font-weight": "bold" }}>Firstname</TableCell>
                            <TableCell align="right" style={{ "font-weight": "bold" }}>Lastname</TableCell>
                            <TableCell align="right" style={{ "font-weight": "bold" }}>Email</TableCell>
                            <TableCell align="right" style={{ "font-weight": "bold" }}>DOB</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {fetchUser.length && fetchUser.map((row) => (
                            <TableRow key={row.firtname}>
                                <TableCell component="th" scope="row">
                                    {row.firstname}
                                </TableCell>
                                <TableCell align="right">{row.lastname}</TableCell>
                                <TableCell align="right">{row.email}</TableCell>
                                <TableCell align="right">{row.dob}</TableCell>
                                <TableCell align="right" onClick={() => setModalIsOpenToTrue(row._id)} style={{ "cursor": "pointer" }}>{<EditIcon />}</TableCell>
                                <TableCell align="right" onClick={deleteItem(row._id)} style={{ "cursor": "pointer" }}>{<Delete />}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Modal isOpen={modalIsOpen}>
                <button onClick={setModalIsOpenToFalse}>x</button>
                <Form data={editUser} />
            </Modal>
        </>
    )
}

export default Dashboard;
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

import DashboardIcon from '@material-ui/icons/Dashboard';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Collapse from '@material-ui/core/Collapse';
import AddIcon from '@material-ui/icons/Add';
import ListIcon from '@material-ui/icons/List';

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

const Dashboard = () => {

    //table
    // const useStyles = makeStyles({
    //     table: {
    //         minWidth: 650,
    //     },
    // });
    const classes = useStyles();

    //api
    const [fetchProduct, setFetchProduct] = useState([]);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [editUser, setEditUser] = useState();

    const history = useHistory();

    const listProduct = async () => {
        try {
            const access_token = window.localStorage.getItem('data')
            if (!access_token) {
                history.push('/login')
            }
            let list = await axios({
                method: "get",
                url: "http://localhost:8000/api/product/listAllProduct",
                headers: {
                    'authorization': `Bearer ${access_token}`
                }
            })
            console.log();
            return setFetchProduct([...list.data.data])
        } catch (e) {
            console.log("Error", e.response);
            alert(e.response.data.data)
        }
    }

    useEffect(() => {
        listProduct()
    }, [fetchProduct.length])

    // const deleteItem = (_id) => async () => {
    //     try {
    //         const access_token = window.localStorage.getItem('data')
    //         let list = await axios({
    //             method: "delete",
    //             url: `http://localhost:8000/api/user/deleteUser/${_id}`,
    //             headers: {
    //                 'authorization': `Bearer ${access_token}`
    //             }
    //         })
    //         if (list.data.code === 200) {
    //             let cloneUserList = fetchUser.filter((i) => i._id !== _id)
    //             setFetchUser(cloneUserList);
    //             alert(list.data.data)
    //         }
    //     } catch (e) {
    //         console.log("Error", e.response);
    //         alert(e.response.data.data)
    //     }
    // }

    //modal
    const setModalIsOpenToTrue = (_id) => {
        // let cloneUser = fetchUser.filter((i) => i._id === _id)
        // cloneUser
        setEditUser();
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

    const handleClick = () => {
        setOpen(!open);
    };

    return (
        <>
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
                            <ListItem button>
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
                            <Collapse in={open} timeout="auto" unmountOnExit>
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
                        </List>
                    </div>
                </Drawer>
            </div >
            <main className={classes.content}>
                <TableContainer render={Paper}>
                    <Table className={classes.table} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell style={{ "font-weight": "bold" }}>Product Name</TableCell>
                                <TableCell align="right" style={{ "font-weight": "bold" }}>Price</TableCell>
                                <TableCell align="right" style={{ "font-weight": "bold" }}>Quantity</TableCell>
                                <TableCell align="right" style={{ "font-weight": "bold" }}>Category</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {fetchProduct.length && fetchProduct.map((row) => (
                                <TableRow key={row.productName}>
                                    <TableCell component="th" scope="row">
                                        {row.productName}
                                    </TableCell>
                                    <TableCell align="right">{row.Price}</TableCell>
                                    <TableCell align="right">{row.Quantity}</TableCell>
                                    <TableCell align="right">{row.Category}</TableCell>
                                    <TableCell align="right" onClick={() => setModalIsOpenToTrue(row._id)} style={{ "cursor": "pointer" }}>{<EditIcon />}</TableCell>
                                    {/* <TableCell align="right" onClick={deleteItem(row._id)} style={{ "cursor": "pointer" }}>{<Delete />}</TableCell> */}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </main>

            {/* <Modal isOpen={modalIsOpen}>
                <button onClick={setModalIsOpenToFalse}>x</button>
                <Form data={editUser} />
            </Modal> */}
        </>
    )
}

export default Dashboard;
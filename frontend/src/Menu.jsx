import React from 'react';
import { NavLink } from 'react-router-dom'

const Menu = () => {
    return (
        <div className="menu_style">
            <NavLink exact activeClassName="active_class" to="/">Login</NavLink>
            <NavLink exact activeClassName="active_class" to="/logout">Logout</NavLink>
        </div >
    )
}

export default Menu;
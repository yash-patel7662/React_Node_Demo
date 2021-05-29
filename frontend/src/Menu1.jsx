import React from 'react';
import { NavLink } from 'react-router-dom';

const Menu1 = () => {

    return (
        <div className="menu_style">
            <NavLink exact activeClassName="active_class" to="/login" >Login</NavLink>
        </div >
    )
}

export default Menu1;
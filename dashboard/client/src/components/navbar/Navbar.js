import React, {useState} from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import {Link, NavLink} from 'react-router-dom';
import {IconContext} from 'react-icons';

import './Navbar.css';
import NavbarData from './NavbarData';
import Profile from './components/Profile';
import SearchItem from './components/Search';

function Navbar() {
    const [sidebar, setSidebar] = useState(false);

    const showSidebar = () => setSidebar(!sidebar);

    return (
        <>
            <IconContext.Provider value={{color: '#fff'}}>
                <div className="navbar">
                    <Link to="#" className="menu-bars">
                        <FaIcons.FaBars onClick={showSidebar} />
                    </Link>
                    <Link to="#" className="brand-name">
                        <h3>Hello Butcher Dashboard</h3>
                    </Link>
                    <Link to="#" className="">
                        <Profile />
                    </Link>
                </div>

                <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
                    <ul className="nav-menu-items" onClick={showSidebar}>
                        <li
                            className="navbar-toggle"
                            style={{marginBottom: 50}}
                        >
                            <Link to="#" className="menu-bars">
                                <AiIcons.AiOutlineClose />
                            </Link>
                        </li>

                        {NavbarData.map((item, index) => {
                            return (
                                <li key={index} className={item.cName}>
                                    <NavLink
                                        to={item.path}
                                        activeClassName="active"
                                    >
                                        {item.icon}
                                        <span>{item.title}</span>
                                    </NavLink>
                                </li>
                            );
                        })}
                    </ul>
                </nav>
            </IconContext.Provider>
        </>
    );
}

export default Navbar;

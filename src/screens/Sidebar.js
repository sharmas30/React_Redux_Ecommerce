import React, { useState } from 'react';
import { NavLink } from 'react-router-dom/cjs/react-router-dom.min';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as MdIcons from 'react-icons/md';
import { SidebarData } from './SideBarData';
import "../css/Navbar.css";
import {IconContext} from 'react-icons'
import { getUserInfo } from '../localStorage';
const { fname, isAdmin } = getUserInfo();

const Sidebar = () => {

  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar)

  return (
    <>
    <IconContext.Provider value={{color:'#fff'}}>
      <div className="navbar">
        <NavLink to="#" className="menu-bars">
          <FaIcons.FaBars onClick={showSidebar} />
        </NavLink>

        <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
          <ul className='nav-menu-items' onClick={showSidebar}>
            <li className="navbar-toggle">
              <NavLink to="#" className="menu-bars">
                <AiIcons.AiOutlineClose />
              </NavLink>
            </li>

            <li>
              {
                fname ? 
                <li className="nav-text sideBarItemsName">
                <NavLink to='/signin' >
                <FaIcons.FaUser />
                  <span>{fname}</span>
                </NavLink>
                </li> 
                : <li className="nav-text sideBarItemsName">
                  <NavLink to='/signin' >
                  <FaIcons.FaUser />
                    <span>Signin</span>
                  </NavLink>
                </li>
              }
            </li>

            {
              SidebarData.map((item, index) => {
                return (
                  <li key={index} className={item.cName}>
                    <NavLink to={item.path} className='sideBarItemsName'>
                      {item.icon}
                      <span>{item.title}</span>
                    </NavLink>
                  </li>
                )
              })
            }
            <li>
              {
                isAdmin ? 
                <li className="nav-text sideBarItemsName">
                <NavLink to='/dashboard' >
                <MdIcons.MdDashboard />
                  <span>Dashboard</span>
                </NavLink>
                </li> : ''
              }
            </li>
          </ul>

        </nav>

      </div>
      </IconContext.Provider>
    </>
  )
}

export default Sidebar

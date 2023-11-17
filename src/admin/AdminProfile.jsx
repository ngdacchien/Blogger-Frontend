import React, { useState, useEffect, useRef } from 'react';
import '../css/Header.css';
import { Link } from 'react-router-dom';
import { IoSettingsOutline } from "react-icons/io5";
import { GrHelp } from "react-icons/gr";
import { BiLogOut } from "react-icons/bi";
import { RiImageAddLine } from "react-icons/ri";
import AdminLayout from "./AdminLayout";

function Admin() {
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };
  return (
    <AdminLayout>
    <div className={`dropdown ${showMenu ? 'showMenu' : ''}`}>
      <button className="dropdown-button" onClick={toggleMenu}>
        <img
          src="https://i.pinimg.com/originals/96/86/12/968612b62715b539c876a2ff719962fe.png"
          alt="Dropdown"
        />
      </button>
      {showMenu && (
        <div className="dropdown-menu">
          <ul>
            <li>
              <Link to="/CreatePost">
                <button className="box">
                  <RiImageAddLine className="icon" />
                  <h4>Create Post</h4>
                </button>
              </Link>
            </li>
            <li>
              <Link to="/Account">
                <button className="box">
                  <IoSettingsOutline className="icon" />
                  <h4>My Account</h4>
                </button>
              </Link>
            </li>
            <li>
              <button className="box">
                <GrHelp className="icon" />
                <h4>Help</h4>
              </button>
            </li>
            <li>
              <button className="box">
                <BiLogOut className="icon" />
                <h4>Log Out</h4>
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
    </AdminLayout>
  );
}
export default Admin;
import React, { useState, useEffect, useRef } from 'react';
import '../css/Header.css';
import { Link } from 'react-router-dom';
import { IoSettingsOutline } from "react-icons/io5";
import { BsBagCheck } from "react-icons/bs";
import { AiOutlineHeart } from "react-icons/ai";
import { GrHelp } from "react-icons/gr";
import { BiLogOut } from "react-icons/bi";
import { RiImageAddLine } from "react-icons/ri";
import { FaSearch } from "react-icons/fa";
import { BiLogIn } from "react-icons/bi";

function Header() {
  const [showMenu, setShowMenu] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const searchRef = useRef(null);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const toggleSearch = () => {
    setShowSearch(!showSearch);
  };

  const handleOutsideClick = (event) => {
    if (searchRef.current && !searchRef.current.contains(event.target)) {
      setShowSearch(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleOutsideClick);
    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, []);

  return (
    <header className={`headerContainer ${showMenu ? 'showMenu' : ''}`}>
      <div className='navbar'>
        <div className='logo'>
          <img
            src='https://scontent.fhan2-4.fna.fbcdn.net/v/t39.30808-6/398569459_861850395672149_8481823273626976181_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=5f2048&_nc_ohc=gtzAN8v-yXIAX89x8J0&_nc_ht=scontent.fhan2-4.fna&oh=00_AfBFTjd32EXAzOE6ab32i0QveB1HRBlDzjSx8o1y_U6ZtQ&oe=655AC30E'
            width={"120px"}
            alt="Logo"
          />
        </div>

        <nav>
          <ul className="nav-links">
            <li className="nav-item">
              <Link to="/" className="nav-link">Home</Link>
            </li>
            <li className="nav-item">
              <Link to="/contact" className="nav-link">Contact</Link>
            </li>
            <li className="nav-item">

            </li>
            <li className="nav-item">
              <div
                ref={searchRef}
                className={`search-icon ${showSearch ? 'showSearch' : ''}`}
              >
                <FaSearch className="search-button" onClick={toggleSearch} />
                {showSearch && (
                  <input type="text" className="search-input" placeholder="Search" />
                )}
              </div>
            </li>
          </ul>
        </nav>
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
                {/* <li>
                  <Link to="/CreatePost">
                    <button className="box">
                      <RiImageAddLine className="icon" />
                      <h4>Create Post</h4>
                    </button>
                  </Link>
                </li> */}
                {/* <li>
                  <Link to="/Account">
                    <button className="box">
                      <IoSettingsOutline className="icon" />
                      <h4>My Account</h4>
                    </button>
                  </Link>
                </li> */}
                <li>
                  <button className="box">
                    <GrHelp className="icon" />
                    <h4>Help</h4>
                  </button>
                </li>
                <li>
                  <Link to="/Login">
                    <button className="box">
                      <BiLogIn className="icon" />
                      <h4>Login / Register</h4>
                    </button>
                  </Link>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
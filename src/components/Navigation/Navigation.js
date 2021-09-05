import React, { Component } from 'react';
import { NavLink as Link } from 'react-router-dom';
import $ from "jquery";
import data from './navigation.json';
import Logo from '../../assets/images/moon_menu.png';

import './Navigation.scss';
class FixedNavigation extends Component {
    constructor(props) {
        super(props);
        
        this.toggleMenu= this.toggleMenu.bind(this);
        this.state = {
            isActive: false
        }
    }

    toggleMenu(){
        $('#navbar').toggleClass('open');
    }    

    render() {
        return (
            <div className="Navigation">
                <div id="navbar">
                    <div id="navigation" onClick={this.toggleMenu}>
                        <i className="fa fa-bars main-menu"></i>
                        <img src={Logo} alt="banner" />
                    </div>
                    <ul className="navbar-nav navbar-items d-none">
                    {data.navigation.map((navitems) => {
                        return (
                            <li key={navitems.title + '_'} className="nav-item">
                                <Link
                                    onClick={this.toggleMenu}
                                    exact={true}
                                    className="nav-link"
                                    to={navitems.src}
                                >
                                    <i className={navitems.icon}></i> {navitems.title}
                                </Link>
                            </li>
                        );
                    })}
                    </ul>
                </div>
            </div>
        );
    }
}

export default FixedNavigation;

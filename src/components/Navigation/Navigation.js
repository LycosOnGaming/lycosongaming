import React, { Component } from 'react';
import { NavLink as Link } from 'react-router-dom';
import data from './navigation.json';
import Logo from '../../assets/images/moon_menu.png';

import './Navigation.scss';
class FixedNavigation extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            isActive: false
        }

        this.handleShowMenu = this.handleShowMenu.bind(this);
    }
    
    handleShowMenu() {
        this.setState({
            isActive: !this.state.isActive,
        })
    }
        
    render() {
        return (
            <div className="Navigation">
                <div id="navbar" className={this.state.isActive ? "open" : ""}>
                    <div id="navigation" onClick={this.handleShowMenu}>
                        <i className="fa fa-bars main-menu"></i>
                        <img src={Logo} alt="banner" />
                    </div>
                    <ul className="navbar-nav navbar-items d-none">
                    {data.navigation.map((navitems) => {
                        return (
                            <li key={navitems.title + '_'} className="nav-item">
                                <Link
                                    onClick={this.handleShowMenu}
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

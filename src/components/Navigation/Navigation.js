import React, { Component } from 'react';
import { NavLink as Link } from 'react-router-dom';
import data from './navigation.json';
import Logo from '../../assets/images/logosmallytbranding.png';

import './Navigation.scss';

class FixedNavigation extends Component {
    constructor(props) {
        super(props);

        this.state = {
            collapsed: true,
        };
        this.toggleNavbar = this.toggleNavbar.bind(this);
    }

    toggleNavbar() {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    }

    render() {
        const collapsed = this.state.collapsed;
        const classOne = collapsed
            ? 'collapse navbar-collapse'
            : 'collapse navbar-collapse show';
        const classTwo = collapsed
            ? 'navbar-toggler navbar-toggler-right'
            : 'navbar-toggler navbar-toggler-right collapsed';

        return (
            <div className="Navigation">
                <nav className="navbar navbar-expand-md navbar-dark bg-dark">
                    <button
                        onClick={this.toggleNavbar}
                        className={`${classTwo}`}
                        type="button"
                        data-toggle="collapse"
                        data-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className={`${classOne}`} id="navbarSupportedContent">
                        <ul className="navbar-nav mr-auto">
                        {data.navigation.map((navitems) => {
                            return (
                                <li key={navitems.title + '_'} className="nav-item">
                                    <Link
                                        onClick={this.toggleNavbar}
                                        exact={true}
                                        className="nav-link"
                                        to={navitems.src}
                                    >
                                        {navitems.title}
                                    </Link>
                                </li>
                            );
                        })}
                        </ul>
                    </div>
                </nav>
                <Link exact={true} to="/">
                    <img src={Logo} alt="banner" />
                </Link>
            </div>
        );
    }
}

export default FixedNavigation;

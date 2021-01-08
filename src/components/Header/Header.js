import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import lycosBanner from '../../assets/images/Untitled 4.jpg';
import './Header.scss';

class Header extends Component {
    render() {
        return (
            <div className="Header">
                <div className="Header-header">
                    <Link to="/">
                        <img
                            src={lycosBanner}
                            className="Header-banner"
                            alt="banner"
                        />
                    </Link>
                </div>
            </div>
        );
    }
}

export default Header;

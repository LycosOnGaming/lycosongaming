import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import lycosBanner from '../../assets/images/Untitled 4.jpg';
import './Header.scss';

class Header extends Component {
    render() {
        return (
            <div className="container-fluid px-0 Header">
                <div className="row">
                    <div className="col-12">
                        <Link to="/">
                            <img
                                src={lycosBanner}
                                alt="banner"
                            />
                        </Link>
                    </div>
                </div>
			</div>
        );
    }
}

export default Header;

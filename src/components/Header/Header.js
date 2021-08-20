import React, { Component } from 'react';
import lycosBanner from '../../assets/images/Untitled 4.jpg';
import './Header.scss';

class Header extends Component {
    render() {
        return (
            <header className="container-fluid px-0 Header">
                <div className="row">
                    <div className="col-12">
                        <img
                            src={lycosBanner}
                            alt="banner"
                        />
                    </div>
                </div>
			</header>
        );
    }
}

export default Header;

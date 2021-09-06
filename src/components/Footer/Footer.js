import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './Footer.scss';

class Footer extends Component {
    render () {
        return (
            <footer className="Footer container-fluid position-absolute mx-auto">
                <div className="container d-flex flex-column justify-content-center h-100">
                    <div className="row text-center">
                        <div className="col-12 col-md-4">
                            <Link to="/datenschutz">Datenschutzerklärung</Link>
                        </div>
                        <div className="col-12 col-md-4">
                            <Link to="/impressum">Impressum</Link>
                        </div>
                        <div className="col-12 col-md-4">
                            <Link to="/disclaimer">Disclaimer</Link>
                        </div>
                    </div>
                </div>
            </footer>
        )
    }
}

export default Footer;
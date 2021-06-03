import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './Footer.scss';

class Footer extends Component {
    render () {
        return (
            <div className="container-fluid Footer position-absolute mx-auto">
                <div className="container">
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
            </div>
        )
    }
}

export default Footer;
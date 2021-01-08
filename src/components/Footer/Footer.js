import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './Footer.scss';

class Footer extends Component {
    render () {
        return (
            <div className="Footer">
                <ul>
                    <li>
                        <Link to="/datenschutz">Datenschutzerklärung</Link>
                    </li>
                    <li>
                        <Link to="/impressum">Impressum</Link>
                    </li>
                    <li>
                        <Link to="/disclaimer">Disclaimer</Link>
                    </li>
                </ul>
            </div>
        )
    }
}

export default Footer;
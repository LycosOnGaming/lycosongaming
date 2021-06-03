import React, { Component } from 'react';
import './Impressum.scss';

class Impressum extends Component {
    render() {
        return (
            <div className="Impressum">
                <div className="row">
                    <div className="col-12">
                        <h1>Impressum</h1>
                        <div>
                            <h5>Angaben gemäß § 5 TMG:</h5>
                            Benjamin Roth
                            <br />
                            Postfach: 11 62
                            <br />
                            65761 Kelkheim
                        </div>
                        <div>
                            <h5>Kontakt:</h5>
                            E-Mail:{' '}
                            <a href="mailto: presse&#64;lycosongaming.de">
                                presse@lycosongaming.de
                            </a>
                        </div>
                        <div>
                            <h5>
                                Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV:
                            </h5>
                            Benjamin Roth
                            <br />
                            Postfach: 11 62
                            <br />
                            65761 Kelkheim
                        </div>
                        <div>
                            Quelle:{' '}
                            <a
                                href="http://www.e-recht24.de"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                http://www.e-recht24.de
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Impressum;

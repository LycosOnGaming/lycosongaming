import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Goody from '../../assets/images/GOODY_BANNER.png';
import DeKay from '../../assets/images/DEKAY_BANNER.png';
import Lautschmer from '../../assets/images/LAUTSCHMER_BANNER.png';
import Cacie from '../../assets/images/CACIE_BANNER.jpg';
import Parttime from '../../assets/images/PARTTIME_BANNER.jpg';
import Rollie from '../../assets/images/ROLLIE_BANNER.jpg';

import './Partner.scss';

class Partner extends Component {
    render() {
        return (
            <div className="Partner">
                <h1>Stream-Partner</h1>
                <div className="col-lg-12">
                    <h4>Der Mentor</h4>
                    <div>
                        <Link
                            to="//www.youtube.com/channel/UCW_6rlcjEoYGpV0nWoiiW8Q"
                            target="_blank"
                        >
                            <img
                                src={Goody}
                                className="Partner-banner"
                                alt="banner"
                            />
                        </Link>
                    </div>
                </div>
                <div className="col-lg-12">
                    <h4>Der Hunter</h4>
                    <div>
                        <Link
                            to="//www.youtube.com/channel/UC1ctyctE3CPa1OL_zJZqVcw"
                            target="_blank"
                        >
                            <img
                                src={DeKay}
                                className="Partner-banner"
                                alt="banner"
                            />
                        </Link>
                    </div>
                </div>
                <div className="col-lg-12">
                    <h4>Lautschi</h4>
                    <div>
                        <Link
                            to="//www.youtube.com/channel/UCVketFPJs4t7LHarxBmLKPg"
                            target="_blank"
                        >
                            <img
                                src={Lautschmer}
                                className="Partner-banner"
                                alt="banner"
                            />
                        </Link>
                    </div>
                </div>
                <div className="col-lg-12">
                    <h4>Cacie 51"</h4>
                    <div>
                        <Link
                            to="//www.youtube.com/channel/UCZOyS6yfOsWfmg7N5lSzYKw"
                            target="_blank"
                        >
                            <img
                                src={Cacie}
                                className="Partner-banner"
                                alt="banner"
                            />
                        </Link>
                    </div>
                </div>
                <div className="col-lg-12">
                    <h4>Gizmo & Mira</h4>
                    <div>
                        <Link
                            to="//www.youtube.com/channel/UCqF7FbCEG-P2wXyLJvky7fA"
                            target="_blank"
                        >
                            <img
                                src={Parttime}
                                className="Partner-banner"
                                alt="banner"
                            />
                        </Link>
                    </div>
                </div>
                <div className="col-lg-12">
                    <h4>Rollie MC Feucht</h4>
                    <div>
                        <Link
                            to="//www.youtube.com/channel/UCYzQtUvOjKcK0h9QrwLAZLQ"
                            target="_blank"
                        >
                            <img
                                src={Rollie}
                                className="Partner-banner"
                                alt="banner"
                            />
                        </Link>
                    </div>
                </div>
            </div>
        );
    }
}

export default Partner;

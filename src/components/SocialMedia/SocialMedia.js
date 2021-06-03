import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Youtube from '../../assets/images/lycosYT.png';
import Twitch from '../../assets/images/lycosTwitch.png';
import Facebook from '../../assets/images/lycosFB.png';
import Twitter from '../../assets/images/lycosTwitter.png';
import Discord from '../../assets/images/lycosDC.png';

import './SocialMedia.scss';

class SocialMedia extends Component {
    render() {
        return (
            <div className="SocialMedia">
                <div className="row">
                    <div className="col-lg-12 text-center">
                        <h1>Social Media</h1>
                    </div>
                    <div className="col-lg-12 text-center mb-5">
                        Für die Community und gerade für die, die es noch werden
                        wollen hier alle nötigen Links um euch das stalken zu
                        erleichtern.
                    </div>
                    <div className="col-lg-6 col-md-12 mb-4 mb-lg-6 float-left text-center">
                        <Link to="//www.youtube.com/lycosongaming" target="_blank">
                            <img src={Youtube} alt="youtube" />
                        </Link>
                    </div>
                    <div className="col-lg-6 col-md-12 mb-4 mb-lg-6 float-right text-center">
                        <Link to="//www.twitch.tv/lycosongaming" target="_blank">
                            <img src={Twitch} alt="twitch" />
                        </Link>
                    </div>
                    <div className="col-lg-6 col-md-12 mb-4 mb-lg-6 float-left text-center">
                        <Link
                            to="//www.facebook.com/LycosOnGaming/"
                            target="_blank"
                        >
                            <img src={Facebook} alt="facebook" />
                        </Link>
                    </div>
                    <div className="col-lg-6 col-md-12 mb-4 mb-lg-6 float-right text-center">
                        <Link to="//www.twitter.com/lycosongaming" target="_blank">
                            <img src={Twitter} alt="twitter" />
                        </Link>
                    </div>
                    <div className="col-lg-12 col-md-12 mb-4 mb-lg-6 text-center">
                        <Link to="//discord.gg/THERwGz" target="_blank">
                            <img src={Discord} alt="discord" />
                        </Link>
                    </div>
                </div>
            </div>
        );
    }
}

export default SocialMedia;

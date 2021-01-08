import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Youtube from '../../assets/images/lycosYT.png';
import Twitch from '../../assets/images/lycosTwitch.png';
import Termine from '../../assets/images/terminePanel.png';
import LycosHead from '../../assets/images/lycosHead.png';

import IFrameComponent from '../IFrameComponent/IFrameComponent';
import './Landingpage.scss';

class Landingpage extends Component {
    render() {
        return (
            <div className="Landingpage">
                <div className="row">
                    <h1>
                        Let's Plays mit Dialekt
                        <img
                            className="lycosHead"
                            src={LycosHead}
                            alt="lycosHead"
                        />
                    </h1>
                    <div>
                        Ich darf euch recht herzlich auf meiner kleinen Seite
                        begrüßen euch erwarten alte und neue Games im Stream
                        oder als Let's Play. Seit April 2016 lasse ich meinem
                        Hobby auf
                    </div>
                    <div className="col-lg-4 col-sm-12 left-side banner">
                        <Link
                            to="//www.youtube.com/lycosongaming"
                            target="_blank"
                        >
                            <img src={Youtube} alt="youtube" />
                        </Link>
                    </div>
                    <div className="col-lg-4 col-sm-12 right-side banner">
                        <Link
                            to="//www.twitch.tv/lycosongaming"
                            target="_blank"
                        >
                            <img src={Twitch} alt="twitch" />
                        </Link>
                    </div>
                    <div className="col-lg-4 col-sm-12 right-side banner">
                        <Link to="/streamingplan" target="_self">
                            <img src={Termine} alt="dates" />
                        </Link>
                    </div>
                    <div>
                        freien lauf, da ich dies aber nur aus Spaß an der Freude
                        betreib habt bitte Verständnis dafür, dass ich nicht
                        jeden Tag irgendwelchen Kram raus hau.
                    </div>
                    <div>
                        Ich zocke auch nur Spiele die mich selbst interessieren.
                        Spielempfehlungen oder Vorführungen folgen ggf. zu einem
                        späteren Zeitpunkt. ;-)
                    </div>
                    <div>
                        Ich bin für jeden Support dankbar. Denn auch ein Daumen
                        hoch, ein Kommentar, ein Teilen, ein Weiterempfehlen ist
                        für mich von riesiger Bedeutung und unterstützt mich
                        auch. Solltet ihr dies allerdings anders zeigen wollen,
                        könnt ihr das auch gerne via{' '}
                        <Link
                            to="//www.paypal.me/lycosongaming"
                            target="_blank"
                        >
                            Paypal
                        </Link>{' '}
                        tun.
                    </div>
                    <div>
                        Danke euer
                        <h1 className="content">Lycos</h1>
                    </div>
                    <div className="col-lg-12 playlists">
                        <div className="col-lg-6 col-sm-12 left-side">
                            <div>Live-Streams</div>
                            <IFrameComponent bannertype="liveStreamWidget" />
                        </div>
                        <div className="col-lg-6 col-sm-12 right-side">
                            <div>Aktuellstes Let's Play</div>
                            <IFrameComponent bannertype="letsPlayWidget" />
                        </div>
                    </div>
                    <div className="col-lg-12 center">
                        <IFrameComponent bannertype="singleBannerWidget" />
                    </div>
                </div>
            </div>
        );
    }
}

export default Landingpage;

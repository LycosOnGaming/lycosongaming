import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Youtube from '../../assets/images/lycosYT.png';
import Twitch from '../../assets/images/lycosTwitch.png';
import LycosHead from '../../assets/images/lycosHead.png';

import IFrameComponent from '../IFrameComponent/IFrameComponent';
import './Landingpage.scss';

class Landingpage extends Component {
    render() {
        return (
            <div className="Landingpage">
                <div className="row">
                    <div className="col-12 mb-3 p-0">
                        <h1 className="text-sm-left text-md-center">
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
                    </div>
                    <div className="col-12 mb-3 p-0">
                        <div className="col-lg-6 col-sm-12 mb-3 mb-lg-0 float-left text-center">
                            <Link
                                to="//www.youtube.com/lycosongaming"
                                target="_blank"
                            >
                                <img src={Youtube} alt="youtube" />
                            </Link>
                        </div>
                        <div className="col-lg-6 col-sm-12 float-right text-center">
                            <Link
                                to="//www.twitch.tv/lycosongaming"
                                target="_blank"
                            >
                                <img src={Twitch} alt="twitch" />
                            </Link>
                        </div>
                    </div>
                    <div className="col-12 mb-3 p-0">
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
                            <h1 className="text-left">Lycos</h1>
                        </div>
                    </div>
                    <div className="col-lg-6 col-sm-12 p-0 pr-lg-2 float-left text-center">
                        <div>Live-Streams</div>
                        <IFrameComponent bannertype="liveStreamWidget" />
                    </div>
                    <div className="col-lg-6 col-sm-12 p-0 pl-lg-2 float-right text-center">
                        <div>Aktuellstes Let's Play</div>
                        <IFrameComponent bannertype="letsPlayWidget" />
                    </div>
                </div>
            </div>
        );
    }
}

export default Landingpage;

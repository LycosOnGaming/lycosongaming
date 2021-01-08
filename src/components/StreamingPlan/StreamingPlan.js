import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import YTLogoGoody from '../../assets/images/YTLogoGoody.png';
import YTLogoDeKay from '../../assets/images/dekaylogo.png';
import YTLogoParttime from '../../assets/images/parttimelogo.png';
import YTLogoLautschmer from '../../assets/images/lautschmerlogo.png';
import YTLogoCacie from '../../assets/images/cacielogo.png';
import YTLogoLycos from '../../assets/images/logosmallytbranding.png';

import './StreamingPlan.scss';

class StreamingPlan extends Component {
    render() {
        return (
            <div className="StreamingPlan">
                <h1>Stream Planung</h1>
                <div className="row">
                    <div className="col-lg-12">
                        <table>
                            <tr>
                                <th>Uhrzeit</th>
                                <th>Montag</th>
                                <th>Dienstag</th>
                                <th>Mittwoch</th>
                                <th>Donnerstag</th>
                                <th>Freitag</th>
                                <th>Samstag</th>
                                <th>Sonntag</th>
                            </tr>
                            <tr>
                                <td>10 Uhr</td>
                                <td>/</td>
                                <td>/</td>
                                <td>/</td>
                                <td>/</td>
                                <td>/</td>
                                <td>/</td>
                                <td>
                                    <Link
                                        to="//www.youtube.com/channel/UCqF7FbCEG-P2wXyLJvky7fA"
                                        target="_blank"
                                    >
                                        <img src={YTLogoParttime} alt="logo" />
                                    </Link>
                                </td>
                            </tr>
                            <tr>
                                <td>16 Uhr</td>
                                <td>/</td>
                                <td>/</td>
                                <td>/</td>
                                <td>/</td>
                                <td>/</td>
                                <td>
                                    <Link
                                        to="//www.youtube.com/lycosongaming"
                                        target="_blank"
                                    >
                                        <img src={YTLogoLycos} alt="logo" />
                                    </Link>
                                </td>
                                <td>
                                    <Link
                                        to="//www.youtube.com/lycosongaming"
                                        target="_blank"
                                    >
                                        * <img src={YTLogoLycos} alt="logo" />
                                    </Link>
                                </td>
                            </tr>
                            <tr>
                                <td>18 Uhr</td>
                                <td>/</td>
                                <td>/</td>
                                <td>
                                    <Link
                                        to="//www.youtube.com/lycosongaming"
                                        target="_blank"
                                    >
                                        <img src={YTLogoLycos} alt="logo" />
                                    </Link>
                                </td>
                                <td>/</td>
                                <td>/</td>
                                <td>/</td>
                                <td>/</td>
                            </tr>
                            <tr>
                                <td>19 Uhr</td>
                                <td>/</td>
                                <td>/</td>
                                <td>/</td>
                                <td>/</td>
                                <td>
                                    <Link
                                        to="//www.youtube.com/channel/UCqF7FbCEG-P2wXyLJvky7fA"
                                        target="_blank"
                                    >
                                        <img src={YTLogoParttime} alt="logo" />
                                    </Link>
                                </td>
                                <td>/</td>
                                <td>/</td>
                            </tr>
                            <tr>
                                <td>19:30 Uhr</td>
                                <td>/</td>
                                <td>
                                    <Link
                                        to="//www.youtube.com/channel/UCZOyS6yfOsWfmg7N5lSzYKw"
                                        target="_blank"
                                    >
                                        <img src={YTLogoCacie} alt="logo" />
                                    </Link>
                                </td>
                                <td>/</td>
                                <td>/</td>
                                <td>/</td>
                                <td>/</td>
                                <td>/</td>
                            </tr>
                            <tr>
                                <td>20 Uhr</td>
                                <td>
                                    <Link
                                        to="//www.youtube.com/channel/UCqF7FbCEG-P2wXyLJvky7fA"
                                        target="_blank"
                                    >
                                        <img src={YTLogoParttime} alt="logo" />
                                    </Link>
                                </td>
                                <td>/</td>
                                <td>
                                    <Link
                                        to="//www.youtube.com/channel/UCVketFPJs4t7LHarxBmLKPg"
                                        target="_blank"
                                    >
                                        <img
                                            src={YTLogoLautschmer}
                                            alt="logo"
                                        />
                                    </Link>
                                </td>
                                <td>
                                    <Link
                                        to="//www.youtube.com/channel/UCVketFPJs4t7LHarxBmLKPg"
                                        target="_blank"
                                    >
                                        <img
                                            src={YTLogoLautschmer}
                                            alt="logo"
                                        />
                                    </Link>
                                </td>
                                <td>/</td>
                                <td>/</td>
                                <td>/</td>
                            </tr>
                            <tr>
                                <td>21 Uhr</td>
                                <td>/</td>
                                <td>
                                    <Link
                                        to="//www.youtube.com/channel/UCW_6rlcjEoYGpV0nWoiiW8Q"
                                        target="_blank"
                                    >
                                        <img src={YTLogoGoody} alt="logo" />
                                    </Link>
                                </td>
                                <td>/</td>
                                <td>/</td>
                                <td>
                                    <Link
                                        to="//www.youtube.com/channel/UCW_6rlcjEoYGpV0nWoiiW8Q"
                                        target="_blank"
                                    >
                                        <img src={YTLogoGoody} alt="logo" />
                                    </Link>
                                </td>
                                <td>/</td>
                                <td>/</td>
                            </tr>
                            <tr>
                                <td>21:30 Uhr</td>
                                <td>/</td>
                                <td>/</td>
                                <td>/</td>
                                <td>/</td>
                                <td>
                                    <Link
                                        to="//www.youtube.com/channel/UCqF7FbCEG-P2wXyLJvky7fA"
                                        target="_blank"
                                    >
                                        <img src={YTLogoParttime} alt="logo" />
                                    </Link>
                                </td>
                                <td>/</td>
                                <td>/</td>
                            </tr>
                            <tr>
                                <td>23 Uhr</td>
                                <td>/</td>
                                <td>/</td>
                                <td>/</td>
                                <td>/</td>
                                <td>/</td>
                                <td>
                                    <Link
                                        to="//www.youtube.com/channel/UC1ctyctE3CPa1OL_zJZqVcw"
                                        target="_blank"
                                    >
                                        <img src={YTLogoDeKay} alt="logo" />
                                    </Link>
                                </td>
                                <td>/</td>
                            </tr>
                        </table>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-12">
                        Je nach Notwendigkeit kann es passieren, dass Streams
                        mal ausfallen oder die starts sich auch mal nach hinten
                        verschieben. Pläne gehen nicht immer auf.
                    </div>
                    <div className="col-lg-12">
                        Die mit einem * versehene Einträge sind optional und
                        können daher auch an einem anderen Tag oder gar nicht
                        statt finden.
                    </div>
                    <div className="col-lg-12">
                        ** Die Einträge vom Rollie kommen noch.
                    </div>
                </div>
            </div>
        );
    }
}

export default StreamingPlan;

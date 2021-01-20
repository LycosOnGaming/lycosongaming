import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import data from './Streamer.json';

import './Streamer.scss';

class Streamer extends Component {
    render() {
        return (
            <div className="Streamer">
                <h1>Streamer</h1>
                <div className="col-lg-12">
                    <div className="Streamer-wrapper">
                        {data.Streamer.map((entrie, index) => {
                            if (entrie.img !== "") {
                                return (
                                    <div className="Streamers">
                                        <div key={entrie.title + "_" + index} className="entrie">
                                            <h4>{entrie.title}</h4>
                                            <div className="dropdown-wrapper">
                                                <Link
                                                    to={entrie.url}
                                                    target="_blank"
                                                    className="dropdown"
                                                >
                                                    <img
                                                        src={entrie.img}
                                                        className="Streamer-banner"
                                                        alt={entrie.streamer}
                                                    />
                                                </Link>
                                            </div>
                                            <div className="dropdown-content">
                                                <div className="desc" dangerouslySetInnerHTML={{__html: entrie.description}} />
                                            </div>
                                        </div>
                                    </div>
                                ); 
                            } else {
                                return null;
                            }
                        })}
                    </div>
                </div>
            </div>
        );
    }
}

export default Streamer;

import React, { Component } from 'react';
import axios from "axios";

import './Streamer.scss';

class Streamer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            streamer: [],
            isHover: false
        };
    }

    componentDidMount() {
        axios
        .get("https://www.lycosongaming.de/api/streamPartner/")
        .then(({ data }) => {
            this.setState({ streamer: data });
        });
    }

    onMouseEnterHandler = selected => {
        this.setState({
            isHover: selected
        });
    }

    onMouseLeaveHandler = selected => {
        this.setState({
            isHover: !selected
        });
    }

    render() {
        return (
            <div className="Streamer">
                <h1>Streamer</h1>
                <div className="col-lg-12">
                    <div className="Streamer-wrapper">
                        {this.state.streamer.map((streamer) => {
                            if (streamer.Img !== "") {
                                return (
                                    <div key={streamer.Gamer}>
                                        <h4>{streamer.Gamer}</h4>
                                        <div className="dropdown">
                                            <img
                                                src={streamer.Img}
                                                onMouseEnter={() => this.onMouseEnterHandler(streamer)}
                                                onMouseLeave={() => this.onMouseLeaveHandler(streamer)}
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    window.open(
                                                        streamer.Url,
                                                        '_blank'
                                                      );
                                                }}
                                                alt="banner"
                                            />
                                            <div className="dropdown-content" style={{display: this.state.isHover.Id === streamer.Id ? 'block': 'none'}}>
                                                <div className="desc" dangerouslySetInnerHTML={{__html: streamer.Description}}/>
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

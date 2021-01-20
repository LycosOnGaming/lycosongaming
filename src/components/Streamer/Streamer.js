import React, { Component } from 'react';
import data from './streamer.json';

import './Streamer.scss';

class Streamer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isToggle: false
        };
        
        this.showDiscription = this.showDiscription.bind(this);
        this.hideDiscription = this.hideDiscription.bind(this);
    }

    showDiscription() {
        this.setState({
            isToggle: !this.state.isToggle
        });
    }

    hideDiscription() {
        this.setState({
            isToggle: !this.state.isToggle
        });
    }

    render() {
        return (
            <div className="Streamer">
                <h1>Streamer</h1>
                <div className="col-lg-12">
                    <div className="Streamer-wrapper">
                        {data.streamer.map((streamer) => {
                            return (
                                <div>
                                    <h4>{streamer.gamer}</h4>
                                    <div className="dropdown">
                                        <img
                                            src={streamer.img}
                                            onMouseEnter={this.showDiscription}
                                            onMouseLeave={this.hideDiscription}
                                            onClick={(e) => {
                                                e.preventDefault();
                                                window.open(
                                                    streamer.url,
                                                    '_blank'
                                                  );
                                            }}
                                            alt="banner"
                                        />
                                    </div>
                                    <div className="dropdown-content" style={{display: this.state.isToggle ? 'block': 'none'}}>
                                        <div className="desc" dangerouslySetInnerHTML={{__html: streamer.description}}/>
                                    </div>
                                </div>  
                            );
                        })}
                    </div>
                </div>
            </div>
        );
    }
}

export default Streamer;

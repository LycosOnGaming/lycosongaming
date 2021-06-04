import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Reviews.scss';

class Reviews extends Component {
    constructor(props) {
        super(props);

        this.state = {
            playedGames: []
        };
    }

    componentDidMount() {
        axios
            .get('https://www.lycosongaming.de/api/gamereviews/')
            .then(({ data }) => {
                this.setState({ playedGames: data });
            });
    }

    render() {
        return (
            <div className="Reviews">
                <div className="row">
                    <div className="col-12 text-center">
                        <h1>Spiele Reviews</h1>
                    </div>
                    {!this.props.history.location.query ? (
                        this.state.playedGames.map(game => {
                            return (
                                <div
                                    key={game.gamereviews_ID}
                                    className="col-lg-6 mb-3 gameReview"
                                >
                                    <Link
                                        to={{
                                            pathname: `/reviews`,
                                            query: {
                                                gamereviews_Playlist: game.gamereviews_Playlist,
                                                gamereviews_Description:
                                                    game.gamereviews_Description,
                                                gamereviews_Partnerlink:
                                                    game.gamereviews_Partnerlink,
                                                gamereviews_Game: game.gamereviews_Game
                                            }
                                        }}
                                    >
                                        <h3>{game.gamereviews_Game}</h3>
                                    </Link>
                                </div>
                            );
                        })
                    ) : (
                        <div className="col-lg-12 gameReview">
                            <div className="row">
                                <div className="col-lg-12">
                                    <Link to="/reviews">ZURÜCK</Link>
                                </div>
                                <div
                                    className="col-lg-12 justify-content-center mb-3 reviews-img"
                                    dangerouslySetInnerHTML={{
                                        __html: this.props.history.location.query
                                            .gamereviews_Playlist
                                    }}
                                />
                                <div
                                    className="col-lg-12"
                                    dangerouslySetInnerHTML={{
                                        __html: this.props.history.location.query
                                            .gamereviews_Description
                                    }}
                                />
                                <div className="col-lg-12">
                                    Kaufen:{' '}
                                    <Link
                                        to={
                                            this.props.history.location.query
                                                .gamereviews_Partnerlink
                                        }
                                        target="_blank"
                                    >
                                        {
                                            this.props.history.location.query
                                                .gamereviews_Game
                                        }
                                    </Link>
                                </div>
                                <div className="col-lg-12 mt-3 mb-3">
                                    <Link to="/reviews">ZURÜCK</Link>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        );
    }
}

export default Reviews;

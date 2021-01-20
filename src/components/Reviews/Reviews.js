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
            .get('https://www.lycosongaming.de/api/gameReviews/')
            .then(({ data }) => {
                this.setState({ playedGames: data });
            });
    }

    render() {
        return (
            <div className="Reviews">
                <h1>Spiele Reviews</h1>
                <div className="row">
                    {!this.props.history.location.query ? (
                        this.state.playedGames.map(game => {
                            return (
                                <div
                                    key={game.Id}
                                    className="col-lg-6 gameReview"
                                >
                                    <Link
                                        to={{
                                            pathname: `/reviews`,
                                            query: {
                                                gameId: game.Id,
                                                gamePlaylist: game.Playlist,
                                                gameBeschreibung:
                                                    game.Beschreibung,
                                                gameStreamerLink:
                                                    game.StreamerLink,
                                                gameSpiel: game.Spiel
                                            }
                                        }}
                                    >
                                        <h3>{game.Spiel}</h3>
                                    </Link>
                                </div>
                            );
                        })
                    ) : (
                        <div className="col-lg-12">
                            <div className="col-lg-12">
                                <Link to="/reviews">ZURÜCK</Link>
                            </div>
                            <div
                                className="col-lg-12 reviews-img"
                                dangerouslySetInnerHTML={{
                                    __html: this.props.history.location.query
                                        .gamePlaylist
                                }}
                            />
                            <div
                                className="col-lg-12"
                                dangerouslySetInnerHTML={{
                                    __html: this.props.history.location.query
                                        .gameBeschreibung
                                }}
                            />
                            <div className="col-lg-12">
                                Kaufen:{' '}
                                <Link
                                    to={
                                        this.props.history.location.query
                                            .gameStreamerLink
                                    }
                                    target="_blank"
                                >
                                    {
                                        this.props.history.location.query
                                            .gameSpiel
                                    }
                                </Link>
                            </div>
                            <div className="col-lg-12">
                                <Link to="/reviews">ZURÜCK</Link>
                            </div>
                            <div className="col-lg-12 gameReview" />
                        </div>
                    )}
                </div>
            </div>
        );
    }
}

export default Reviews;

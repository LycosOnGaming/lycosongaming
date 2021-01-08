import React, { Component } from "react";
import classnames from "classnames";
import axios from "axios";
import "./PlannedGames.scss";

class PlannedGames extends Component {
  state = {
    games: []
  };

  componentDidMount() {
    axios
      .get("https://www.lycosongaming.de/api/plannedGames/")
      .then(({ data }) => {
        this.setState({ games: data });
      });
  }

  render() {
    return (
      <div className="PlannedGames">
        <h1>Geplante Spiele - Let's Plays / Streams</h1>
        {this.state.games.map(game => {
          return (
            <div className="row" key={game.Id}>
              <div
                className={classnames(
                  `col-lg-4`,
                  game.Position === "0" ? null : `position-right`
                )}
                dangerouslySetInnerHTML={{ __html: game.Spiel }}
              />
              <div
                className="col-lg-8"
                dangerouslySetInnerHTML={{ __html: game.Beschreibung }}
              />
            </div>
          );
        })}
      </div>
    );
  }
}

export default PlannedGames;

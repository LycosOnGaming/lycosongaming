import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Shorlock from '../../assets/images/Shorlock-normal.png';
import './Designer.scss';

class Designer extends Component {
	render() {
		return (
			<div className="Designer">
				<div className="row">
					<div className="col-12 text-center">
						<h1>Shorlock</h1>
					</div>
					<div className="col-12 text-center">
						<img
							className="w-50"
							src={Shorlock}
							alt=""
							title={Shorlock}
						/>
					</div>
					<div className="col-12 text-center mt-2">
						Mein Name ist Nils Renschler und ich bin der Inhaber von
						Shorlock Design. Designs und Animationen gehören schon
						länger zu unserem Alltag, wir finden sie beim fernsehen,
						auf Social Medias, in Schaufenstern und und und. Meine
						Aufgabe ist es das perfekte Design oder die Perfekte
						Animation für meine Kunden zu fertigen. Damit stehe ich
						mit meiner 100% Zufriedenheitsgarantie ein. Bezahlung
						verlange ich nur wenn der Kunde auch voll und ganz
						überzeugt ist.
					</div>
				</div>
			</div>
		);
	}
}

export default Designer;

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Shorlock from '../../assets/images/Shorlock-normal.png';
import './Designer.scss';

class Designer extends Component {
	constructor(props) {
		super(props);

		this.state = {
			isHover: false,
		};
	}

	onMouseEnterHandler = () => {
		this.setState({
			isHover: true,
		});
	};

	onMouseLeaveHandler = () => {
		this.setState({
			isHover: false,
		});
	};

	render() {
		return (
			<div className="Designer">
				<div className="row">
					<div className="col-12 text-center">
						<h1>Designer</h1>
					</div>
					<div className="col-12 text-center">
						<img
							className={
								this.state.isHover
									? 'w-25 cartoon-logo'
									: 'w-25 logo'
							}
							src={Shorlock}
							onMouseEnter={() => this.onMouseEnterHandler()}
							onMouseLeave={() => this.onMouseLeaveHandler()}
							onClick={(e) => {
								e.preventDefault();
								window.open(
									'//www.shorlocktv.de/portfolio/',
									'_blank'
								);
							}}
							alt=""
							title=""
						/>
					</div>
					<div className="col-12 text-center mt-2">
						Hier kommt Nils Renschler der Inhaber von Shorlock
						Design. Designs und Animationen gehören schon länger zu
						unserem Alltag, wir finden sie beim fernsehen, auf
						Social Medias, in Schaufenstern und und und. Seine
						Aufgabe ist es das perfekte Design oder die Perfekte
						Animation für seine Kunden zu fertigen.
					</div>
					<div className="col-12 text-center mt-2">
						100% Zufriedenheit wird Garantiert.
					</div>
					<div className="col-12 text-center mt-2">
						Hier geht es zu
						<Link
							target="_blank"
							to="//www.shorlocktv.de/portfolio/"
						>
							{' '}
							Shorlock
						</Link>
					</div>
				</div>
			</div>
		);
	}
}

export default Designer;

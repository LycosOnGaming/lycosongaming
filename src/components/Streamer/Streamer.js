import React, { Component } from 'react';
import axios from 'axios';

import './Streamer.scss';

class Streamer extends Component {
	constructor(props) {
		super(props);

		this.state = {
			streamer: [],
			isHover: false,
		};
	}

	componentDidMount() {
		axios
			.get('https://www.lycosongaming.de/api/streampartner/')
			.then(({ data }) => {
				this.setState({ streamer: data });
			});
	}

	onMouseEnterHandler = (selected) => {
		this.setState({
			isHover: selected,
		});
	};

	onMouseLeaveHandler = (selected) => {
		this.setState({
			isHover: !selected,
		});
	};

	render() {
		return (
			<div className="Streamer">
				<div className="row">
					<div className="col-12 text-center">
						<h1>Streamer</h1>
					</div>
					<div className="col-12">
						<div className="Streamer-wrapper">
							{this.state.streamer.map((streamer) => {
								if (streamer.streampartner_Img !== '') {
									return (
										<div
											key={streamer.streampartner_Gamer}
											className="mb-3"
										>
											<h4>
												{streamer.streampartner_Gamer}
											</h4>
											<div className="dropdown">
												<img
													src={
														streamer.streampartner_Img
													}
													onMouseEnter={() =>
														this.onMouseEnterHandler(
															streamer
														)
													}
													onMouseLeave={() =>
														this.onMouseLeaveHandler(
															streamer
														)
													}
													onClick={(e) => {
														e.preventDefault();
														window.open(
															streamer.streampartner_Url,
															'_blank'
														);
													}}
													alt=""
													title={
														streamer.streampartner_AltText
													}
												/>
												<div
													className="dropdown-content"
													style={{
														display:
															this.state.isHover
																.streampartner_ID ===
															streamer.streampartner_ID
																? 'block'
																: 'none',
													}}
												>
													<div
														className="desc"
														dangerouslySetInnerHTML={{
															__html: streamer.streampartner_Description,
														}}
													/>
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
			</div>
		);
	}
}

export default Streamer;

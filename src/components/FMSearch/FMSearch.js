import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import './FMSearch.scss';

const API_Key = '729410b2c958c9834b769ff3f6c1d045';

class FMSearch extends Component {
	constructor(props) {
		super(props);

		this.state = {
			artist: [],
			allArtist: [],
			searchArtists: [],
			search: '',
		};
	}

	/*
	Gehört eigentlich in eine Config

	API Key: 729410b2c958c9834b769ff3f6c1d045
	Shared Secret: 34c3c2f17a50d3d3783afef09869cf6d
	*/

	handleChange = (event) => {
		const initialLoad = document.getElementById('initialLoad');
		const searchResult = document.getElementById('searchResult');
		let searchTarget = event.target.value;
		this.setState({ search: searchTarget });

		if (searchTarget !== '') {
			axios
				.get(
					'http://ws.audioscrobbler.com/2.0/?method=artist.search&artist=' +
						this.state.search +
						'&api_key=' +
						API_Key +
						'&format=json'
				)
				.then(({ data }) => {
					initialLoad.className = 'd-none';
					searchResult.className = 'row';
					const results = data.results.artistmatches.artist;
					this.setState({
						searchArtists: results,
					});
				})
				.catch((err) => {
					console.log('Artist Search error: ', err);
				});
		} else {
			initialLoad.className = 'row';
			searchResult.className = 'd-none';
		}
	};

	componentDidMount() {
		// const myArtists = [];
		const initialLoad = document.getElementById('initialLoad');
		initialLoad.className = 'row';
		axios
			.get(
				'http://ws.audioscrobbler.com/2.0/?method=chart.gettopartists&api_key=' +
					API_Key +
					'&limit=10&format=json'
			)
			.then(({ data }) => {
				const results = data.artists.artist;
				this.setState({
					artist: results,
				});
				results.forEach((element) => {
					axios
						.get(
							'http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=' +
								element.name +
								'&api_key=' +
								API_Key +
								'&lang=de&format=json'
						)
						.then((result) => {
							this.setState({
								allArtist: result.data.artist,
							});
							// myArtists.push();
						})
						.catch((err) => {
							console.log('Artist Info error: ', err);
						});
				});
			})
			.catch((err) => {
				console.log('Top Artist error: ', err);
			});
	}

	render() {
		return (
			<div className="FMSearch row">
				<div className="col-lg-12">
					<form>
						<input
							name="search"
							value={this.state.search}
							type="text"
							onBlur={this.handleChange}
							onChange={this.handleChange}
						/>
					</form>
				</div>

				<div id="searchResult" className="row">
					{this.state.searchArtists.map((myArtist) => {
						return (
							<div
								key={myArtist.name}
								className="border col-12 col-md-5 m-3 rounded"
							>
								<div className="row p-4">
									<div className="mb-3 col-12">
										<Link
											to={{
												pathname: `/FMSearchArtist?artist=${myArtist.name}`,
											}}
											onClick={() => {
												window.location.href =
													'/FMSearchArtist?artist=' +
													myArtist.name +
													'';
											}}
										>
											{myArtist.image.map(
												(myImage, count) => {
													if (
														myImage['size'] ===
														'large'
													) {
														return (
															<div key={count}>
																<img
																	className="w-50"
																	src={
																		myImage[
																			'#text'
																		]
																	}
																	alt={
																		myImage[
																			'#text'
																		]
																	}
																/>
															</div>
														);
													} else {
														return '';
													}
												}
											)}
										</Link>
									</div>
									<div
										key={myArtist.playcount}
										className="mb-3 col-12"
									>
										<Link
											to={{
												pathname: `/FMSearchArtist?artist=${myArtist.name}`,
											}}
											onClick={() => {
												window.location.href =
													'/FMSearchArtist?artist=' +
													myArtist.name +
													'';
											}}
										>
											<p>{myArtist.name}</p>
										</Link>
										Wurde <i>{myArtist.playcount}</i> mal
										abgespielt
									</div>
								</div>
							</div>
						);
					})}
				</div>

				<div id="initialLoad">
					{this.state.artist.map((myArtist) => {
						return (
							<div
								key={myArtist.name}
								className="border col-12 col-md-5 m-3 rounded"
							>
								<div className="row p-4">
									<div className="mb-3 col-12">
										<Link
											to={{
												pathname: `/FMSearchArtist?artist=${myArtist.name}`,
											}}
											onClick={() => {
												window.location.href =
													'/FMSearchArtist?artist=' +
													myArtist.name +
													'';
											}}
										>
											{myArtist.image.map(
												(myImage, count) => {
													if (
														myImage['size'] ===
														'large'
													) {
														return (
															<div key={count}>
																<img
																	className="w-50"
																	src={
																		myImage[
																			'#text'
																		]
																	}
																	alt={
																		myImage[
																			'#text'
																		]
																	}
																/>
															</div>
														);
													} else {
														return '';
													}
												}
											)}
										</Link>
									</div>
									<div
										key={myArtist.playcount}
										className="mb-3 col-12"
									>
										<Link
											to={{
												pathname: `/FMSearchArtist?artist=${myArtist.name}`,
											}}
											onClick={() => {
												window.location.href =
													'/FMSearchArtist?artist=' +
													myArtist.name +
													'';
											}}
										>
											<p>{myArtist.name}</p>
										</Link>
										Wurde <i>{myArtist.playcount}</i> mal
										abgespielt
									</div>
								</div>
							</div>
						);
					})}
				</div>
			</div>
		);
	}
}

export default FMSearch;

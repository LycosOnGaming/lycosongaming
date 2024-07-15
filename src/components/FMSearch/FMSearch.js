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
			search: '',
		};
	}

	/*
	Gehört eigentlich in eine Config

	API Key: 729410b2c958c9834b769ff3f6c1d045
	Shared Secret: 34c3c2f17a50d3d3783afef09869cf6d

	Kein Länder-Dropwown zur Auswahl, da ich diesen Hinweis nicht in der API finden konnte :-(
	*/

	handleChange = (event) => {
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
					const results = data.results.artistmatches.artist;

					this.setState({
						artist: results,
					});
				})
				.catch((err) => {
					console.log('Artist Search error: ', err);
				});
		}
	};

	componentDidMount() {
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
					// Ein Versuch um die Platzhalterbilder mit dem ersten Album Logo
					// zu ersetzen und mehr informationen in der Kachel auszugeben.
					// Leider nicht hinbekommen bitte Feedback wie man das machen könnte.
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

	FMGetArtist(myArtist, index) {
		return (
			<div key={myArtist.name} className="col-12 col-md-6">
				<Link
					to={{
						pathname: `/FMShowArtist?artist=${myArtist.name}`,
					}}
					onClick={() => {
						window.location.href =
							'/FMShowArtist?artist=' + myArtist.name + '';
					}}
				>
					<div className="row border rounded my-3 mx-1 py-4">
						<div className="col-12 col-lg-6">
							{myArtist.image.map((myImage, count) => {
								if (myImage['size'] === 'large') {
									return (
										<div
											key={count}
											className="text-center"
										>
											<img
												className="border rounded-circle w-50 image"
												src={myImage['#text']}
												alt={myImage['#text']}
											/>
										</div>
									);
								} else {
									return '';
								}
							})}
						</div>
						<div key={index} className="col-12 col-lg-6">
							<p>{myArtist.name}</p>
							{/* Wird bei der Suche nicht geliefert */}
							{myArtist.playcount > 0 ? (
								<p className="text-white mb-0">
									Wurde <i>{myArtist.playcount}</i> mal
									abgespielt
								</p>
							) : (
								''
							)}
						</div>
					</div>
				</Link>
			</div>
		);
	}

	render() {
		return (
			<div className="FMSearch row">
				<div className="col-12 text-center">
					<h1>FM API Suche</h1>
				</div>
				<div className="col-12 col-lg-6">
					<label>
						Künstler Suche: (
						<i>Den Künstler einfach ins Suchfeld eingeben</i>)
					</label>
					<input
						name="search"
						className="w-100"
						value={this.state.search}
						type="text"
						placeholder="Künstler Suche"
						onBlur={this.handleChange}
						onChange={this.handleChange}
					/>
				</div>
				<div className="col-12 col-lg-6 text-center my-auto">
					<Link
						to={{
							pathname: `/FMCompareArtist`,
						}}
					>
						Künstler vergleichen
					</Link>
				</div>
				<div className="col-lg-12">
					<div className="row">
						{this.state.artist.map((myArtist, index) => {
							{
								return this.FMGetArtist(myArtist, index);
							}
						})}
					</div>
				</div>
			</div>
		);
	}
}

export default FMSearch;

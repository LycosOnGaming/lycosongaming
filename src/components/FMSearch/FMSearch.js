import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import config from './config.json';

import './FMSearch.scss';

const API_Key = config.API_Key;

class FMSearch extends Component {
	constructor(props) {
		super(props);

		this.state = {
			artist: [],
			search: '',
		};
	}

	/*
	Sorry für Deutsch

	Kein Länder-Dropwown zur Auswahl, da ich diesen Hinweis nicht in der API finden konnte :-(
	*/

	handleChange = (event) => {
		let searchTarget = event.target.value;
		this.setState({ search: searchTarget });

		// handle the search, with and without (get initial state) result
		if (searchTarget !== '') {
			this.loadData('artist.search', '', this.state.search);
		} else {
			this.loadData('chart.gettopartists', 10);
		}
	};

	componentDidMount() {
		// handle initial state
		this.loadData('chart.gettopartists', 10);
	}

	FMGetArtist(myArtist, index) {
		// function to show the artists
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
					<div className="row myCard border rounded my-3 mx-1 py-4">
						<div className="col-12 col-lg-6">
							{/* get the large image  */}
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
							{/* Not delivered from the API in the search so to show it only if we have a playcount*/}
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

	loadData(pMethod, pLimit = '', pSearch = '') {
		let results = '';
		let myLimit = '';
		let mySearch = '';

		if (pLimit !== '') {
			myLimit = '&limit=' + pLimit;
		}

		if (pSearch !== '') {
			mySearch = '&artist=' + pSearch;
		}

		// build the search URL

		let myUrl =
			'http://ws.audioscrobbler.com/2.0/?method=' +
			pMethod +
			mySearch +
			'&api_key=' +
			API_Key +
			myLimit +
			'&format=json';

		// fetch Data from API
		axios
			.get(myUrl)
			.then(({ data }) => {
				//switch between search & initial data
				if (pSearch !== '') {
					results = data.results.artistmatches.artist;
				} else {
					results = data.artists.artist;
				}

				this.setState({
					artist: results,
				});
				// results.forEach((element) => {
				//  // Für für Deutsch
				// 	// Ein Versuch um die Platzhalterbilder mit dem ersten Album Logo
				// 	// zu ersetzen und mehr informationen in der Kachel auszugeben.
				// 	// Leider nicht hinbekommen bitte Feedback wie man das machen könnte.

				// 	this.loadData('artist.getinfo', '', element.name, true); // ToDo in progress
				// });
			})
			.catch((err) => {
				console.log('Load Artist error: ', err);
			});
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
						{/* Show results for search or initial state */}
						{this.state.artist.map((myArtist, index) => {
							return this.FMGetArtist(myArtist, index);
						})}
					</div>
				</div>
			</div>
		);
	}
}

export default FMSearch;

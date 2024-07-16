import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import { error } from 'jquery';

const API_Key = '729410b2c958c9834b769ff3f6c1d045';

class FMCompareArtist extends Component {
	constructor(props) {
		super(props);

		this.state = {
			searchArtistsLeft: [],
			searchArtistsRight: [],
			searchLeft: '',
			searchRight: '',
		};
	}

	/*
	Sorry für Deutsch
	Gehört eigentlich in eine Config

	API Key: 729410b2c958c9834b769ff3f6c1d045
	Shared Secret: 34c3c2f17a50d3d3783afef09869cf6d
	*/

	handleChange = (event) => {
		let mySearch = '';
		let searchTarget = event.target.value;
		let searchTargetName = event.target.name;

		// handle the search for the left & right side
		if (searchTargetName === 'searchLeft') {
			this.setState({ searchLeft: searchTarget });
			mySearch = this.state.searchLeft;
		} else if (searchTargetName === 'searchRight') {
			this.setState({ searchRight: searchTarget });
			mySearch = this.state.searchRight;
		} else {
			throw new error('Not Supported');
		}

		if (searchTarget !== '') {
			// Fetch Data from API
			axios
				.get(
					'http://ws.audioscrobbler.com/2.0/?method=artist.search&artist=' +
						mySearch +
						'&api_key=' +
						API_Key +
						'&format=json'
				)
				.then(({ data }) => {
					const results = data.results.artistmatches.artist;
					// handle the result for the left & right side
					if (searchTargetName === 'searchLeft') {
						this.setState({
							searchArtistsLeft: results,
						});
					} else if (searchTargetName === 'searchRight') {
						this.setState({
							searchArtistsRight: results,
						});
					} else {
						throw new error('Not Supported');
					}
				})
				.catch((err) => {
					console.log('Artist Search error: ', err);
				});
		}
	};

	FMGetArtist(myArtist, index) {
		// function to show the artists
		return (
			<div key={myArtist.name} className="col-12">
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

	render() {
		return (
			<div className="FMSearch row">
				<div className="col-12 text-center">
					<h1>FM API Suche zum Vergleichen</h1>
				</div>
				<div className="col-12 mb-3">
					<Link
						to={{
							pathname: `/FMSearch`,
						}}
					>
						Zurück
					</Link>
				</div>
				<div className="col-12 col-lg-6">
					<label>
						Künstler Suche: (
						<i>Ersten Künstler einfach ins Suchfeld eingeben</i>)
					</label>
					<input
						name="searchLeft"
						className="w-100"
						value={this.state.searchLeft}
						type="text"
						placeholder="Künstler Suche"
						onBlur={this.handleChange}
						onChange={this.handleChange}
					/>
				</div>
				<div className="col-12 col-lg-6">
					<label>
						Künstler Suche: (
						<i>Zweiten Künstler einfach ins Suchfeld eingeben</i>)
					</label>
					<input
						name="searchRight"
						className="w-100"
						value={this.state.searchRight}
						type="text"
						placeholder="Künstler Suche"
						onBlur={this.handleChange}
						onChange={this.handleChange}
					/>
				</div>
				{/*Sorry für Deutsch. Wie kann ich hier die Redundanz umgehen. Bitte um Feedback. */}
				<div className="col-12 col-lg-6">
					<div className="row">
						{this.state.searchArtistsLeft.map((myArtist, index) => {
							return this.FMGetArtist(myArtist, index);
						})}
					</div>
				</div>
				<div className="col-12 col-lg-6">
					<div className="row">
						{this.state.searchArtistsRight.map(
							(myArtist, index) => {
								return this.FMGetArtist(myArtist, index);
							}
						)}
					</div>
				</div>
			</div>
		);
	}
}

export default FMCompareArtist;

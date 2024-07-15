import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import './FMCompareArtist.scss';
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
	Gehört eigentlich in eine Config

	API Key: 729410b2c958c9834b769ff3f6c1d045
	Shared Secret: 34c3c2f17a50d3d3783afef09869cf6d
	*/

	handleChange = (event) => {
		const searchResultLeft = document.getElementById('searchResultLeft');
		const searchResultRight = document.getElementById('searchResultRight');
		let mySearch = '';
		let searchTarget = event.target.value;
		let searchTargetName = event.target.name;

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
					if (searchTargetName === 'searchLeft') {
						this.setState({
							searchArtistsLeft: results,
						});
						searchResultLeft.className = 'row';
					} else if (searchTargetName === 'searchRight') {
						this.setState({
							searchArtistsRight: results,
						});
						searchResultRight.className = 'row';
					} else {
						throw new error('Not Supported');
					}
				})
				.catch((err) => {
					console.log('Artist Search error: ', err);
				});
		} else {
			searchResultLeft.className = '';
			searchResultRight.className = '';
		}
	};

	FMGetArtist(myArtist, index) {
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
						<i>Den Künstler einfach ins Suchfeld eingeben</i>)
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
						<i>Den Künstler einfach ins Suchfeld eingeben</i>)
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
				{/* Wie kann ich hier die Redundanz umgehen. Bitte um Feedback. */}
				<div className="col-12 text-center">
					<div className="row">
						<div className="col-12 col-lg-6">
							<div className="row">
								<div id="searchResultLeft" className="row">
									{this.state.searchArtistsLeft.map(
										(myArtist, index) => {
											{
												return this.FMGetArtist(
													myArtist,
													index
												);
											}
										}
									)}
								</div>
							</div>
						</div>
						<div className="col-12 col-lg-6">
							<div className="row">
								<div id="searchResultRight" className="row">
									{this.state.searchArtistsRight.map(
										(myArtist, index) => {
											{
												return this.FMGetArtist(
													myArtist,
													index
												);
											}
										}
									)}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default FMCompareArtist;

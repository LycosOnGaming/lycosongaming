import React, { Component } from 'react';
import DOMPurify from 'dompurify';
import { Link } from 'react-router-dom';
import axios from 'axios';

const API_Key = '729410b2c958c9834b769ff3f6c1d045';

/*
Sorry für Deutsch
Gehört eigentlich in eine Config

API Key: 729410b2c958c9834b769ff3f6c1d045
Shared Secret: 34c3c2f17a50d3d3783afef09869cf6d
*/

class FMShowArtist extends Component {
	constructor(props) {
		super(props);

		const queryParameters = new URLSearchParams(window.location.search);

		this.state = {
			artist: queryParameters.get('artist'),
			imageSrc: '',
			summary: '',
			listeners: '',
			playcount: '',
			album: [],
			tracks: [],
		};
	}

	componentDidMount() {
		const result = document.getElementById('result');
		const noResult = document.getElementById('noResult');

		// load data if artist is given
		if (this.state.artist !== null) {
			this.loadData(
				'artist.getinfo',
				'artist',
				this.state.artist,
				'',
				'de'
			);
			this.loadData('artist.gettopalbums', 'album', this.state.artist, 5);
			this.loadData('artist.gettoptracks', 'track', this.state.artist, 5);
		} else {
			// show error page
			result.className = 'd-none';
			noResult.className = '';
		}
	}

	loadData(pMethod, pType, pSearch, pLimit = '', pLang = '') {
		let mySearch = '&artist=' + pSearch;
		let myLimit = '';
		let myLang = '';

		if (pLimit !== '') {
			myLimit = '&limit=' + pLimit;
		}

		if (pLang !== '') {
			myLang = '&lang=' + pLang;
		}

		// build search url
		let myUrl =
			'http://ws.audioscrobbler.com/2.0/?method=' +
			pMethod +
			mySearch +
			'&api_key=' +
			API_Key +
			myLimit +
			myLang +
			'&format=json';

		// fetch data from API
		axios
			.get(myUrl)
			.then(({ data }) => {
				// switch between artist, album & track data
				if (pType === 'artist') {
					this.setState({
						artist: data.artist.name,
						summary: data.artist.bio.summary,
						listeners: data.artist.stats.listeners,
						playcount: data.artist.stats.playcount,
					});
				} else if (pType === 'album') {
					this.setState({
						album: data.topalbums.album,
					});
				} else if (pType === 'track') {
					this.setState({
						tracks: data.toptracks.track,
					});
				}
			})
			.catch((err) => {
				console.log('Load ' + pType + ' error: ', err);
			});
	}

	render() {
		return (
			<>
				<div id="result" key={this.state.artist}>
					<div className="row justify-content-center">
						<div className="col-12 mb-3">
							<Link
								to={{
									pathname: `/FMSearch`,
								}}
							>
								Zurück
							</Link>
						</div>
						<div className="col-12 text-center">
							<h1>{this.state.artist}</h1>
						</div>
						<div className="col-12 text-center">
							<h3>Die Top 5 Alben</h3>
						</div>
						{this.state.album.map((myAlbum) => {
							return (
								<div
									key={myAlbum.name}
									className="mb-3 col-12 col-md-6 text-center"
								>
									<Link
										to={{
											pathname: myAlbum.url,
										}}
										target="_blank"
									>
										<p className="mb-4">{myAlbum.name}</p>
									</Link>
									{myAlbum.image.map((myImage) => {
										if (myImage['size'] === 'large') {
											return (
												<div key={myAlbum.name}>
													<Link
														to={{
															pathname:
																myAlbum.url,
														}}
														target="_blank"
													>
														<img
															className="border rounded-circle w-25"
															src={
																myImage['#text']
															}
															alt={myAlbum.name}
														/>
													</Link>
												</div>
											);
										} else {
											return '';
										}
									})}
									<p className="mt-4">
										Das Album wurde{' '}
										<strong>{myAlbum.playcount}</strong> mal
										gehört.
									</p>
								</div>
							);
						})}
					</div>
					<div className="row">
						<div className="col-12 text-center mb-3">
							<h3>Die Top 5 Tracks</h3>
						</div>
						{this.state.tracks.map((myTrack) => {
							return (
								<div
									key={myTrack.name}
									className="mb-3 col-12 col-md-6 text-left"
								>
									<p>
										Der Song{' '}
										<i>
											<strong>{myTrack.name}</strong>
										</i>{' '}
										wurde von{' '}
										<strong>{myTrack.listeners}</strong>{' '}
										Zuhörern{' '}
										<strong>{myTrack.playcount}</strong> mal
										gehört.
									</p>
									{myTrack.streamable ? (
										<p>
											und kann{' '}
											<Link
												to={{
													pathname: myTrack.url,
												}}
												target="_blank"
											>
												hier
											</Link>{' '}
											angehört werden.
										</p>
									) : (
										''
									)}
								</div>
							);
						})}
						<div className="col-12">
							<h4>
								Insgesamt hat der Artist {this.state.listeners}{' '}
								Zuhörer.
							</h4>
						</div>
						<div className="col-12">
							<h4>
								Insgesamt wurden die Alben{' '}
								{this.state.playcount} mal abgespielt
							</h4>
						</div>
						{this.state.content !== '' ? (
							<div
								className="col-12 my-4"
								dangerouslySetInnerHTML={{
									__html: DOMPurify.sanitize(
										this.state.summary
									),
								}}
							></div>
						) : (
							<div className="col-12 my-4">
								Hier wurden bis jetzt keine Informationen
								hinterlegt
							</div>
						)}

						<div className="col-12 mt-3">
							<Link
								to={{
									pathname: `/FMSearch`,
								}}
							>
								Zurück
							</Link>
						</div>
					</div>
				</div>
				<div id="noResult" className="d-none">
					<div className="row">
						<div className="col-12 mb-3 text-center">
							<h3>Keinen Künstler ausgewählt</h3>
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
					</div>
				</div>
			</>
		);
	}
}

export default FMShowArtist;

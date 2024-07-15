import React, { Component } from 'react';
import DOMPurify from 'dompurify';
import { Link } from 'react-router-dom';
import axios from 'axios';

import './FMSearchArtist.scss';

const API_Key = '729410b2c958c9834b769ff3f6c1d045';

/*
Gehört eigentlich in eine Config

API Key: 729410b2c958c9834b769ff3f6c1d045
Shared Secret: 34c3c2f17a50d3d3783afef09869cf6d
*/

class FMSearchArtist extends Component {
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
		if (this.state.artist !== null) {
			axios
				.get(
					'http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=' +
						this.state.artist +
						'&api_key=' +
						API_Key +
						'&lang=de&format=json'
				)
				.then(({ data }) => {
					this.setState({
						artist: data.artist.name,
						summary: data.artist.bio.summary,
						listeners: data.artist.stats.listeners,
						playcount: data.artist.stats.playcount,
					});
				})
				.catch((err) => {
					console.log('Artist error: ', err);
				});
			axios
				.get(
					'http://ws.audioscrobbler.com/2.0/?method=artist.gettopalbums&artist=' +
						this.state.artist +
						'&api_key=' +
						API_Key +
						'&limit=5&format=json'
				)
				.then(({ data }) => {
					this.setState({
						album: data.topalbums.album,
					});
				})
				.catch((err) => {
					console.log('Album error: ', err);
				});
			axios
				.get(
					'http://ws.audioscrobbler.com/2.0/?method=artist.gettoptracks&artist=' +
						this.state.artist +
						'&api_key=' +
						API_Key +
						'&limit=5&format=json'
				)
				.then(({ data }) => {
					this.setState({
						tracks: data.toptracks.track,
					});
				})
				.catch((err) => {
					console.log('Track error: ', err);
				});
		}
	}

	render() {
		return (
			<div key={this.state.artist} className="FMSearchArtist">
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
														pathname: myAlbum.url,
													}}
													target="_blank"
												>
													<img
														className="border rounded-circle w-25"
														src={myImage['#text']}
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
										und kann hier:{' '}
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
							Insgesamt wurden die Alben {this.state.playcount}{' '}
							mal abgespielt
						</h4>
					</div>
					{this.state.content !== '' ? (
						<div
							className="col-12 my-4"
							dangerouslySetInnerHTML={{
								__html: DOMPurify.sanitize(this.state.summary),
							}}
						></div>
					) : (
						<div className="col-12 my-4">
							Hier wurden bis jetzt keine Informationen hinterlegt
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
		);
	}
}

export default FMSearchArtist;

import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import './Tool.scss';

/*
function loadEnvironment($pIsInClasses = false) {
	if ($pIsInClasses) {
		require_once("crypto.php");
	} else {
		require_once("classes/crypto.php");
	}
	$myFile = sysEnvironment;

	if (strpos($_SERVER['SERVER_NAME'], 'dev.') !== false) {
		$myFile = "stage.".$myFile;
	} else if (strpos($_SERVER['SERVER_NAME'], 'live.') !== false) {
		$myFile = "live.".$myFile;
	}

	$myCryptoSignature = "=*=ENCRYPTEDENVFILE=*=";

	for ($i = 0; $i < 3; $i++) {
		$myFile = "../".$myFile;
		if (is_readable($myFile)) {
			break;
		} else if($i == 2) {
			throw new RuntimeException(sprintf('%s file is not readable', $myFile));
		}
	}

	$myInput = file_get_contents($myFile);
	$myCryptoSignatureLength = strlen($myCryptoSignature);
	$isEncrypted = substr($myInput, 0, $myCryptoSignatureLength) === $myCryptoSignature;
	if ($isEncrypted) {
		$myInput = substr($myInput, $myCryptoSignatureLength);
		$myInput = Crypto::decrypt($myInput, ENV_ENCRYPTION_KEY, ENV_ENCRYPTION_HASH_KEY);
	}

	foreach (preg_split("/((\r?\n)|(\r\n?))/", $myInput) as $line) {
		$line = trim($line);

		if (strlen($line) === 0 || strpos($line, '#') === 0) {
			continue;
		}
		
		list($name, $value) = explode('=', $line, 2);
		$name = trim($name);
		$value = trim($value);
		$_ENV[$name] = $value;
	}

	if (!$isEncrypted && $_ENV['DB_ENVIRONMENT'] != 'dev') {
		$myEncryptedEnv = $myCryptoSignature.Crypto::encrypt($myInput, ENV_ENCRYPTION_KEY, ENV_ENCRYPTION_HASH_KEY);
		file_put_contents($myFile, $myEncryptedEnv);
	}
}

RewriteEngine On
RewriteCond %{HTTP:X-Forwarded-Proto} =http [OR]
RewriteCond %{HTTP:X-Forwarded-Proto} =""
RewriteCond %{HTTPS} !=on
RewriteCond %{HTTP_HOST} !^www.lycosongaming.de$
RewriteRule ^(.*)$ https://www.lycosongaming.de/$1 [R=301,L]

<IfModule mod_headers.c>
	Header set Access-Control-Allow-Origin "*"
	Header set Access-Control-Allow-Credentials true
</IfModule>

<IfModule mod_rewrite.c>
	RewriteEngine On RewriteBase /
	RewriteRule ^index\.html$ - [L]
	RewriteCond %{REQUEST_FILENAME} !-f
	RewriteCond %{REQUEST_FILENAME} !-d
	RewriteCond %{REQUEST_FILENAME} !-l
	RewriteRule . /index.html [L]
</IfModule>

Header set x-Frame-Options "SAMEORIGIN"
*/

class Tool extends Component {
	constructor(props) {
		super(props);

		this.state = {
			twitchData: false,
			user: '',
			value: '',
			user_name: '',
			title: '',
			game_name: '',
			unFollowerArray: [],
			access_token_twitch: '',
			token_type_twitch: '',
			access_token_twitter: '',
			token_type_twitter: '',
		};

		this.loadStreamer = this.loadStreamer.bind(this);
		this.handleChange = this.handleChange.bind(this);

		this.getTwitchToken = this.getTwitchToken.bind(this);
		this.getNoSupporter = this.getNoSupporter.bind(this);

		this.getTwitterToken = this.getTwitterToken.bind(this);
	}

	handleChange(event) {
		this.setState({ value: event.target.value });
	}

	loadStreamer(event) {
		this.setState({ user: this.state.value });
		event.preventDefault();

		const fetchTwitchData = async () => {
			this.getTwitchToken().then(async (data) => {
				let result = await data.get(
					'https://api.twitch.tv/helix/streams?user_login=' +
						this.state.user
				);

				if (result.data.data.length !== 0) {
					this.setState({
						twitchData: true,
						user_login: result.data.data[0].user_login,
						title: result.data.data[0].title,
						game_name: result.data.data[0].game_name,
					});
				} else {
					result = await data.get(
						'https://api.twitch.tv/helix/users?login=' +
							this.state.user
					);

					this.setState({
						twitchData: true,
						user_login: result.data.data[0].display_name,
						title: result.data.data[0].description,
						game_name: result.data.data[0].description,
					});
				}
			});
		};

		fetchTwitchData();
	}

	async getTwitchToken() {
		const responseTwitch = await axios({
			method: 'post',
			url: 'https://id.twitch.tv/oauth2/token',
			params: {
				client_id: process.env.REACT_APP_TWITCH_CLIENT_ID,
				client_secret: process.env.REACT_APP_TWITCH_SECRET_CLIENT_ID,
				grant_type: 'client_credentials',
			},
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
			},
		});

		this.setState({
			access_token_twitch: responseTwitch.data.access_token,
			token_type_twitch: responseTwitch.data.token_type,
		});

		let bearer_token_twitch =
			this.state.token_type_twitch[0].toUpperCase() +
			this.state.token_type_twitch.slice(1) +
			' ' +
			this.state.access_token_twitch;

		let twitchAPI = axios.create({
			headers: {
				'Client-ID': process.env.REACT_APP_TWITCH_CLIENT_ID,
				Authorization: bearer_token_twitch,
			},
		});

		return twitchAPI;
	}

	async getNoSupporter() {
		this.getTwitchToken().then(async (data) => {
			const result = await data.get(
				'https://api.twitch.tv/helix/users?login=' + this.state.user
				// 'https://api.twitch.tv/helix/users/follows?to_id=83207101'
				// 'https://api.twitch.tv/helix/streams?user_login=' + this.state.user
			);

			let myArray = [];

			const resultFollows = await data.get(
				'https://api.twitch.tv/helix/users/follows?first=100&from_id=' +
					result.data.data[0].id
			);

			myArray.push(resultFollows.data.data);

			let pagination = resultFollows.data.pagination.cursor;

			if (pagination !== undefined) {
				do {
					let test = await data.get(
						'https://api.twitch.tv/helix/users/follows?first=100&from_id=' +
							result.data.data[0].id +
							'&after=' +
							pagination
					);
					myArray.push(test.data.data);
					pagination = test.data.pagination.cursor;
				} while (pagination !== undefined);
			}

			let myUnFollowArray = [];

			myArray.forEach((item) => {
				item.forEach(async (item2) => {
					const resultConnection = await data.get(
						'https://api.twitch.tv/helix/users/follows?from_id=' +
							item2.to_id +
							'&to_id=' +
							result.data.data[0].id
					);

					if (resultConnection.data.total === 0) {
						myUnFollowArray.push({
							to_name: item2.to_name,
							to_id: item2.to_id,
						});
					}
				});
			});

			setTimeout(() => {
				this.setState({
					unFollowerArray: myUnFollowArray,
				});
			}, 10000);
		});
	}

	async getTwitterToken() {
		const responseTwitter = await axios({
			method: 'post',
			url: 'https://api.twitter.com/oauth2/token',
			params: {
				client_id: process.env.REACT_APP_TWITTER_CLIENT_ID,
				client_secret: process.env.REACT_APP_TWITTER_APP_SECRET_KEY,
				grant_type: 'client_credentials',
			},
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
			},
		});

		this.setState({
			access_token_twitter: responseTwitter.data.access_token,
			token_type_twitter: responseTwitter.data.token_type,
		});

		let bearer_token_twitter =
			this.state.token_type_twitter[0].toUpperCase() +
			this.state.token_type_twitter.slice(1) +
			' ' +
			this.state.access_token_twitter;

		let twitterAPI = axios.create({
			headers: {
				'Client-ID': process.env.REACT_APP_TWITTER_CLIENT_ID,
				Authorization: bearer_token_twitter,
			},
		});

		return twitterAPI;
	}

	componentDidMount() {
		// const fetchTwitchData = async () => {
		// 	this.getTwitchToken().then(async (data) => {
		// 		const result = await data.get(
		// 			'https://api.twitch.tv/helix/streams?user_login=' +
		// 				this.state.user
		// 		);
		// 		if (result.data.data.length !== 0) {
		// 			this.setState({
		// 				twitchData: true,
		// 				user_login: result.data.data[0].user_login,
		// 				title: result.data.data[0].title,
		// 				game_name: result.data.data[0].game_name,
		// 			});
		// 		}
		// 	});
		// };
		// fetchTwitchData();
		// const fetchTwitterData = async () => {
		// 	this.getTwitterToken().then(async (data) => {
		// 		const result = await data.get(
		// 			'https://api.twitter.com/2/tweets/search/recent'
		// 		);
		// 		console.log(result);
		// 	});
		// };
		// fetchTwitterData();
	}

	render() {
		let myAtts = [];
		let myhashtags = this.state.game_name.replace(/\s+/g, '');
		let myPostContent = '';

		myhashtags = myhashtags.split(':');
		myAtts.push(
			'TwitchHost',
			'TwitchStreamDE1',
			'StreamerSupRT',
			'push_twitch'
		);
		myhashtags.push(
			'twitchDe',
			'smallstreamer',
			'TStreamerBot',
			'twitchpush',
			'TwitchDESupport'
		);

		if (this.state.game_name === 'Just Chatting') {
			if (this.state.user_login === 'lycosongaming') {
				myPostContent += 'Hyper geile rammelbande<br /><br />';
			} else {
				myPostContent +=
					'Just Chatting mit ' +
					this.state.user_login +
					'<br /><br />' +
					this.state.title +
					'<br /><br />';
			}
		} else {
			myPostContent +=
				'Wir zocken ' + this.state.game_name + '<br /><br />';
		}

		myAtts.forEach((atts) => {
			myPostContent += '@' + atts + ' ';
		});
		myPostContent += '<br />';
		myhashtags.forEach((tag) => {
			myPostContent += '#' + tag + ' ';
		});

		myPostContent += '<br /><br />';
		myPostContent += 'https://www.twitch.tv/' + this.state.user_login;

		return (
			<div className="Tool">
				<div className="row">
					<div className="col-12">
						<div className="row">
							<div className="col-1">Streamer:</div>
							<div className="col-11">
								<form onSubmit={this.loadStreamer}>
									<input
										type="text"
										value={this.state.value}
										onChange={this.handleChange}
									/>
									<input type="submit" value="Submit" />
								</form>
							</div>
						</div>
					</div>
					<div
						className="col-12 my-3 pb-3 borderBottom"
						dangerouslySetInnerHTML={{
							__html: this.state.twitchData
								? myPostContent
								: 'Der Streamer ist nicht Live!',
						}}
					></div>
				</div>
				{this.state.user !== '' ? (
					<>
						<div className="row">
							<div className="col-12">
								{this.state.user} geladen.
							</div>
							<div className="col-12 my-3">
								Wer Supportet nicht Zurück.
							</div>
							<div className="col-12">
								<button onClick={this.getNoSupporter}>
									Nicht Supporter Laden
								</button>
							</div>
						</div>
						<div className="row mt-3">
							{this.state.unFollowerArray.map((noSupport) => {
								return (
									<div
										key={noSupport.to_id}
										className="mb-3 col-3"
									>
										<Link
											className="nav-link"
											target="blank"
											to={{
												pathname:
													'https://twitch.tv/' +
													noSupport.to_name,
											}}
										>
											{noSupport.to_name}
										</Link>
									</div>
								);
							})}
						</div>
					</>
				) : null}
			</div>
		);
	}
}

export default Tool;

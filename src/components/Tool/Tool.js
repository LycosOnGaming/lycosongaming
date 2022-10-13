import React, { Component } from 'react';
import axios from 'axios';

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
			user_name: '',
			title: '',
			game_name: '',
			access_token_twitch: '',
			token_type_twitch: '',
			access_token_twitter: '',
			token_type_twitter: '',
		};
	}

	componentDidMount() {
		const fetchTwitchData = async () => {
			const responseTwitch = await axios({
				method: 'post',
				url: 'https://id.twitch.tv/oauth2/token',
				params: {
					client_id: process.env.REACT_APP_TWITCH_CLIENT_ID,
					client_secret:
						process.env.REACT_APP_TWITCH_SECRET_CLIENT_ID,
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

			const result = await twitchAPI.get(
				'https://api.twitch.tv/helix/streams?user_login=lycosongaming'
			);

			if (result.data.data.length !== 0) {
				this.setState({
					twitchData: true,
					user_login: result.data.data[0].user_login,
					title: result.data.data[0].title,
					game_name: result.data.data[0].game_name,
				});
			}
		};

		fetchTwitchData();

		const fetchTwitterData = async () => {
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

			const result = await twitterAPI.get(
				'https://api.twitter.com/2/tweets/search/recent'
			);

			console.log(result);
		};

		fetchTwitterData();
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
					<div
						className="col-12"
						dangerouslySetInnerHTML={{
							__html: this.state.twitchData
								? myPostContent
								: null,
						}}
					></div>
				</div>
			</div>
		);
	}
}

export default Tool;

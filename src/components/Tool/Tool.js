import React, { Component } from 'react';
import axios from 'axios';

import './Tool.scss';

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

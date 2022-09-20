import React, { Component } from 'react';
import axios from 'axios';
// import TwitterApi from 'twitter-api-v2';

import './Tool.scss';

class Tool extends Component {
	constructor(props) {
		super(props);

		this.state = {
			twitchData: false,
			user_name: '',
			title: '',
			game_name: '',
		};
	}

	componentDidMount() {
		let twitchAPI = axios.create({
			headers: {
				'Client-ID': process.env.REACT_APP_TWITCH_CLIENT_ID,
				Authorization: process.env.REACT_APP_TWITCH_AUTH,
			},
		});

		console.log(twitchAPI);

		// let twitterAPI = axios.create({
		// 	headers: {
		// 		'Client-ID': process.env.REACT_APP_TWITTER_CLIENT_ID,
		// 		Authorization: process.env.REACT_APP_TWITTER_AUTH,
		// 	},
		// });

		/*
REACT_APP_TWITTER_CLIENT_ID
REACT_APP_TWITTER_API_KEY
REACT_APP_TWITTER_SECRET_KEY
REACT_APP_TWITTER_AUTH
*/

		const fetchData = async () => {
			/*
			const result = await twitchAPI.get(
				'https://api.twitch.tv/helix/streams?user_login=lycosongaming'
			);
			*/
			const result = await twitchAPI.get(
				'https://api.twitch.tv/helix/streams?user_login=Lautschmer'
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

		fetchData();
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
			myPostContent += 'Hyper geile rammelbande<br /><br />';
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

		myPostContent += '#' + this.state.user_login + '<br /><br />';
		myPostContent += 'https://www.twitch.tv/' + this.state.user_login;

		if (this.state.twitchData) {
			return (
				<div className="Tool">
					<div className="row">
						<div className="col-12">{myPostContent}</div>
					</div>
				</div>
			);
		} else {
			return (
				<div className="Tool">
					<div className="row">
						<div className="col-12"></div>
					</div>
				</div>
			);
		}
	}
}

export default Tool;

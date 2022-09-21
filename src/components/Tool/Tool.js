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
			access_token: '',
			token_type: '',
		};
	}

	componentDidMount() {
		const fetchData = async () => {
			const response = await axios.post(
				'https://id.twitch.tv/oauth2/token?client_id=' +
					process.env.REACT_APP_TWITCH_CLIENT_ID +
					'&client_secret=' +
					process.env.REACT_APP_TWITCH_SECRET_CLIENT_ID +
					'&grant_type=client_credentials'
			);

			this.setState({
				access_token: response.data.access_token,
				token_type: response.data.token_type,
			});

			let bearer_token =
				this.state.token_type[0].toUpperCase() +
				this.state.token_type.slice(1) +
				' ' +
				this.state.access_token;

			let twitchAPI = axios.create({
				headers: {
					'Client-ID': process.env.REACT_APP_TWITCH_CLIENT_ID,
					Authorization: bearer_token,
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

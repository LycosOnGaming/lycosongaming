import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import './AddCustomer.scss';

class AddCustomer extends Component {
	constructor(props) {
		super(props);

		this.state = {
			customer: [],
		};
	}

	componentDidMount() {
		axios
			.get('https://www.lycosongaming.de/api/drkcustomer/')
			.then(({ data }) => {
				this.setState({
					customer: data,
				});
			});
	}

	render() {
		return (
			<div className="AddCustomer">
				<Link
					to={{
						pathname: `/AddOrUpdateCustomer`,
					}}
					onClick={() => {
						window.location.href = '/AddOrUpdateCustomer';
					}}
				>
					Neu
				</Link>

				{this.state.customer.map((customer) => {
					return (
						<div key={customer.drkcustomer_ID}>
							<Link
								to={{
									pathname: `/AddOrUpdateCustomer?drkcustomer=${customer.drkcustomer_ID}`,
								}}
								onClick={() => {
									window.location.href =
										'/AddOrUpdateCustomer?drkcustomer=' +
										customer.drkcustomer_ID +
										'';
								}}
							>
								{customer.drkcustomer_Firstname}{' '}
								{customer.drkcustomer_Lastname}
							</Link>
						</div>
					);
				})}
			</div>
		);
	}
}

export default AddCustomer;

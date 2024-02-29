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
			<div className="AddCustomer row">
				<div className="col-12 mb-3">
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
				</div>

				<div className="col-12">
					<div className="row">
						{this.state.customer.map((customer) => {
							return (
								<div
									className="col-12 col-md-6 mb-3"
									key={customer.drkcustomer_ID}
								>
									<div className="row">
										<div className="col-12 col-md-6">
											<Link
												to={{
													pathname: `/AddBooking?drkcustomer=${customer.drkcustomer_ID}`,
												}}
												onClick={() => {
													window.location.href =
														'/AddBooking?drkcustomer=' +
														customer.drkcustomer_ID +
														'';
												}}
											>
												{customer.drkcustomer_Firstname}{' '}
												{customer.drkcustomer_Lastname}
											</Link>
										</div>
										<div className="col-12 col-md-6">
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
												Editieren
											</Link>
										</div>
									</div>
								</div>
							);
						})}
					</div>
				</div>
			</div>
		);
	}
}

export default AddCustomer;

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import './AddCustomer.scss';
import { number } from 'yup';

class AddCustomer extends Component {
	constructor(props) {
		super(props);

		this.state = {
			customer: [],
			worktime: [],
			amount: 0,
			showTable: false,
		};
	}

	handleSubmit = (e) => {
		e.preventDefault();
		axios.post('https://www.lycosongaming.de/api/generatePDF.php');
	};

	handleDownload = (e) => {
		axios.get('https://www.lycosongaming.de/api/download.php');
	};

	componentDidMount() {
		axios
			.get('https://www.lycosongaming.de/api/drkcustomer/')
			.then(({ data }) => {
				this.setState({
					customer: data,
				});
			});

		axios
			.get('https://www.lycosongaming.de/api/drkcustomer/worktime.php')
			.then(({ data }) => {
				if (data !== null) {
					let amount = 0;
					data.forEach((element) => {
						amount += Number(element.drkemployee_Amount);
					});

					this.setState({
						worktime: data,
						amount: Math.round(amount * 100) / 100,
						showTable: true,
					});
				} else {
					this.setState({
						showTable: false,
					});
				}
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
					<div>Summe: {this.state.amount} €</div>
					<div className="row">
						<div className="col-12 worktime">
							<div className="row my-3 text-center">
								<div className="col-2">Mitarbeiter</div>
								<div className="col-3">Kunde</div>
								<div className="col-2">Beschreibung</div>
								<div className="col-2">Datum</div>
								<div className="col-1">Start</div>
								<div className="col-1">Ende</div>
								<div className="col-1">Dauer</div>
							</div>
						</div>
						{this.state.showTable ? (
							this.state.worktime.map((worktime) => {
								return (
									<div className="col-12 worktime">
										<div
											className="row my-3 text-center"
											key={worktime.drkworktime_ID}
										>
											<div className="col-2">
												{worktime.drkemployee_Name}
											</div>
											<div className="col-3">
												{worktime.drkcustomer_Name}
											</div>
											<div className="col-2">
												{
													worktime.drkworktime_Description
												}
											</div>
											<div className="col-2">
												{worktime.drkworktime_Date}
											</div>
											<div className="col-1">
												{worktime.drkworktime_TimeStart}
											</div>
											<div className="col-1">
												{worktime.drkworktime_TimeEnd}
											</div>
											<div className="col-1">
												{
													worktime.drkworktime_HoursDecimal
												}
											</div>
										</div>
									</div>
								);
							})
						) : (
							<div className="col-12 worktime mb-3">
								Noch keine Daten Vorhanden!
							</div>
						)}
					</div>
					<div className="row">
						<div className="col-12 col-md-6">
							<button
								className="btn btn-primary mt-3"
								type="submit"
								onClick={this.handleSubmit}
							>
								PDF erzeugen
							</button>
							<Link
								className="btn btn-primary ml-3 mt-3"
								onClick={this.handleDownload}
							>
								Download
							</Link>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default AddCustomer;

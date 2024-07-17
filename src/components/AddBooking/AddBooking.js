import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import './AddBooking.scss';

class AddBooking extends Component {
	constructor(props) {
		super(props);

		const queryParameters = new URLSearchParams(window.location.search);

		this.state = {
			customerid: queryParameters.get('drkcustomer'),
			employeeid: '1',
			firstname: '',
			lastname: '',
			cleaning: '',
			sucking: '',
			careing: '',
			shopping: '',
			school: '',
			care: '',
			food: '',
			date: new Date().toLocaleDateString('en-CA'),
			timestart: '',
			timeend: '',
			shift: 'morgens',
		};
		console.log(this.state.customerid);
	}

	handleSubmit = (e) => {
		e.preventDefault();
		const data = {
			customerid: this.state.customerid,
			employeeid: this.state.employeeid,
			cleaning: this.state.cleaning,
			sucking: this.state.sucking,
			careing: this.state.careing,
			shopping: this.state.shopping,
			school: this.state.school,
			care: this.state.care,
			food: this.state.food,
			date: this.state.date,
			timestart: this.state.timestart,
			timeend: this.state.timeend,
			shift: this.state.shift,
		};

		axios
			.post(
				'https://www.lycosongaming.de/api/drkcustomer/insertCustomerBooking.php',
				data
			)
			.then((res) => {
				console.log(res.data);
				window.location = '/addCustomer';
			})
			.catch((error) => {
				console.log(error);
			});
	};

	handleChange = (event) => {
		const { name, value } = event.target;
		this.setState({ [name]: value });
	};

	componentDidMount() {
		if (this.state.customerid !== null) {
			axios
				.get(
					'https://www.lycosongaming.de/api/drkcustomer/index.php?customerid=' +
						this.state.customerid
				)
				.then(({ data }) => {
					this.setState({
						customerid: data[0].drkcustomer_ID,
						firstname: data[0].drkcustomer_Firstname,
						lastname: data[0].drkcustomer_Lastname,
					});
				});
		}
	}

	render() {
		return (
			<div className="AddBooking">
				<div className="col-lg-12">
					<form>
						<div className="row">
							<div className="col-6">
								<label value="customerid">
									Kunde {this.state.firstname}{' '}
									{this.state.lastname}
								</label>
							</div>
							<div className="col-12">
								<label value="description">Unterstützung</label>
							</div>
							<div className="col-3">
								<label value="employee">Unterstützer</label>
							</div>
							<div className="col-9">
								<select
									name="employeeid"
									onChange={this.handleChange}
								>
									<option value="1">Christiane</option>
									<option value="2">Benjamin</option>
								</select>
							</div>
							{this.state.customerid == 10 ||
							this.state.customerid == 11 ||
							this.state.customerid == 12 ? (
								<div className="col-12">
									<div className="row">
										<div className="col-3">
											<label value="school">
												Schulung
											</label>
										</div>
										<div className="col-9">
											<input
												name="school"
												value="Schulung"
												type="checkbox"
												onChange={this.handleChange}
											/>
										</div>
										<div className="col-3">
											<label value="shiftlabel">
												Dienst
											</label>
										</div>
										<div className="col-9">
											<select
												name="shift"
												onChange={this.handleChange}
											>
												<option value="morgens">
													Morgens
												</option>
												<option value="mittags">
													Mittags
												</option>
												<option value="abends">
													Abends
												</option>
											</select>
										</div>
										<div className="col-3">
											<label value="care">
												Tagespflege
											</label>
										</div>
										<div className="col-9">
											<input
												name="care"
												value="TPE"
												type="checkbox"
												onChange={this.handleChange}
											/>
										</div>
										<div className="col-3">
											<label value="food">
												Essen auf Rädern
											</label>
										</div>
										<div className="col-9">
											<input
												name="food"
												value="EAR"
												type="checkbox"
												onChange={this.handleChange}
											/>
										</div>
									</div>
								</div>
							) : (
								<div className="col-12">
									<div className="row">
										<div className="col-3">
											<label value="sucking">
												Staubsaugen
											</label>
										</div>
										<div className="col-9">
											<input
												name="sucking"
												value="Staubsaugen"
												type="checkbox"
												onChange={this.handleChange}
											/>
										</div>
										<div className="col-3">
											<label value="cleaning">
												Putzen
											</label>
										</div>
										<div className="col-9">
											<input
												name="cleaning"
												value="Putzen"
												type="checkbox"
												onChange={this.handleChange}
											/>
										</div>
										<div className="col-3">
											<label value="shopping">
												Einkaufen
											</label>
										</div>
										<div className="col-9">
											<input
												name="shopping"
												value="Einkaufen"
												type="checkbox"
												onChange={this.handleChange}
											/>
										</div>
										<div className="col-3">
											<label value="careing">
												Betreuung
											</label>
										</div>
										<div className="col-9">
											<input
												name="careing"
												value="Betreuung"
												type="checkbox"
												onChange={this.handleChange}
											/>
										</div>
									</div>
								</div>
							)}

							<div className="col-12 mt-2">
								<div className="row">
									<div className="col-6">
										<div className="row">
											<div className="col-6">
												<label value="date">
													Datum
												</label>
											</div>
											<div className="col-6">
												<input
													name="date"
													value={this.state.date}
													type="date"
													onChange={this.handleChange}
												/>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div className="col-12 mt-2">
								<div className="row">
									<div className="col-6">
										<div className="row">
											<div className="col-6">
												<label value="timestart">
													Uhrzeit Start
												</label>
											</div>
											<div className="col-6">
												<input
													name="timestart"
													value={this.state.timestart}
													type="time"
													onChange={this.handleChange}
												/>
											</div>
											<div className="col-6">
												<label value="timeend">
													Uhrzeit Ende
												</label>
											</div>
											<div className="col-6">
												<input
													name="timeend"
													value={this.state.timeend}
													type="time"
													onChange={this.handleChange}
												/>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
						<button
							className="mt-3"
							type="submit"
							onClick={this.handleSubmit}
						>
							Speichern
						</button>
					</form>
				</div>
				<div className="mt-3">
					<Link
						to={{
							pathname: `/AddCustomer`,
						}}
					>
						Zurück
					</Link>
				</div>
			</div>
		);
	}
}

export default AddBooking;

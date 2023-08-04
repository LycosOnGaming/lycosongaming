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
			firstname: '',
			lastname: '',
			cleaning: '',
			sucking: '',
			careing: '',
			shopping: '',
			garbage: '',
			date: '',
			timestart: '',
			timeend: '',
		};
	}

	handleSubmit = (e) => {
		e.preventDefault();
		const data = {
			customerid: this.state.customerid,
			cleaning: this.state.cleaning,
			sucking: this.state.sucking,
			careing: this.state.careing,
			shopping: this.state.shopping,
			garbage: this.state.garbage,
			date: this.state.date,
			timestart: this.state.timestart,
			timeend: this.state.timeend,
		};

		axios
			.post(
				'https://www.lycosongaming.de/api/drkcustomer/insertCustomerBooking.php',
				data
			)
			.then((res) => {
				console.log(res.data);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	handleChange = (event) => {
		console.log(event.target);
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
							<div className="col-6">
								<label value="description">
									Unterstuetzung
								</label>
								<label value="sucking">Staubsaugen</label>
								<input
									name="sucking"
									value="Staubsaugen"
									type="checkbox"
									onChange={this.handleChange}
								/>
								<label value="cleaning">Putzen</label>
								<input
									name="cleaning"
									value="Putzen"
									type="checkbox"
									onChange={this.handleChange}
								/>
								<label value="shopping">Einkaufen</label>
								<input
									name="shopping"
									value="Einkaufen"
									type="checkbox"
									onChange={this.handleChange}
								/>
								<label value="careing">Betreuung</label>
								<input
									name="careing"
									value="Betreuung"
									type="checkbox"
									onChange={this.handleChange}
								/>
								<label value="garbage">Tonnen im Monat</label>
								<input
									name="garbage"
									value="Abfalltonnen ganzer Monat"
									type="checkbox"
									onChange={this.handleChange}
								/>
							</div>
							<div className="col-6">
								<label value="date">Datum</label>
								<input
									name="date"
									value={this.state.date}
									type="date"
									onChange={this.handleChange}
								/>
							</div>
							<div className="col-6">
								<label value="timestart">Uhrzeit Start</label>
								<input
									name="timestart"
									value={this.state.timestart}
									type="time"
									onChange={this.handleChange}
								/>
							</div>
							<div className="col-6">
								<label value="timeend">Uhrzeit Ende</label>
								<input
									name="timeend"
									value={this.state.timeend}
									type="time"
									onChange={this.handleChange}
								/>
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
				<Link
					to={{
						pathname: `/AddCustomer`,
					}}
				>
					Zurueck
				</Link>
			</div>
		);
	}
}

export default AddBooking;

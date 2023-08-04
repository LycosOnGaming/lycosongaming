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
			description: '',
			date: '',
			timestart: '',
			timeend: '',
		};
	}

	handleSubmit = (e) => {
		e.preventDefault();
		const data = {
			customerid: this.state.customerid,
			description: this.state.description,
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
		const { name, value } = event.target;
		this.setState({ [name]: value });
	};

	render() {
		return (
			<div className="AddBooking">
				<div className="col-lg-12">
					<form>
						<div className="row">
							<div className="col-6">
								<label value="customerid">
									Kunde {this.state.customerid}
								</label>
							</div>
							<div className="col-6">
								<label value="description">
									Unterstuetzung
								</label>
								<input
									name="description"
									value={this.state.description}
									type="select"
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

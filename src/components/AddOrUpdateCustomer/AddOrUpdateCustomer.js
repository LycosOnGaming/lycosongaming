import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import './AddOrUpdateCustomer.scss';

class AddOrUpdateCustomer extends Component {
	constructor(props) {
		super(props);

		const queryParameters = new URLSearchParams(window.location.search);

		this.state = {
			customerid: queryParameters.get('drkcustomer'),
			firstname: '',
			lastname: '',
			street: '',
			streetno: '',
			zipcode: '',
			place: '',
			distance: '',
			distancetime: '',
		};
	}

	handleSubmit = (e) => {
		e.preventDefault();
		const data = {
			customerid: this.state.customerid,
			firstname: this.state.firstname,
			lastname: this.state.lastname,
			street: this.state.street,
			streetno: this.state.streetno,
			zipcode: this.state.zipcode,
			place: this.state.place,
			distance: this.state.distance,
			distancetime: this.state.distancetime,
		};

		axios
			.post(
				'https://www.lycosongaming.de/api/drkcustomer/insertCustomer.php',
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
						street: data[0].drkcustomer_Street,
						streetno: data[0].drkcustomer_StreetNo,
						zipcode: data[0].drkcustomer_ZipCode,
						place: data[0].drkcustomer_Place,
						distance: data[0].drkcustomer_Distance,
						distancetime: data[0].drkcustomer_DistanceTime,
					});
				});
		}
	}

	render() {
		return (
			<div className="AddOrUpdateCustomer">
				<div key={this.state.customerid} className="col-lg-12">
					<form>
						<div className="row">
							<div className="col-6">
								<label value="firstname">Vorname</label>
								<input
									name="firstname"
									value={this.state.firstname}
									type="text"
									onChange={this.handleChange}
								/>
							</div>
							<div className="col-6">
								<label value="lastname">Nachname</label>
								<input
									name="lastname"
									value={this.state.lastname}
									type="text"
									onChange={this.handleChange}
								/>
							</div>
							<div className="col-6">
								<label value="street">Strasse</label>
								<input
									name="street"
									value={this.state.street}
									type="text"
									onChange={this.handleChange}
								/>
							</div>
							<div className="col-6">
								<label value="streetno">Hausnummer</label>
								<input
									name="streetno"
									value={this.state.streetno}
									type="text"
									onChange={this.handleChange}
								/>
							</div>
							<div className="col-6">
								<label value="zipcode">Postleitzahl</label>
								<input
									name="zipcode"
									value={this.state.zipcode}
									type="text"
									onChange={this.handleChange}
								/>
							</div>
							<div className="col-6">
								<label value="place">Ort</label>
								<input
									name="place"
									value={this.state.place}
									type="text"
									onChange={this.handleChange}
								/>
							</div>
							<div className="col-6">
								<label value="distance">Kilometer</label>
								<input
									name="distance"
									value={this.state.distance}
									type="text"
									onChange={this.handleChange}
								/>
							</div>
							<div className="col-6">
								<label value="distancetime">Anfahrtszeit</label>
								<input
									name="distancetime"
									value={this.state.distancetime}
									type="text"
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
					Back
				</Link>
			</div>
		);
	}
}

export default AddOrUpdateCustomer;

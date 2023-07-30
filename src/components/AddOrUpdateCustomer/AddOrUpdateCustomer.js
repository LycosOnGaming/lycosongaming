import React, { Component } from 'react';
import axios from 'axios';

import './AddOrUpdateCustomer.scss';

class AddOrUpdateCustomer extends Component {
	constructor(props) {
		super(props);

		this.state = {
			customerid: '',
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
		axios
			.get('https://www.lycosongaming.de/api/drkcustomer/')
			.then(({ data }) => {
				this.setState({
					customerid: data.drkcustomer_ID,
					firstname: data.drkcustomer_Firstname,
					lastname: data.drkcustomer_Lastname,
					street: data.drkcustomer_Street,
					streetno: data.drkcustomer_StreetNo,
					zipcode: data.drkcustomer_ZipCode,
					place: data.drkcustomer_Place,
					distance: data.drkcustomer_Distance,
					distancetime: data.drkcustomer_DistanceTime,
				});
			});
	}

	render() {
		const {
			customerid,
			firstname,
			lastname,
			street,
			streetno,
			zipcode,
			place,
			distance,
			distancetime,
		} = this.state;

		return (
			<div className="AddOrUpdateCustomer">
				<div key={customerid} className="col-lg-12">
					<form>
						<div className="row">
							<div className="col-6">
								<label value="firstname">Vorname</label>
								<input
									name="firstname"
									value={firstname}
									type="text"
									onChange={this.handleChange}
								/>
							</div>
							<div className="col-6">
								<label value="lastname">Nachname</label>
								<input
									name="lastname"
									value={lastname}
									type="text"
									onChange={this.handleChange}
								/>
							</div>
							<div className="col-6">
								<label value="street">Strasse</label>
								<input
									name="street"
									value={street}
									type="text"
									onChange={this.handleChange}
								/>
							</div>
							<div className="col-6">
								<label value="streetno">Hausnummer</label>
								<input
									name="streetno"
									value={streetno}
									type="text"
									onChange={this.handleChange}
								/>
							</div>
							<div className="col-6">
								<label value="zipcode">Postleitzahl</label>
								<input
									name="zipcode"
									value={zipcode}
									type="text"
									onChange={this.handleChange}
								/>
							</div>
							<div className="col-6">
								<label value="place">Ort</label>
								<input
									name="place"
									value={place}
									type="text"
									onChange={this.handleChange}
								/>
							</div>
							<div className="col-6">
								<label value="distance">Kilometer</label>
								<input
									name="distance"
									value={distance}
									type="text"
									onChange={this.handleChange}
								/>
							</div>
							<div className="col-6">
								<label value="distancetime">Anfahrtszeit</label>
								<input
									name="distancetime"
									value={distancetime}
									type="text"
									onChange={this.handleChange}
								/>
							</div>
						</div>
						<button type="submit" onClick={this.handleSubmit}>
							Speichern
						</button>
					</form>
				</div>
			</div>
		);
	}
}

export default AddOrUpdateCustomer;

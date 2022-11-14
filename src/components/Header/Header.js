import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
// import LycosLogo from '../../assets/images/LycosLogo.png';
import lycosBanner from '../../assets/images/Untitled 4.jpg';
import './Header.scss';

class Header extends Component {
	render() {
		return (
			<header className="container-fluid px-0 Header">
				<div className="row">
					{/* <div className="col-3 col-md-3 col-xl-2">
						<Link to="/">
							<img
								className="d-none d-lg-inline logo w-75 position-absolute pl-2 pt-2"
								src={LycosLogo}
								alt="logo"
							/>
						</Link>
					</div> */}
					<div className="col-12">
						<img
							className="banner"
							src={lycosBanner}
							alt="banner"
						/>
					</div>
				</div>
			</header>
		);
	}
}

export default Header;

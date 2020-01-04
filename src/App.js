{/* REPLACE NAVLINK WITH MDBNAVLINK AFTER FEB 1ST 2020*/ }

import React, { Component } from 'react';
import { ParallaxProvider } from 'react-scroll-parallax';
import { Widget, addResponseMessage, addLinkSnippet, addUserMessage } from 'react-chat-widget';
import 'react-chat-widget/lib/styles.css';

import {
	MDBNavbar,
	MDBNavbarBrand,
	MDBNavbarNav,
	MDBHamburgerToggler,
	MDBCollapse,
	MDBNavItem,
	NavLink
} from 'mdbreact';
import { BrowserRouter as Router } from 'react-router-dom';
import Routes from './Routes';


class App extends Component {
	state = {
		collapseID: ''
	};

	toggleCollapse = (collapseID) => () =>
		this.setState((prevState) => ({
			collapseID: prevState.collapseID !== collapseID ? collapseID : ''
		}));

	closeCollapse = (collapseID) => () => this.state.collapseID === collapseID && this.setState({ collapseID: '' });

	componentDidMount() {
		addResponseMessage("So, what's on your mind?");
	}

	handleNewUserMessage = (newMessage) => {
		console.log(`New message incoming! ${newMessage}`);
		// Now send the message throught the backend API
		addResponseMessage();
	};

	render() {

		const overlay = (
			<div
				id="sidenav-overlay"
				style={{ backgroundColor: 'transparent' }}
				onClick={this.toggleCollapse('mainNavbarCollapse')}
			/>
		);

		const { collapseID } = this.state;

		return (
			<Router>
				<div className="flyout-wrapper">
					<MDBNavbar color="white" dark expand="md" className="sticky-top" scrolling>
						<MDBNavbarBrand href="/" data-header="head-nav-logo">
							<span className="App-logo">EVRO</span>
						</MDBNavbarBrand>
						<MDBHamburgerToggler
							className="hide-ham"
							color="#2c3d5c"
							id="hamburger1"
							onClick={this.toggleCollapse('mainNavbarCollapse')}
						/>

						<MDBCollapse id="mainNavbarCollapse" isOpen={this.state.collapseID} navbar>
							<MDBNavbarNav right>
								<MDBNavItem>
									<NavLink exact data-header="head-nav-about" to="/about/evan-rosa" onClick={this.closeCollapse('mainNavbarCollapse')}>
										About
									</NavLink>
								</MDBNavItem>
								<MDBNavItem>
									<NavLink data-header="head-nav-portfolio" onClick={this.closeCollapse('mainNavbarCollapse')} to="/portfolio/">
										Portfolio
									</NavLink>
								</MDBNavItem>
								<MDBNavItem>
									<NavLink data-header="head-nav-contact" onClick={this.closeCollapse('mainNavbarCollapse')} to="/contact/evan-rosa">
										Contact
									</NavLink>
								</MDBNavItem>
							</MDBNavbarNav>
						</MDBCollapse>
					</MDBNavbar>
					<ParallaxProvider>
						<main>
							<Routes />
						</main>
					</ParallaxProvider>


					{/* <Widget
						handleNewUserMessage={this.handleNewUserMessage}
						title="Welcome to the EvRo.io ChatBot!"
						subtitle="Ask the EvRo ChatBot anything about Evan Rosa."
					/> */}
				</div>
			</Router>
		);
	}
}

export default App;

import React from 'react';
import { MDBBtn, MDBInput, MDBCard, MDBCardBody } from 'mdbreact';
import {
	withRouter
} from 'react-router-dom'

import '../index.css';

import axios from 'axios';

class ContactForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			name: '',
			email: '',
			subject: '',
			message: '',
			modal14: false
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleFormSubmit = this.handleFormSubmit.bind(this);
	}

	handleChange = (event) => {
		this.setState({ [event.target.name]: event.target.value });
	};
	handleFormSubmit = (event) => {
		axios.defaults.xsrfHeaderName = "X-CSRFToken";
		axios.defaults.xsrfCookieName = 'csrftoken';

		event.preventDefault();
		event.target.className += ' was-validated';
		const name = event.target.elements.name.value;
		const email = event.target.elements.email.value;
		const subject = event.target.elements.subject.value;
		const message = event.target.elements.message.value;

		axios
			.post(
				`https://getform.io/f/59d6128c-7371-4aa3-ac08-31cada7a293b`,
				this.state = {
					name: name,
					email: email,
					subject: subject,
					message: message
				},
				{ headers: { Accept: "application/json" } }
			)
			.then((res) => {
				console.log(res);
			})
			.catch((error) => console.error(error));

		axios
			.post(`/api/contact/`, {
				name: name,
				email: email,
				subject: subject,
				message: message
			})
			.then((res) => {
				this.props.history.push('/contact/thank-you')
			})
			.catch((error) => console.error(error));

		this.setState({ name: '', email: '', subject: '', message: '' }); // Reset form
	};

	render() {
		return (
			<div>
				<form id="myForm" onSubmit={(event) => this.handleFormSubmit(event)} className="needs-validation" noValidate>
					<MDBCard>
						<MDBCardBody className="z-depth-2">
							<h3 className="text-center h3-responsive">
								<strong>Have a question?</strong>
							</h3>
							<hr />
							<MDBInput
								required
								name="name"
								type="text"
								id="name"
								label="Your name"
								onChange={this.handleChange}
								value={this.state.name}
							/>

							<MDBInput
								required
								name="email"
								type="email"
								id="email"
								label="Your email"
								onChange={this.handleChange}
								value={this.state.email}
							/>

							<MDBInput
								required
								name="subject"
								type="text"
								id="subject"
								label="Subject Line"
								onChange={this.handleChange}
								value={this.state.subject}
							/>

							<MDBInput
								required
								name="message"
								type="textarea"
								id="message"
								label="Your message"
								onChange={this.handleChange}
								value={this.state.message}
							/>
							<div className="text-center mt-3 black-text">
								<MDBBtn data-internal="form submit" outline size="md" type="submit" className="btn-block z-depth-2 evro-navy-btn">
									Send
								</MDBBtn>
							</div>
						</MDBCardBody>
					</MDBCard>
				</form>
			</div>
		);
	}
}

export default withRouter(ContactForm);

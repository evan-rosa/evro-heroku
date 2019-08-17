import React from 'react';
import { MDBRow, MDBCol, MDBBtn, MDBInput } from 'mdbreact';
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
		axios.defaults.xsrfCookieName = 'csrftoken'

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
				<form onSubmit={(event) => this.handleFormSubmit(event)} className="needs-validation" noValidate>
					<MDBRow>
						<MDBCol md="12">
							<div className="md-form mb-0">
								<MDBInput
									required
									name="name"
									type="text"
									id="contact-name"
									label="Your name"
									onChange={this.handleChange}
								/>
							</div>
							<div className="md-form mb-0">
								<MDBInput
									required
									name="email"
									type="email"
									id="contact-email"
									label="Your email"
									onChange={this.handleChange}
								/>
							</div>
							<div className="md-form mb-0">
								<MDBInput
									required
									name="subject"
									type="text"
									id="contact-text"
									label="Subject Line"
									onChange={this.handleChange}
								/>
							</div>
							<div className="md-form mb-0">
								<MDBInput
									required
									name="message"
									type="textarea"
									id="contact-message"
									label="Your message"
									onChange={this.handleChange}
								/>
							</div>
						</MDBCol>
					</MDBRow>
					<MDBBtn data-internal="form submit" outline size="md" type="submit" className="btn-block z-depth-2 evro-navy-btn">
						Send
					</MDBBtn>
				</form>
			</div>
		);
	}
}

export default withRouter(ContactForm);

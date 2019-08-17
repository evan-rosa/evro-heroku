import React from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBIcon } from 'mdbreact';
import ContactForm from './formContact';
import Typed from 'react-typed';
import Foot from './Foot';
import { Helmet } from 'react-helmet'

import '../index.css';
import { ReactComponent as City } from '../assets/img/svg/dc-map.svg';
import axios from 'axios';

class ContactPage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			id: [],
			title: [],
			search_description: [],
			canonical: [],
			h_one: [],
		};
		this.getData = this.getData.bind(this);
	}
	getData() {
		const url = `/api/v2/pages/?type=contact.ContactPage&fields=*`;
		axios
			.get(url)
			.then((res) => {
				this.setState({
					id: res.data.items[0].id,
					title: res.data.items[0].meta.seo_title,
					search_description: res.data.items[0].meta.search_description,
					canonical: res.data.items[0].canonical,
					h_one: res.data.items[0].h_one,
				});
			})
			.catch((error) => this.setState({ error }));
	}

	componentDidMount() {
		this.getData();
	}
	render() {
		return (
			<div>
				<Helmet>
					<title>{this.state.title}</title>
					<link rel="canonical" href={this.state.canonical} />
					<meta name="description" content={this.state.search_description} />
				</Helmet>
				<MDBContainer className="pt-5 pb-5">
					<MDBRow className="pb-3">
						<MDBCol md="12">
							<h1 className="h1">{this.state.h_one}</h1>
							<p className="lead">
								<Typed
									strings={[
										'Come say hello',
										'Ven a saludar',
										'Kom sê hallo',
										'Vieni a salutare',
										'Komm sag hallo',
										'Ελάτε να πείτε γεια',
										'E hele mai e aloha mai',
										'Dicere salve veni',
										'Venha dizer olá'
									]}
									typeSpeed={100}
									backSpeed={100}
									loop
								/>
							</p>
						</MDBCol>
					</MDBRow>
					<MDBRow>
						<MDBCol md="12">
							<p>
								<span>
									<strong>email:</strong>
								</span>{' '}
								<a className="evro-navy-font contact-link" href="mailto:erosa26@gmail.com">
									erosa26@gmail.com
								</a>
							</p>
						</MDBCol>
					</MDBRow>
					<MDBRow>
						<MDBCol md="12">
							<p>
								<span>
									<strong>phone:</strong>
								</span>{' '}
								<a className="evro-navy-font contact-link" href="tel:1-571-762-1956">
									571-762-1956
								</a>
							</p>
						</MDBCol>
					</MDBRow>
					<MDBRow className="pt-3">
						<MDBCol>
							<a data-outbound="outbound-social-linkedin" href="https://www.linkedin.com/in/evan-rosa/" target="_blank" rel="noopener noreferrer" className="li-ic mr-4">
								<MDBIcon size="2x" fab icon="linkedin-in" />
							</a>
							<a data-outbound="outbound-social-github" href="https://github.com/evan-rosa" target="_blank" rel="noopener noreferrer" className="git-ic mr-4">
								<MDBIcon size="2x" fab icon="github" />
							</a>
							<a
								data-outbound="outbound-social-stackoverflow"
								href="https://stackoverflow.com/users/5672482/evro?tab=profile"
								target="_blank"
								rel="noopener noreferrer"
								className="so-ic mr-4"
							>
								<MDBIcon size="2x" fab icon="stack-overflow" />
							</a>
							<a data-outbound="outbound-social-slack" href="https://evro-io.slack.com" target="_blank" rel="noopener noreferrer" className="slack-ic mr-4">
								<MDBIcon size="2x" fab icon="slack" />
							</a>
							<a data-outbound="outbound-social-instagram" href="https://www.instagram.com/_evro/" target="_blank" rel="noopener noreferrer" lassName="ins-ic mr-4">
								<MDBIcon size="2x" fab icon="instagram" />
							</a>
						</MDBCol>
					</MDBRow>
				</MDBContainer>
				<div className="map-fit">
					<City className="dc-map" />
				</div>
				<MDBContainer className="pt-5 pb-5">
					<MDBRow>
						<MDBCol md="12">
							<h2>Ask me anything!</h2>
						</MDBCol>
					</MDBRow>
					<MDBRow>
						<MDBCol md="12">
							<ContactForm />
						</MDBCol>
					</MDBRow>
				</MDBContainer>
				<Foot />
			</div>
		);
	}
}

export default ContactPage;

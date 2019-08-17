import React from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBIcon } from 'mdbreact';
import { Link } from 'react-router-dom';
import FeatureForm from './formFeature';

import { ReactComponent as Sky } from '../assets/img/svg/dc-skyline.svg';

import axios from 'axios';
import { Helmet } from 'react-helmet'


class HomePage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			id: [],
			title: [],
			search_description: [],
			canonical: [],
			h_one: [],
			h_one_span: [],
			content: []
		};
		this.getData = this.getData.bind(this);
	}
	getData() {
		const url = `api/v2/pages/?type=home.HomePage&fields=*`;
		axios
			.get(url)
			.then((res) => {
				this.setState({
					id: res.data.items[0].id,
					title: res.data.items[0].meta.seo_title,
					canonical: res.data.items[0].canonical,
					search_description: res.data.items[0].meta.search_description,
					h_one: res.data.items[0].h_one,
					h_one_span: res.data.items[0].h_one_span,
					content: res.data.items[0].content
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
					<script type="application/ld+json">
						{`
							{
								"@context": "http://schema.org/",
								"@type": "Organization",
								"name": "EvRo",
								"url": "https://www.evro.io/",
								"description": "EvRo is the digital web portfolio of Evan Rosa; a web developer, marketer & analyst, & data science pro with expertise in UA architectures and tagging strategies."
							}

						`}
					</script>
				</Helmet>
				<div className="height-inherit-vh parent-wrapper">
					<div className="content pt-5">
						<MDBContainer>
							<MDBRow className="bring-to-front">
								<MDBCol md="7" lg="8" className="mobile-pad">
									<MDBContainer>
										<MDBRow className="pb-3">
											<MDBCol>
												<h1 className="h1">
													<strong>
														{this.state.h_one}
														<span className="evro-red-font"> {this.state.h_one_span}</span>
													</strong>
												</h1>
												<h2 className="h5-responsive line-height">{this.state.content}</h2>
											</MDBCol>
										</MDBRow>
										<MDBRow>
											<MDBCol>
												<a
													href="https://www.linkedin.com/in/evan-rosa/"
													target="_blank"
													rel="noopener noreferrer"
													className="li-ic mr-4"
													aria-label="Evan Rosa's LinkedIn Profile"
													data-outbound="outbound-social-linkedin"
												>
													<MDBIcon size="2x" fab icon="linkedin-in" />
												</a>
												<a
													href="https://github.com/evan-rosa"
													target="_blank"
													rel="noopener noreferrer"
													className="git-ic mr-4"
													aria-label="Evan Rosa's GitHub Profile"
													data-outbound="outbound-social-github"
												>
													<MDBIcon size="2x" fab icon="github" />
												</a>
												<a
													href="https://stackoverflow.com/users/5672482/evro?tab=profile"
													target="_blank"
													rel="noopener noreferrer"
													className="so-ic mr-4"
													aria-label="Evan Rosa's Stack Overflow Profile"
													data-outbound="outbound-social-stackoverflow"
												>
													<MDBIcon size="2x" fab icon="stack-overflow" />
												</a>
												<a
													href="https://evro-io.slack.com"
													target="_blank"
													rel="noopener noreferrer"
													className="slack-ic mr-4"
													aria-label="Evan Rosa's Slack Profile"
													data-outbound="outbound-social-slack"
												>
													<MDBIcon size="2x" fab icon="slack" />
												</a>
												<a
													href="https://www.instagram.com/_evro/"
													target="_blank"
													rel="noopener noreferrer"
													className="ins-ic mr-4"
													aria-label="Evan Rosa's Instagram Profile"
													data-outbound="outbound-social-instagram"
												>
													<MDBIcon size="2x" fab icon="instagram" />
												</a>
											</MDBCol>
										</MDBRow>
										<MDBRow>
											<MDBCol>
												<Link to="/about-evan-rosa" data-internal="internal-learn-about-evan">
													<MDBBtn outline className="evro-navy-btn">
														Learn More About Evan Rosa
													</MDBBtn>
												</Link>
											</MDBCol>
										</MDBRow>
									</MDBContainer>
								</MDBCol>
								<MDBCol md="5" lg="4" className="mb-4">
									<FeatureForm />
								</MDBCol>
							</MDBRow>
						</MDBContainer>
					</div>

					<div className="child-wrapper">
						<Sky className="home-hero" />
					</div>
				</div>
			</div>
		);
	}
}

export default HomePage;

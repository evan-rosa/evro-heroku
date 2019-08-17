import React from 'react';
import { Link } from 'react-router-dom';
import { MDBContainer, MDBRow, MDBCol, MDBSimpleChart, MDBCard, MDBBtn, MDBCardBody } from 'mdbreact';
import Foot from './Foot';

import '../index.css';

import axios from 'axios';
import { Helmet } from 'react-helmet';



class About extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			id: [],
			title: [],
			search_description: [],
			canonical: [],
			about_p: [],
			about_skill_web_development_col_one: [],
			about_skill_web_development_col_two: [],
			about_skill_digital_marketing: [],
			about_skill_web_analytics_col_one: [],
			about_skill_web_analytics_col_two: [],
			about_skill_data_science_col_one: [],
			about_skill_data_science_col_two: [],
			about_education: [],
			resume: []
		};
		this.getData = this.getData.bind(this);
	}
	getData() {
		const url = `/api/v2/pages/?type=about.AboutPage&fields=*`;
		const resume = `/api/v2/documents/`;
		axios
			.get(url)
			.then((res) => {
				this.setState({
					id: res.data.items[0].id,
					title: res.data.items[0].meta.seo_title,
					search_description: res.data.items[0].meta.search_description,
					canonical: res.data.items[0].canonical,
					about_p: res.data.items[0].about_p,
					about_skill_web_development_col_one: res.data.items[0].about_skill_web_development_col_one,
					about_skill_web_development_col_two: res.data.items[0].about_skill_web_development_col_two,
					about_skill_digital_marketing: res.data.items[0].about_skill_digital_marketing,
					about_skill_web_analytics_col_one: res.data.items[0].about_skill_web_analytics_col_one,
					about_skill_web_analytics_col_two: res.data.items[0].about_skill_web_analytics_col_two,
					about_skill_data_science_col_one: res.data.items[0].about_skill_data_science_col_one,
					about_skill_data_science_col_two: res.data.items[0].about_skill_data_science_col_two,
					about_education: res.data.items[0].about_education
				});
			})
			.catch((error) => this.setState({ error }));
		axios
			.get(resume)
			.then((res) => {
				this.setState({
					id: res.data.items[0].id,
					resume: res.data.items[0].meta.download_url
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
								"@context": "https://schema.org",
								"@type": "Person",
								"name": "Evan Rosa",
								"image": "https://s3.amazonaws.com/evro-io/images/profile-pic.original.jpg",
								"jobTitle": "Senior Web Analytics Consultant and Data Engineer",
								"description": "Evan Rosa is a web developer, digital marketer & analyst, and data science professional. His expertise lies in building web applications with React.js and Django, creating digital marketing strategies, and building out analytics & tagging architectures with Google Marketing Platform. He currently works as a lead web analytics federal contractor based in the Washington D.C. metro area.",
								"alumniOf": [
									{
									"@type": "CollegeOrUniversity",
									"name": "Western New England University",
									"sameAs": "https://www1.wne.edu/"
									},
									{
									"@type": "CollegeOrUniversity",
									"name": "General Assembly",
									"sameAs": "https://generalassemb.ly/"
									}
								],
								"url": "https://www.evro.io",
									"sameAs" : [
										"https://www.linkedin.com/in/evan-rosa/"
							    	]
							}

						`}
					</script>
				</Helmet>
				<MDBContainer className="pb-5">
					<MDBRow className="pt-5">
						<MDBCol md="12">
							<h1 className="h1">About Evan Rosa</h1>
							<p className="h5-responsive">{this.state.about_p}</p>
						</MDBCol>
					</MDBRow>

					<MDBRow>
						<MDBCol md="12 pb-5">
							<a href={this.state.resume} data-internal="internal-resume-download">
								<MDBBtn outline className="evro-navy-btn">
									Download my Resume
								</MDBBtn>
							</a>
						</MDBCol>
					</MDBRow>

					<MDBRow className="pb-2">
						<MDBCol md="12">
							<h2 className="h2-responsive font-weight-normal">Skills and Techniques</h2>
						</MDBCol>
					</MDBRow>

					<MDBRow>
						<MDBCol lg="6" md="12" className="mb-4">
							<MDBCard id="skill-web-dev">
								<MDBCardBody>
									<MDBRow className="card-section-pad">
										<MDBCol md="3">
											<MDBSimpleChart
												width={100}
												height={100}
												strokeWidth={10}
												percent={80}
												strokeColor="#e2282e"
											/>
										</MDBCol>
										<MDBCol md="9">
											<h3 className="skill-category h2-responsive">Web Development</h3>
										</MDBCol>
									</MDBRow>

									<MDBRow className="skill-list">
										<MDBCol md="6">
											<div
												dangerouslySetInnerHTML={{
													__html: this.state.about_skill_web_development_col_one
												}}
											/>
										</MDBCol>
										<MDBCol md="6">
											<div
												dangerouslySetInnerHTML={{
													__html: this.state.about_skill_web_development_col_two
												}}
											/>
										</MDBCol>
									</MDBRow>
								</MDBCardBody>
							</MDBCard>
						</MDBCol>

						<MDBCol lg="6" md="12" className="mb-lg-0 mb-4">
							<MDBCard id="skill-mk">
								<MDBCardBody>
									<MDBRow className="card-section-pad">
										<MDBCol md="3">
											<MDBSimpleChart
												width={100}
												height={100}
												strokeWidth={10}
												percent={90}
												strokeColor="#e2282e"
											/>
										</MDBCol>
										<MDBCol md="9">
											<h3 className="skill-category h2-responsive">Digital Marketing</h3>
										</MDBCol>
									</MDBRow>

									<MDBRow className="skill-list">
										<MDBCol md="6">
											<div
												dangerouslySetInnerHTML={{
													__html: this.state.about_skill_digital_marketing
												}}
											/>
										</MDBCol>
									</MDBRow>
								</MDBCardBody>
							</MDBCard>
						</MDBCol>

						<MDBCol lg="6" md="12" className="mb-lg-0 mb-4">
							<MDBCard id="skill-analytics">
								<MDBCardBody>
									<MDBRow className="card-section-pad">
										<MDBCol md="3">
											<MDBSimpleChart
												width={100}
												height={100}
												strokeWidth={10}
												percent={90}
												strokeColor="#e2282e"
											/>
										</MDBCol>
										<MDBCol md="9">
											<h3 className="skill-category h2-responsive">Digital Analytics</h3>
										</MDBCol>
									</MDBRow>

									<MDBRow className="skill-list">
										<MDBCol md="6">
											<div
												dangerouslySetInnerHTML={{
													__html: this.state.about_skill_web_analytics_col_one
												}}
											/>
										</MDBCol>
										<MDBCol md="6">
											<div
												dangerouslySetInnerHTML={{
													__html: this.state.about_skill_web_analytics_col_two
												}}
											/>
										</MDBCol>
									</MDBRow>
								</MDBCardBody>
							</MDBCard>
						</MDBCol>

						<MDBCol lg="6" md="12" className="mb-lg-0 mb-4">
							<MDBCard id="skill-ds">
								<MDBCardBody>
									<MDBRow className="card-section-pad">
										<MDBCol md="3">
											<MDBSimpleChart
												width={100}
												height={100}
												strokeWidth={10}
												percent={70}
												strokeColor="#e2282e"
											/>
										</MDBCol>
										<MDBCol md="9">
											<h3 className="skill-category h2-responsive">Data Science</h3>
										</MDBCol>
									</MDBRow>

									<MDBRow className="skill-list">
										<MDBCol md="6">
											<div
												dangerouslySetInnerHTML={{
													__html: this.state.about_skill_data_science_col_one
												}}
											/>
										</MDBCol>
										<MDBCol md="6">
											<div
												dangerouslySetInnerHTML={{
													__html: this.state.about_skill_data_science_col_two
												}}
											/>
										</MDBCol>
									</MDBRow>
								</MDBCardBody>
							</MDBCard>
						</MDBCol>
					</MDBRow>

					<hr />

					<MDBRow>
						<MDBCol md="12">
							<h2 className="h2-responsive font-weight-normal" id="skill-edu">
								Education, Training, and Certifications
							</h2>
						</MDBCol>
					</MDBRow>
					<MDBRow className="skill-list">
						<MDBCol md="12">
							<div dangerouslySetInnerHTML={{ __html: this.state.about_education }} />
						</MDBCol>
					</MDBRow>
					<MDBRow>
						<MDBCol md="12">
							<Link to={`/contact`} data-internal="internal-contact-button">
								<MDBBtn outline className="evro-navy-btn">
									Contact
								</MDBBtn>
							</Link>
						</MDBCol>
					</MDBRow>
				</MDBContainer>
				<Foot />
			</div>
		);
	}
}

export default About;

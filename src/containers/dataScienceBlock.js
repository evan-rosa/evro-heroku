import React from 'react';
import Foot from '../components/Foot';

import { MDBContainer, MDBRow, MDBCol, MDBBtn } from 'mdbreact';
import '../index.css';
import axios from 'axios';
import { Helmet } from 'react-helmet';


class dsBlock extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			dsProject: {}
		};
		this.getData = this.getData.bind(this);
	}
	getData() {
		const projectID = this.props.match.params.projectID;
		const dsProjectApi = `/api/v2/pages/${projectID}/?type=projects.DsProjectsPage&fields=*`;
		const dsData = `/api/ds/`;

		axios
			.get(dsProjectApi)
			.then((res) => {
				this.setState({
					dsProject: res.data,
					image: res.data.ds_image_url.url,
					title: res.data.meta.seo_title,
					search_description: res.data.meta.search_description,
				});
			})
			.catch((error) => this.setState({ error }));
		axios
			.get(dsData)
			.then((res) => {
				this.setState({
					dsData: res.data.items,
				});
			})
			.catch((error) => this.setState({ error }));
		console.log(this.state.dsData);
		console.log(this.state.dsProject);
	}

	componentDidMount() {
		this.getData();
	}
	render() {
		return (
			<div>
				<Helmet>
					<title>{this.state.title}</title>
					<link rel="canonical" href={this.state.dsProject.project_canonical} />
					<meta name="description" content={this.state.search_description} />
				</Helmet>
				<div className="asymmetric-down">
					<MDBContainer className="pt-5 d-flex flex-nowrap">
						<MDBRow className="pb-5">
							<MDBCol lg="12">
								<h1 className="h1">{this.state.dsProject.h_one}</h1>
								<p>{this.state.dsProject.problem_statement}</p>
							</MDBCol>
							<MDBCol lg="12">
								<img src={this.state.ds_image} alt={this.state.dsProject._img_alt} className="img-fluid z-depth-5" />
							</MDBCol>
						</MDBRow>
					</MDBContainer>
				</div>
				<div className="asymmetric-up">
					<MDBContainer>
						<MDBRow className="pb-5 pt-5">
							<MDBCol lg="12">
								<h2 className="h5-responsive">{this.state.dsProject.h_two_eda}</h2>
								<p>{this.state.dsProject.eda_description}</p>
							</MDBCol>
						</MDBRow>
					</MDBContainer>
				</div>

				<Foot />
			</div>
		);
	}
}

export default dsBlock;

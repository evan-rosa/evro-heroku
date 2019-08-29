import React from 'react';
import Foot from './Foot';

import { MDBContainer, MDBRow, MDBCol } from 'mdbreact';
import '../index.css';
import axios from 'axios';
import { Helmet } from 'react-helmet'


import ProjectsList from '../containers/projectsList';
import DsList from '../containers/dsList';


class ProjectIndexPage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			webProject: [],
			dsProject: []
		};
		this.getData = this.getData.bind(this);
	}
	getData() {
		const projectUrl = `/api/v2/pages/?type=projects.ProjectsPage&fields=*`;
		const dataScienceUrl = `/api/v2/pages/?type=projects.DsProjectsPage&fields=*`;
		const projectIndexUrl = `/api/v2/pages/?type=project_index.ProjectIndexPage&fields=*`;
		axios
			.get(projectUrl)
			.then((res) => {
				this.setState({
					webProject: res.data.items,
				});
			})
			.catch((error) => this.setState({ error }));
		axios
			.get(dataScienceUrl)
			.then((res) => {
				this.setState({
					dsProject: res.data.items,
				});
			})
			.catch((error) => this.setState({ error }));
		axios
			.get(projectIndexUrl)
			.then((res) => {
				this.setState({
					project_h1: res.data.items[0].project_h1,
					project_p: res.data.items[0].project_p,
					title: res.data.meta.seo_title,
					search_description: res.data.meta.search_description,
					canonical: res.data.items[0].canonical
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
					<title>Evan Rosa's Web Portfolio | EvRo.io</title>
					<link rel="canonical" href={this.state.canonical} />
					<meta name="description" content="A sample of Evan Rosa's web portfolio." />
				</Helmet>
				<MDBContainer className="pt-5">
					<MDBRow className="pb-3">
						<MDBCol md="12">
							<h1 className="h1">{this.state.project_h1}</h1>
							<p className="h5-responsive">{this.state.project_p}</p>
						</MDBCol>
					</MDBRow>
					<MDBRow>
						<MDBCol md="12">
							<ProjectsList data={this.state.webProject} />
							{/*<DsList data={this.state.dsProject} />*/}
						</MDBCol>
					</MDBRow>
				</MDBContainer>
				<Foot />
			</div>
		);
	}
}

export default ProjectIndexPage;

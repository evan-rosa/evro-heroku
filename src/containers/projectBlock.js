import React from 'react';
import Foot from '../components/Foot';

import { MDBPagination, MDBPageItem, MDBPageNav, MDBContainer, MDBRow, MDBCol, MDBBtn } from 'mdbreact';
import ReactPaginate from 'react-paginate';
import '../index.css';
import axios from 'axios';
import { Helmet } from 'react-helmet';


class ProjectBlock extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			webProject: {}
		};
		this.getData = this.getData.bind(this);
	}
	getData() {
		const projectID = this.props.match.params.projectID;
		const url = `/api/v2/pages/${projectID}/?type=projects.ProjectsPage&fields=*`;
		axios
			.get(url)
			.then((res) => {
				this.setState({
					webProject: res.data,
					image: res.data.project_image_url.url,
					title: res.data.meta.seo_title,
					search_description: res.data.meta.search_description,
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
					<link rel="canonical" href={this.state.webProject.project_canonical} />
					<meta name="description" content={this.state.search_description} />
				</Helmet>
				<MDBContainer className="pt-5 d-flex flex-nowrap desk-margin">
					<MDBRow className="pb-5">
						<MDBCol md="12" lg="6" className="order-lg-1 mobile-pad">
							<h1 className="h1">{this.state.webProject.project_h_one}</h1>
							<h2 className="h5-responsive">{this.state.webProject.project_h_two}</h2>
							<p>{this.state.webProject.project_intro_p}</p>
							<a data-outbound="outbound-see-project" href={this.state.webProject.project_url} target="_blank" rel="noopener noreferrer">
								<MDBBtn outline className="evro-navy-btn">
									See Project
								</MDBBtn>
							</a>
						</MDBCol>
						<MDBCol md="12" lg="6" className="order-lg-2 mobile-pad">
							<img src={this.state.image} alt={this.state.webProject.project_img_alt} className="img-fluid z-depth-5" />
						</MDBCol>
						<MDBCol md="12" lg="12" className="order-lg-3 desk-absolute">
							<h2 className="h2-responsive font-weight-normal">Site Released</h2>
							<p>{this.state.webProject.project_p}</p>
							<h2 className="h2-responsive font-weight-normal">Technologies and Services</h2>
							<div
								dangerouslySetInnerHTML={{ __html: this.state.webProject.project_tech_stack_description }}
							/>

							{/* Pagination
							<MDBPagination circle>
								<MDBPageItem disabled>
									<MDBPageNav className="page-link">
										<span>First</span>
									</MDBPageNav>
								</MDBPageItem>
								<MDBPageItem disabled>
									<MDBPageNav className="page-link" aria-label="Previous">
										<span aria-hidden="true">&laquo;</span>
										<span className="sr-only">Previous</span>
									</MDBPageNav>
								</MDBPageItem>
								<MDBPageItem active>
									<MDBPageNav className="page-link">
										1 <span className="sr-only">(current)</span>
									</MDBPageNav>
								</MDBPageItem>
								<MDBPageItem>
									<MDBPageNav className="page-link">
										&raquo;
            						</MDBPageNav>
								</MDBPageItem>
								<MDBPageItem>
									<MDBPageNav className="page-link">
										Last
            						</MDBPageNav>
								</MDBPageItem>
							</MDBPagination>
							 */}

						</MDBCol>
					</MDBRow>
				</MDBContainer>
				<Foot />
			</div>
		);
	}
}

export default ProjectBlock;

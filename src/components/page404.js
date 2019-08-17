import React from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBBtn } from 'mdbreact';
import { Link } from 'react-router-dom';

import { ReactComponent as Sky } from '../assets/img/svg/dc-skyline.svg';

class Page404 extends React.Component {
	render() {
		return (
			<div className="height-inherit-vh parent-wrapper">
				<div className="content pt-5 text-center">
					<MDBContainer>
						<MDBRow className="bring-to-front">
							<MDBCol md="12" className="mobile-pad">
								<MDBContainer>
									<MDBRow className="pb-3">
										<MDBCol>
											<h1 className="h1">404 - Page Not Found</h1>
											<h2 className="h5-responsive line-height">
												Maybe you're looking for something else?
											</h2>
										</MDBCol>
									</MDBRow>

									<MDBRow>
										<MDBCol>
											<Link to={`/`} data-internal="internal-home">
												<MDBBtn outline className="evro-navy-btn">
													Back To Home Page
												</MDBBtn>
											</Link>
										</MDBCol>
									</MDBRow>
								</MDBContainer>
							</MDBCol>
						</MDBRow>
					</MDBContainer>
				</div>

				<div className="child-wrapper">
					<Sky className="home-hero" />
				</div>
			</div>
		);
	}
}

export default Page404;

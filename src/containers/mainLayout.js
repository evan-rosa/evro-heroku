import React from 'react';
import { MDBContainer, MDBRow, MDBCol } from 'mdbreact';
import '../index.css';

const mainLayout = () => {
	return (
		<MDBContainer className="layout-space">
			<MDBRow>
				<MDBCol md="4">.col-md-4</MDBCol>
				<MDBCol md="4">.col-md-4</MDBCol>
				<MDBCol md="4">.col-md-4</MDBCol>
			</MDBRow>
		</MDBContainer>
	);
};

export default mainLayout;

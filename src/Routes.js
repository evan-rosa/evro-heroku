import React from 'react';
import { Route, Switch } from 'react-router-dom';

import HomePage from './components/HomePage';
import ProjectsIndex from './components/projectsIndex';
import webProject from './containers/projectBlock';
import dsProject from './containers/dataScienceBlock';
import About from './components/About';
import Contact from './components/contact';
import Thanks from './components/thankyou';
import Page404 from './components/page404';

class Routes extends React.Component {
	render() {
		return (
			<Switch>
				<Route exact path="/" component={HomePage} />
				<Route exact path="/about-evan-rosa" component={About} />
				<Route exact path="/portfolio" component={ProjectsIndex} />
				<Route exact path="/contact-evan-rosa" component={Contact} />
				<Route exact path="/contact/thank-you" component={Thanks} />
				<Route exact path="/portfolio/web/:projectID/:slug" component={webProject} />
				{/*	<Route exact path="/portfolio/data-science/:projectID/:slug" component={dsProject} /> */}
				<Route component={Page404} />
			</Switch>
		);
	}
}

export default Routes;

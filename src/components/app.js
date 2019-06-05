import { h, Component } from 'preact';
import { Router } from 'preact-router';

import BikeTour from '../routes/bike-tour';
import BikeTourResults from '../routes/bike-tour-results';
import BikeTourInfo from '../routes/bike-tour-info';
import Error from '../routes/error';
import Header from '../components/header';
//import { get, set, del } from '../utils/idb-keyval';

export default class App extends Component {
	state = {
		isHome: true
	};
	
	handleRoute = async e => {
		if (e.url === '/') {
			this.setState({isHome:true});
		} else {
			this.setState({isHome:false});
		}
		if(typeof window !== 'undefined' && typeof document !== 'undefined' && window) {
			window.scrollTo(0,0);
		}
	};
	
	render() {
		return (
			<div id="app">
				<Header ishome={this.state.isHome} />
				<Router onChange={this.handleRoute.bind(this)}>
					<BikeTourInfo path="/" />
					<BikeTour path="/gatochfietsen" />
					<BikeTourResults path="/vragenlijst" />
					<Error type="404" default />
				</Router>
			</div>
		);
	}
}

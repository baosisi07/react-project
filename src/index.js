import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PCIndex from "./js/components/pc_index.js";
import PCNewsDetails from './js/components/pc_news_details.js';
import MobileIndex from "./js/components/mobile_index.js";
import registerServiceWorker from './registerServiceWorker';
import MediaQuery from "react-responsive";
import './css/pc.css';
import "./css/mobile.css";
import { Route, BrowserRouter, Link, Switch } from 'react-router-dom';
class Index extends Component {
    render() {
        return (
            <div className = "App" >
        	<MediaQuery query='(min-device-width:1224px)'>
        		<BrowserRouter>
        			<Switch>
        				<Route exact path='/' component={PCIndex}></Route>
        				<Route path='/details/:uniquekey' component={PCNewsDetails}></Route>
        			</Switch>
        		</BrowserRouter>
        	</MediaQuery>
            <MediaQuery query='(max-device-width:1224px)'>
        		<MobileIndex></MobileIndex>	
        	</MediaQuery>	
            </div>
        );
    }
}

ReactDOM.render(< Index / >, document.getElementById('root'));
registerServiceWorker();
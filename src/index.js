import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PCIndex from "./js/components/pc_index";
import PCNewsDetails from './js/components/pc_news_details';
import PCUsercenter from './js/components/pc_usercenter';
import MobileIndex from "./js/components/mobile_index";
import MobileNewsDetails from "./js/components/mobile_news_details";
import MobileUsercenter from "./js/components/mobile_usercenter";
import registerServiceWorker from './registerServiceWorker';
import MediaQuery from "react-responsive";
import './css/pc.css';
import "./css/mobile.css";
import { Route, BrowserRouter, Switch } from 'react-router-dom';
class Index extends Component {
    render() {
        return (
            <div className = "App" >
        	<MediaQuery query='(min-device-width:1224px)'>
        		<BrowserRouter>
        			<Switch>
        				<Route exact path='/' component={PCIndex}></Route>
        				<Route path='/details/:uniquekey' component={PCNewsDetails}></Route>
        				<Route path='/usercenter' component={PCUsercenter}></Route>
        			</Switch>
        		</BrowserRouter>
        	</MediaQuery>
            <MediaQuery query='(max-device-width:1224px)'>
            <BrowserRouter>
        			<Switch>
        				<Route exact path='/' component={MobileIndex}></Route>
        				<Route path='/details/:uniquekey' component={MobileNewsDetails}></Route>
        				<Route path='/usercenter' component={MobileUsercenter}></Route>
        			</Switch>
        		</BrowserRouter>
        	</MediaQuery>	
            </div>
        );
    }
}

ReactDOM.render(< Index / >, document.getElementById('root'));
registerServiceWorker();
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PCIndex from "./js/components/pc_index.js"
import registerServiceWorker from './registerServiceWorker';
import './css/pc.css';
class Root extends Component {
    render() {
        return ( 
        	<div className = "App" >
            	<PCIndex></PCIndex>	
            </div>
        );
    }
}

ReactDOM.render( < Root / > , document.getElementById('root'));
registerServiceWorker();
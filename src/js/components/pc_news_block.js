import React, { Component } from 'react';
import { Row, Col, Tabs, Card } from 'antd';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
const TabPane = Tabs.TabPane;

class PCNewsBlock extends Component {
    constructor() {
        super();
        this.state = {
            news: ""
        }
    }
    componentWillMount() {
        let myFetchOptions = {
            method: 'GET'
        }
        fetch('http://newsapi.gugujiankong.com/Handler.ashx?action=getnews&type=' + this.props.type + '&count=' + this.props.count, myFetchOptions)
            .then(response => response.json())
            .then(json => this.setState({
                news: json
            }))

    }
    render() {
        const {news} = this.state;
        const newsList = news.length ?
            news.map((newsItem, index) => (
                <li key={index}>
                    <Link to={`details/${newsItem.uniquekey}`} target="_blank">
                    {newsItem.title}
                </Link>
              
                
            </li>
            ))
            : "没有相关新闻";
        return (
            <Router>
                <Card bordered={false} className="listCard">
                    <ul className="newsList">{newsList}</ul>
                </Card>
            </Router>
        )
    }
}
export default PCNewsBlock;
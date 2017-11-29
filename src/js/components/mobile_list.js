import React, { Component } from 'react';
import { Row, Col, Tabs } from 'antd';
import { Router, Route, Link, browserHistory } from 'react-router-dom';
const TabPane = Tabs.TabPane;

class MobileList extends Component {
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
                <section key={index} className='newsListItem'>
                <a href="" className='ant-row'>
                    <div className='newsListImg'>
                        <img src={newsItem.thumbnail_pic_s} alt={newsItem.title}/>
                    </div>
                    <div className='newsListInfo'>
                        <div className='newsListTitle'>{newsItem.title}</div>
                        <div className='newsListDesc'>
                            <span className='newsSource'>{newsItem.realtype}</span>
                            <span className='newsTime'>{newsItem.date}</span>
                        </div>
                    </div>
                </a>
              </section>
            ))
            : "没有相关新闻";
        return (
            <div>
                <Row>
                <Col span={24} style={{
                padding: '0 2%',
                marginTop: '-10px'
            }}>{newsList}
                </Col>
                </Row>
            </div>
        )
    }
}
export default MobileList;
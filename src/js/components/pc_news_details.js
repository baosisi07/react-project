import React, { Component } from 'react';
import { Row, Col, BackTop } from 'antd';
import { Route, BrowserRouter as Router, Link } from 'react-router-dom';
import PCHeader from "./pc_header";
import PCFooter from "./pc_footer";
import PCNewsImagesBlock from './pc_news_imagesBlock';
class PCNewsDetails extends Component {
    constructor() {
        super();
        this.state = {
            newsItem: ''
        }
    }

    componentDidMount() {
        var myFetchOptions = {
            method: 'GET'
        };
        fetch('http://newsapi.gugujiankong.com/Handler.ashx?action=getnewsitem&uniquekey=' + this.props.match.params.uniquekey, myFetchOptions)
            .then(reponse => reponse.json())
            .then(json => {
                this.setState({
                    newsItem: json
                });
                document.title = this.state.newsItem.title + '-react新闻平台';
            })
    }
    createDetailCon() {
        return {
            __html: this.state.newsItem.pagecontent
        }
    }
    render() {
        return (
            <div>
				<PCHeader></PCHeader>
				<Row>
					<Col span={2}></Col>
					<Col span={14}>
						<div className='articleContent' dangerouslySetInnerHTML={this.createDetailCon()}></div>
					</Col>
					<Col span={6}>
						<PCNewsImagesBlock type="yule" count="6" title='娱乐新闻' imgWidth='50%' width="100%"></PCNewsImagesBlock>
					</Col>
					<Col span={2}></Col>
				</Row>
            	<PCFooter></PCFooter>
            	<BackTop />
			</div>
        )
    }
}
export default PCNewsDetails;
import React, { Component } from 'react';
import { Row, Col, Tabs, Card } from 'antd';
import { Link } from 'react-router-dom';
const TabPane = Tabs.TabPane;

class PCNewsImagesBlock extends Component {
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
        const styleImg = {
            display: 'block',
            width: '100%',
            height: '90px'
        };

        const styleH3 = {
            lineHeight: '26px',
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis'
        };
        const {news} = this.state;
        const newsList = news.length ?
            news.map((newsItem, index) => (
                <div key={index} className='imgListWrapper' style={{
                    width: this.props.imgWidth
                }}>
                 <Link to={`/details/${newsItem.uniquekey}`} target="_blank">
                    <div className='customImg'>
                        <img alt='' style={styleImg} src={newsItem.thumbnail_pic_s}/>
                    </div>
                    <div className='customCard'>
                        <h3 style={styleH3}>{newsItem.title}</h3>
                        <p style={styleH3}>{newsItem.author_name}</p>
                    </div>
                </Link>
                     
                </div>
            ))
            : "没有相关新闻";
        return (
            <div>
                <Card bordered={true} title={this.props.title} className="cardPadding" style={{
                width: this.props.width,
                marginTop: '10px'
            }}>
                {newsList}   
                </Card>
            </div>
        )
    }
}
export default PCNewsImagesBlock;
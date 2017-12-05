import React, { Component } from 'react';
import { Row, Col, BackTop } from 'antd';
import MobileHeader from "./mobile_header";
import MobileFooter from "./mobile_footer";
class MobileNewsDetails extends Component {
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
        console.log(this.props.match.params);
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
            <div id="mobile">
                <MobileHeader></MobileHeader>
                <Row>

                    <Col span={24}>
                        <div className='articleContent' dangerouslySetInnerHTML={this.createDetailCon()}></div>
                    </Col>
                  
                </Row>
                <MobileFooter></MobileFooter>
                <BackTop />
            </div>
        )
    }
}
export default MobileNewsDetails;
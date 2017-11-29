import React, { Component } from 'react';
import { Row, Col, Tabs, Carousel } from 'antd';
import PCNewsBlock from './pc_news_block';
import PCNewsImagesBlock from './pc_news_imagesBlock';
import PCProducts from './pc_product';
const TabPane = Tabs.TabPane;
class PCNewsContainer extends Component {
    render() {
        return (
            <div>
				<Row>
					<Col span={2}></Col>
					<Col span={20}>
					<div className="ant-row container">
						<div className="leftContainer">
						<Carousel autoplay>
						    <div><img src='/images/1.png'/></div>
						    <div><img src='/images/2.png'/></div>
						    <div><img src='/images/3.png'/></div>
						    <div><img src='/images/4.png'/></div>
						  </Carousel>
						  <PCNewsImagesBlock type="yule" count="6" title='娱乐新闻' imgWidth='33.3%' width="400px"></PCNewsImagesBlock>
						</div>
						<div className="ant-row rightContainer">
							<div className="r_leftContent">
								<Tabs defaultActiveKey="1">
								    <TabPane tab="头条新闻" key="1">
								    	<PCNewsBlock type="top" count="20"></PCNewsBlock>
								    </TabPane>
								    <TabPane tab="国内" key="2">
								    <PCNewsBlock type="guonei" count="18"></PCNewsBlock>
								    </TabPane> 
								  </Tabs>
							</div>
							<div className="r_rightContent">
								<PCProducts></PCProducts>
							</div>
						</div>

					</div>
					<div>
						<PCNewsImagesBlock type="guonei" count="16" title='国内新闻' imgWidth='12.5%' width="100%"></PCNewsImagesBlock>
						<PCNewsImagesBlock type="keji" count="24" title='科技新闻' imgWidth='12.5%' width="100%"></PCNewsImagesBlock>
						</div>
					</Col>
					<Col span={2}></Col>
				</Row>
				
			</div>
        )
    }
}
export default PCNewsContainer;
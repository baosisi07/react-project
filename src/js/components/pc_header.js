import React, { Component } from 'react';
import { Row, Col } from 'antd';
import { Menu, Icon } from 'antd';
// const SubMenu = Menu.SubMenu;
// const MenuItemGroup = Menu.ItemGroup;
class PCHeader extends Component {
	constructor(){
		super();
		this.state={
			currentItem:"news",
			icon:"./images/news.png"
		};
	}
    render() {
        return ( 
        	<div>
            	<Row>
			      <Col span={2}></Col>
			      <Col span={4}>
			      <a href="" className="logo">
			      <img src={[this.state.icon]} alt="logo" />
			      <span>reactNews</span>
			      </a>	
			    </Col>
			    <Col span={12}>
					<Menu mode="horizontal"  selectedKeys={[this.state.currentItem]}>
						<Menu.Item key="news">
				          <Icon type="mail" />新闻
				        </Menu.Item>
				        <Menu.Item key="home">
				          <Icon type="home" />国内
				        </Menu.Item>
				        <Menu.Item key="international">
				          <Icon type="mail" />国际
				        </Menu.Item>
				        <Menu.Item key="entertainment">
				          <Icon type="mail" />娱乐
				        </Menu.Item>
				        <Menu.Item key="fashion">
				          <Icon type="mail" />时尚
				        </Menu.Item>
				        <Menu.Item key="sport">
				          <Icon type="mail" />体育
				        </Menu.Item>
				        <Menu.Item key="society">
				          <Icon type="mail" />社会
				        </Menu.Item>
					</Menu>
			    </Col>
			      <Col span={2}></Col>
			    </Row>
            </div>
        );
    }
}
 export default PCHeader;
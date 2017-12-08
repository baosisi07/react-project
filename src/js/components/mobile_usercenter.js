import React, { Component } from 'react';
import { Row, Col, Tabs } from 'antd';
import MobileHeader from "./mobile_header";
import MobileFooter from "./mobile_footer";
const TabPane = Tabs.TabPane;
class MobileUsercenter extends Component {
    constructor() {
        super();
        this.state = {

        }
    }
    render() {
        return (
            <div id="mobile">
                <MobileHeader></MobileHeader>
                <Row>
                    <Col span={24}>
                        <Tabs defaultActiveKey="1" tabPosition="top">
                          <TabPane tab="我的收藏列表" key="1">Content of tab 1</TabPane>
                          <TabPane tab="我的评论列表" key="2">Content of tab 2</TabPane>
                          <TabPane tab="头像设置" key="3">Content of tab 3</TabPane>
                        </Tabs>
                      </Col>
                </Row>
                <MobileFooter></MobileFooter>
            </div>
        )
    }
}
export default MobileUsercenter;
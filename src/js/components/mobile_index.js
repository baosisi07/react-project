import React, { Component } from 'react';
import MobileHeader from "./mobile_header";
import MobileFooter from "./mobile_footer";
import MobileNewsList from "./mobile_list";
import { Tabs, Carousel } from 'antd';
import img1 from '../../images/1.png';
import img2 from '../../images/2.png';
import img3 from '../../images/3.png';
import img4 from '../../images/4.png';
const TabPane = Tabs.TabPane;
class MobileIndex extends Component {
    render() {
        return (
            <div id="mobile">
                <MobileHeader></MobileHeader>
                <Tabs>
                  <TabPane tab="头条" key="1"><Carousel  autoplay>
                            <div><img src={img1} alt=''/></div>
                            <div><img src={img2} alt=''/></div>
                            <div><img src={img3} alt=''/></div>
                            <div><img src={img4} alt=''/></div>
                          </Carousel>

                          <MobileNewsList count='10' type='top'></MobileNewsList></TabPane>
                  <TabPane tab="国内" key="2"><MobileNewsList count='10' type='guonei'></MobileNewsList></TabPane>
                  <TabPane tab="国际" key="3"><MobileNewsList count='10' type='guoji'></MobileNewsList></TabPane>
                  <TabPane tab="娱乐" key="4"><MobileNewsList count='10' type='yule'></MobileNewsList></TabPane>
                  <TabPane tab="体育" key="6"><MobileNewsList count='10' type='tiyu'></MobileNewsList></TabPane>
                  <TabPane tab="社会" key="7"><MobileNewsList count='10' type='shehui'></MobileNewsList></TabPane>
                  <TabPane tab="科技" key="8"><MobileNewsList count='10' type='keji'></MobileNewsList></TabPane>
                </Tabs>
                <MobileFooter></MobileFooter>
            </div>
        );
    }
}
export default MobileIndex;
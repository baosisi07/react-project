import React, { Component } from 'react';
import { Row, Col, Tabs, Upload, Icon, Modal } from 'antd';
import PCHeader from "./pc_header";
import PCFooter from "./pc_footer";
const TabPane = Tabs.TabPane;
class PCUsercenter extends Component {
    constructor() {
        super();
        this.state = {
            previewVisible: false,
            previewImage: '',
            fileList: [{
                uid: -1,
                name: 'xxx.png',
                status: 'done',
                url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
            }],
        }

    }
    handleCancel = () => this.setState({
        previewVisible: false
    })

    handlePreview = (file) => {
        this.setState({
            previewImage: file.url || file.thumbUrl,
            previewVisible: true,
        });
    }

    handleChange = ({fileList}) => this.setState({
        fileList
    })

    render() {
        const {previewVisible, previewImage, fileList} = this.state;
        const uploadButton = (
        <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
        );
        return (
            <div>
    			<PCHeader></PCHeader>
                <Row  className="userCenter">
                    <Col span={2}></Col>
                    <Col span={20}>
                    	<Tabs defaultActiveKey="1" tabPosition="left">
				          <TabPane tab="我的收藏列表" key="1">Content of tab 1</TabPane>
				          <TabPane tab="我的评论列表" key="2">Content of tab 2</TabPane>
				          <TabPane tab="头像设置" key="3">
				          	<div className="clearfix">
						        <Upload
            action="//jsonplaceholder.typicode.com/posts/"
            listType="picture-card"
            fileList={fileList}
            onPreview={this.handlePreview}
            onChange={this.handleChange}
            >
						          {fileList.length >= 3 ? null : uploadButton}
						        </Upload>
						        <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
						          <img alt="example" style={{
                width: '100%'
            }} src={previewImage} />
						        </Modal>
						      </div>
				          </TabPane>
				        </Tabs>
                      </Col>
                    <Col span={2}></Col>
                </Row>
                <PCFooter></PCFooter>
    		</div>
        )
    }
}
export default PCUsercenter;
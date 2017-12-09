import React, { Component } from 'react';
import { Row, Col, Tabs, Upload, Card, Icon, Modal } from 'antd';
import PCHeader from "./pc_header";
import PCFooter from "./pc_footer";
const TabPane = Tabs.TabPane;
class PCUsercenter extends Component {
    constructor() {
        super();
        this.state = {
            userCollection: '',
            userComment: '',
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
    componentDidMount() {
        var myFetchOption = {
            method: 'GET'
        };
        fetch('http://newsapi.gugujiankong.com/Handler.ashx?action=getuc&userid=' + localStorage.userId, myFetchOption)
            .then(response => response.json())
            .then(json => {

                this.setState({
                    userCollection: json
                });
            })

        fetch('http://newsapi.gugujiankong.com/Handler.ashx?action=getusercomments&userid=' + localStorage.userId, myFetchOption)
            .then(response => response.json())
            .then(json => {

                this.setState({
                    userComment: json
                });
            })
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
        const {userCollection, userComment} = this.state;
        const collectionList = userCollection.length ?
            userCollection.map((cl, index) => (
                <Card style={{
                    marginBottom: '5px'
                }} key={index} title={cl.uniquekey} extra={<a target="_blank" href={`/details/${cl.uniquekey}`}>查看新闻详情</a>}>
                <p>{cl.Title}</p>	
                </Card>
            ))
            :
            "暂时没有收藏内容！";
        const commentList = userComment.length ?
            userComment.map((ucl, index) => (
                <Card style={{
                    marginBottom: '5px'
                }} key={index} title={`于 ${ucl.datetime} 评论了文章 ${ucl.uniquekey}`} extra={<a target="_blank" href={`/details/${ucl.uniquekey}`}>查看新闻详情</a>}>
                <p>{ucl.Comments}</p>	
                </Card>
            ))
            :
            "暂时没有评论过任何新闻！";
        return (
            <div>
    			<PCHeader></PCHeader>
                <Row  className="userCenter">
                    <Col span={2}></Col>
                    <Col span={20}>
                    	<Tabs defaultActiveKey="1" tabPosition="left">
				          <TabPane tab="我的收藏列表" key="1">{collectionList}</TabPane>
				          <TabPane tab="我的评论列表" key="2">{commentList}</TabPane>
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
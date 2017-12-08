import React, { Component } from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import { Row, Col } from 'antd';
import { Menu, Card, Tabs, Icon, Dropdown, message, Form, Input, Button, CheckBox } from 'antd';
const FormItem = Form.Item;
const TabPane = Tabs.TabPane;
class CommonComments extends Component {
    constructor() {
        super();
        this.state = {
            comments: ""
        }
    }

    componentDidMount() {
        var myFetchOptions = {
            method: 'GET'
        };
        fetch('http://newsapi.gugujiankong.com/Handler.ashx?action=getcomments&uniquekey=' + this.props.uniquekey, myFetchOptions)
            .then(reponse => reponse.json())
            .then(json => {
                this.setState({
                    comments: json
                });

            })
    }
    submitHandler(e) {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                var myFetchOptions = {
                    method: 'GET'
                };
                var formData = this.props.form.getFieldsValue();
                fetch('http://newsapi.gugujiankong.com/Handler.ashx?action=comment&userid=' + localStorage.userId + '&uniquekey=' + this.props.uniquekey + '&commnet=' + formData.remark, myFetchOptions)
                    .then(reponse => reponse.json())
                    .then(json => {
                        this.componentDidMount();
                        this.props.form.setFields({
                            remark: {
                                value: ""
                            },
                        });
                    })
            }
        });

    }
    addArticle() {
        var myFetchOptions = {
            method: 'GET'
        };
        message.config({
            top: 100,
            duration: 2,
        });
        var formData = this.props.form.getFieldsValue();
        fetch('http://newsapi.gugujiankong.com/Handler.ashx?action=uc&userid=' + localStorage.userId + '&uniquekey=' + this.props.uniquekey + '&commnet=' + formData.remark, myFetchOptions)
            .then(reponse => reponse.json())
            .then(json => {
                message.success("收藏此文章成功！");
            })
    }
    render() {
        let {getFieldDecorator} = this.props.form;
        const {comments} = this.state;
        const commentsList = comments.length ?
            comments.map((comItem, index) => (
                <div key={index} className='commentItem'>
                <h3 className='ant-row'><span><Icon type="message" /><span className='commentName'>{comItem.UserName}</span> 评论</span><span className='commentTime'>{comItem.datetime}</span></h3> 
        	<p>{comItem.Comments}</p></div>
            ))
            : "还没有任何评论！"
        return (
            <div>
				<Row>
					<Col span={24}>
					<div className='commentBox'>{commentsList}</div>
					<Form layout="horizontal" className='commentForm' onSubmit={this.submitHandler.bind(this)}>
						<FormItem label="您的评论">
                                {getFieldDecorator("remark", {
                rules: [{
                    required: true,
                    message: '请输入评论后提交！',
                }],
            })(<Input type="textarea" placeholder="请留言……"/>)}    
                                </FormItem>
                                <Button type="primary" htmlType="submit">提交</Button>
                                <Button type="primary" htmlType="button" onClick={this.addArticle.bind(this)}>收藏此文章</Button>
					</Form>
					</Col>
				</Row>
			</div>
        )
    }
}

export default CommonComments = Form.create({})(CommonComments);
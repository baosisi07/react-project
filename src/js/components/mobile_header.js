import React, { Component } from 'react';
import { Router, Route, Link, browserHistory } from 'react-router-dom';
import { Row, Col } from 'antd';
import { Menu, Icon, Tabs, Modal, Dropdown, message, Form, Input, Button, CheckBox } from 'antd';
const FormItem = Form.Item;
const TabPane = Tabs.TabPane;
class MobileHeader extends Component {
    constructor() {
        super();
        this.state = {
            currentItem: ["news"],
            modalVisible: false,
            action: "login",
            hasLogined: false,
            userNickName: "",
            userId: 0,
            icon: "./images/news.png"
        };
    }
    componentWillMount() {
        if (localStorage.userId != "") {
            this.setState({
                hasLogined: true,
                userNickName: localStorage.userNickName,
                userId: localStorage.userId
            });
        }
    }
    handleSubmit(e) {
        e.preventDefault();
        var myFetchOptions = {
            method: 'GET'
        };
        var formData = this.props.form.getFieldsValue();
        console.log(formData);
        fetch('http://newsapi.gugujiankong.com/Handler.ashx?action=' + this.state.action + '&username=' + formData.username + '&password=' + formData.password + '&r_userName=' + formData.b_username + '&r_password=' + formData.b_password + '&r_confirmPassword=' + formData.b_cpassword).then(response => response.json()
        ).then(json => {
            this.setState({
                userNickName: json.NickUserName,
                userId: json.UserId
            });
            localStorage.userNickName = this.state.userNickName;
            localStorage.userId = this.state.userId;
        });
        if (this.state.action == "login") {
            this.setState({
                hasLogined: true
            });
            message.success("登录成功！");
        } else {
            message.success("注册成功！");
        }
        this.setModalVisible();

    }
    setModalVisible() {
        this.setState({
            modalVisible: false
        })
    }
    setCurrent(e) {
        this.setState({
            currentItem: [e.key]
        });
        if (e.key == "register") {
            this.setState({
                modalVisible: true
            });
        }
    }
    login() {
        this.setState({
            modalVisible: true
        })
    }
    callback(key) {
        if (key == 1) {
            this.setState({
                action: "login"
            });
        } else {
            this.setState({
                action: "register"
            });
        }
    }
    logout() {
        localStorage.userNickName = "";
        localStorage.userId = "";
        this.setState({
            hasLogined: false
        });
    }
    render() {
        let {getFieldDecorator} = this.props.form;
        const dorpmenu = (
        <Menu>
            <Menu.Item>
              <a target="_blank" rel="noopener noreferrer">个人中心</a>
            </Menu.Item>
            <Menu.Item>
              <a target="_blank" rel="noopener noreferrer" onClick={this.logout.bind(this)}>退出</a>
            </Menu.Item>
            
          </Menu>
        );
        const userShow = this.state.hasLogined ?
            <Dropdown overlay={dorpmenu}>
            <a className="ant-dropdown-link">
            {this.state.userNickName}<Icon type="down" />   
            </a>
            </Dropdown>
            :
            <a target="_blank" onClick={this.login.bind(this)}><Icon type="key" /></a>;
        return (
            <header>
            <img className="logoImg" src={this.state.icon}  alt=""/>
            <span className="apptitle">react新闻平台</span>
            {userShow}
            <Modal title="用戶中心"visible={this.state.modalVisible} wrapClassName="center-modal" onOk={this.setModalVisible.bind(this)} onCancel={this.setModalVisible.bind(this)} okText="确定" cancelText="取消"> 
                      <Tabs defaultActiveKey="1" onChange={this.callback.bind(this)}>
                        <TabPane tab="登录" key="1">
                             <Form layout="horizontal" onSubmit={this.handleSubmit.bind(this)}> 
                                <FormItem>
                                {getFieldDecorator("username")(<Input prefix={<Icon type="user" style={{
                fontSize: 14
            }} />} placeholder="账号"/>)}
                                    
                                </FormItem>
                                <FormItem>
                                {getFieldDecorator("password")(<Input prefix={<Icon type="lock" style={{
                fontSize: 14
            }} />} type="password" placeholder="密码"/>)}
                                    
                                </FormItem>
                                <Button type="primary" htmlType="submit" className="login-form-button">
                                登录
                              </Button>
                            </Form>
                        </TabPane>
                        <TabPane tab="注册" key="2">
                            <Form layout="horizontal" onSubmit={this.handleSubmit.bind(this)}> 
                                <FormItem>
                                {getFieldDecorator("b_username")(<Input prefix={<Icon type="user" style={{
                fontSize: 14
            }} />} placeholder="账号"/>)}
                                    
                                </FormItem>
                                <FormItem>
                                {getFieldDecorator("b_password")(<Input prefix={<Icon type="lock" style={{
                fontSize: 14
            }} />} type="password" placeholder="密码"/>)}
                                    
                                </FormItem>
                                <FormItem>
                                {getFieldDecorator("b_cpassword")(<Input prefix={<Icon type="lock" style={{
                fontSize: 14
            }} />} type="password" placeholder="确认密码"/>)}
                                    
                                </FormItem>
                                <FormItem>
                                <Button type="primary" htmlType="submit">
                                注册
                              </Button>
                              </FormItem>
                            </Form>
                        </TabPane>
                        
                      </Tabs>   
                    </Modal>
            </header>
        );
    }
}
export default MobileHeader = Form.create()(MobileHeader);
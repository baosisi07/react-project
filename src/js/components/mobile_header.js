import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Menu, Icon, Tabs, Modal, Dropdown, message, Form, Input, Button } from 'antd';
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
            icon: "/images/news.png"
        };
    }
    componentWillMount() {
        if (localStorage.userId != "" && localStorage.userId != undefined) {
            this.setState({
                hasLogined: true,
                userNickName: localStorage.userNickName,
                userId: localStorage.userId
            });
        }
    }
    handleSubmit(e) {
        e.preventDefault();
        let validItem = [];
        if (this.state.action == "login") {
            validItem = ['username', 'password'];

        } else {
            validItem = ['b_username', 'b_password', 'b_cpassword'];

        }
        this.props.form.validateFields(validItem, (err, values) => {
            if (!err) {
                var myFetchOptions = {
                    method: 'GET'
                };
                var formData = this.props.form.getFieldsValue();
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
        });

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
              <Link to={`/usercenter`} rel="noopener noreferrer">个人中心</Link>
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
            <Link to={`/`}><img className="logoImg" src={this.state.icon}  alt=""/>
            <span className="apptitle">react新闻平台</span></Link>
            
            {userShow}
            <Modal title="用戶中心"visible={this.state.modalVisible} wrapClassName="center-modal" onOk={this.setModalVisible.bind(this)} onCancel={this.setModalVisible.bind(this)} footer={null}> 
                      <Tabs defaultActiveKey="1" onChange={this.callback.bind(this)}>
                        <TabPane tab="登录" key="1">
                             <Form layout="horizontal" onSubmit={this.handleSubmit.bind(this)}> 
                                <FormItem>
                                {getFieldDecorator("username", {
                rules: [{
                    required: true,
                    message: '请输入用户名',
                }],
            })(<Input prefix={<Icon type="user" style={{
                fontSize: 14
            }} />} placeholder="账号"/>)}
                                    
                                </FormItem>
                                <FormItem>
                                {getFieldDecorator("password", {
                rules: [{
                    required: true,
                    message: '请输入密码',
                }],
            })(<Input prefix={<Icon type="lock" style={{
                fontSize: 14
            }} />} type="password" placeholder="密码"/>)}
                                    
                                </FormItem>
                                <FormItem>
                                <Button type="primary" htmlType="submit" className="bigBtn login-form-button">
                                登录
                              </Button>
                              </FormItem>
                            </Form>
                        </TabPane>
                        <TabPane tab="注册" key="2">
                            <Form layout="horizontal" onSubmit={this.handleSubmit.bind(this)}> 
                                <FormItem>
                                {getFieldDecorator("b_username", {
                rules: [{
                    required: true,
                    message: '请输入用户名',
                }],
            })(<Input prefix={<Icon type="user" style={{
                fontSize: 14
            }} />} placeholder="账号"/>)}
                                    
                                </FormItem>
                                <FormItem>
                                {getFieldDecorator("b_password", {
                rules: [{
                    required: true,
                    message: '请输入密码',
                }],
            })(<Input prefix={<Icon type="lock" style={{
                fontSize: 14
            }} />} type="password" placeholder="密码"/>)}
                                    
                                </FormItem>
                                <FormItem>
                                {getFieldDecorator("b_cpassword", {
                rules: [{
                    required: true,
                    message: '请输入确认密码',
                }],
            })(<Input prefix={<Icon type="lock" style={{
                fontSize: 14
            }} />} type="password" placeholder="确认密码"/>)}
                                    
                                </FormItem>
                                <FormItem>
                                <Button type="primary" className="bigBtn login-form-button" htmlType="submit">
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
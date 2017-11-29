import React, { Component } from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import { Row, Col } from 'antd';
import { Menu, Icon, Tabs, Modal, Dropdown, message, Form, Input, Button, CheckBox } from 'antd';
const FormItem = Form.Item;
const TabPane = Tabs.TabPane;
// const SubMenu = Menu.SubMenu;
// const MenuItemGroup = Menu.ItemGroup;
class PCHeader extends Component {
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
        fetch('http://newsapi.gugujiankong.com/Handler.ashx?action=' + this.state.action + '&username=' + formData.username + '&password=' + formData.password + '&r_userName=' + formData.b_username + '&r_password=' + formData.b_password + '&r_confirmPassword=' + formData.b_cpassword, myFetchOptions).then(response => response.json()
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
            <Router>
              <Link to={`/usercenter`} target="_blank" rel="noopener noreferrer">个人中心</Link>
            </Router>
            </Menu.Item>
            <Menu.Item>
              <a target="_blank" rel="noopener noreferrer" onClick={this.logout.bind(this)}>退出</a>
            </Menu.Item>
            
          </Menu>
        );
        const userShow = this.state.hasLogined ? (<Menu.Item key="logout" className="register"> 
             <Dropdown overlay={dorpmenu}>
            <a className="ant-dropdown-link">
            <Icon type="user" />{this.state.userNickName}<Icon type="down" />   
            </a>
            </Dropdown>
        </Menu.Item>)
            :
            (<Menu.Item key="register" className="register"><Icon type="key" />登录/注册</Menu.Item>);
        return (
            <header>
                <Row>
                  <Col span={2}></Col>
                  <Col span={4}>
                  <a href="" className="logo">
                  <img src={this.state.icon} alt="logo" />
                  <span>react新闻平台</span>
                  </a>  
                </Col>
                <Col span={16}>
                    <Menu mode="horizontal" onClick={this.setCurrent.bind(this)}  selectedKeys={this.state.currentItem}>
                        <Menu.Item key="news">
                          <Icon type="mail" />头条
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
                        <Menu.Item key="technology">
                          <Icon type="mail" />科技
                        </Menu.Item>
                        {userShow}
                    </Menu>
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
                </Col>
                     <Col span={2}></Col>
                </Row>
            </header>
        );
    }
}
export default PCHeader = Form.create()(PCHeader);
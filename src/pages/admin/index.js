import React, {Component } from 'react';
import {Link} from 'react-router-dom';
import {getItem} from '../../utils/storage';

import {Spin,message,Layout} from 'antd'
import data from '../../utils/store';
import {reqValidateUser} from "../../api";
import './index.less';
import logo from '../../assets/images/logo.png'

import  LeftNav from '../../components/left-nav'
import HeaderMain from '../../components/header-main'


const { Header, Content, Footer, Sider } = Layout;


class Admin extends Component{
  state = {
    isLoading:true,
    collapsed: false,
    isDisplay: 'block'
  };

  checkUserLogin=()=>{
    // console.log(data.user._id);
    // 判断内存有没有数据
    if (!data.user._id) {
      // 判断本地有没有数据
      const user = getItem();
      if (!user){
        // 内存和本地都没有值, 返回登录页面
        this.props.history.replace('/login');
        return true;
      }
     // 验证用户信息是否合法
      reqValidateUser(user._id)
        .then(()=>{
          // 验证通过。存在内存中，在使用
          data.user = user;
          // 更新状态，显示admin页面
          this.setState({
            isLoading:false
          })
        })
        .catch(()=>{
          //错误提示
          message.error('请先登录',3);
          //验证失败
          this.props.history.replace('/login');
        });
      // 需要loading
      return true
    }else {
      //不需要loading
      return false
    }
  };
  // 展开菜单项
  onCollapse = (collapsed) =>{
    this.setState({
      collapsed,
      isDisplay:collapsed ? 'none' : 'block'
    })
  };
  render() {
    // 登录验证
      const isLoading = this.checkUserLogin();

    if (isLoading) return <Spin className="admin-loading" tip="loading...." size="large"/> ;


    // console.log(path);
    const {isDisplay,collapsed} = this.state;

    return  <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={this.onCollapse}>

        <Link to="/home" className="admin-logo">
          <img src={logo} alt="logo"/>
          <h1 style={{display:isDisplay}}>硅谷后台</h1>
        </Link>

        <LeftNav/>

      </Sider>
      <Layout>
        <Header style={{ background: '#fff', padding: 0 }} >
          <HeaderMain/>
        </Header>
        <Content style={{  margin: '65px 16px 0 16px' }}>
          {/*<Breadcrumb style={{ margin: '16px 0' }}>*/}
          {/*  /!*<Breadcrumb.Item>User</Breadcrumb.Item>*!/*/}
          {/*  /!*<Breadcrumb.Item>Bill</Breadcrumb.Item>*!/*/}
          {/*</Breadcrumb>*/}
          <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>Bill is a cat.</div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
      </Layout>
    </Layout>
  }
}
export default Admin;
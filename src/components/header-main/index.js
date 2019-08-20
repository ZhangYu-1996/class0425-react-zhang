import React, {Component } from 'react';
import {withRouter} from 'react-router-dom';
import {Button,Modal,message} from 'antd';
import './index.less';
import {removeItem} from '../../utils/storage';
import data from '../../utils/store';
import {reqWeather} from '../../api/index';
import dayjs from 'dayjs';
import {menuList} from '../../config/index'
const {confirm} = Modal ;



class HeaderMain extends Component{
  constructor(){
    super();
    this.state={
      title:'',
      time:this.getTime(),
      weather:'晴',
      dayPictureUrl:'http://api.map.baidu.com/images/weather/day/qing.png'
    }
  }

//退出登录
  logout=()=>{
    confirm({
      title: '您确定退出吗?',
      okText:'确认',
      cancelText:'取消',
      onOk:()=> {
        data.user={};
        removeItem();
        this.props.history.replace('/login');
        message.success('退出成功',3)
      },
    });
  };

  //初始化和更新都会走的生命周期函数
  static getDerivedStateFromProps(nextProps,prevState) {
    let {pathname} = nextProps.location;

    // if (pathname === '/') {
    //   return {
    //     title: '首页'
    //   }
    // }
    if (pathname.startsWith('/product')) {
      pathname = '/product'
    }
    //生成title
    for (let i = 0; i < menuList.length; i++) {
      const menu = menuList[i];
      if (menu.children) {
        const children = menu.children;
        for (let j = 0; j <children.length; j++) {
         const cMenu = children[j];
          if (cMenu.key === pathname) {
            return {
              title:cMenu.title
            }
          }
        }
      }else {
        if (menu.key === pathname) {
          return {
            title: menu.title
          }
        }
      }
    }
    // 默认返回值, 如果以上都不匹配，会被跳转到/home
    return {
      title: '首页'
    }
  }
  //获取时间
  getTime=()=> dayjs(Date.now()).format('YYYY/MM/DD  hh/mm/ss');

  //更新时间和天气
componentDidMount() {
  this.timer=setInterval(()=>{
    this.setState({
      time:this.getTime()
    })
  },1000);

  reqWeather('深圳')
    .then((res)=>{
      message.success('请求天气成功',2);
      this.setState(res)
    })
    .catch((err)=>{
      message.error(err,3);
    })
  }

  //请计时器
  componentWillUnmount() {
  clearInterval(this.timer)
  }

  render() {
    const {time,weather,dayPictureUrl,title} = this.state;
    return  <div className="header-main">

      <div className="header-main-top">
        <span>欢迎,{data.user.username}</span>
        <Button type="link" onClick={this.logout}>退出</Button>
      </div>
      <div className="header-main-bottom">
        <h3>{title}</h3>
        <div>
          <span>{time}</span>
          <img src={dayPictureUrl} alt="weather"/>
          <span>{weather}</span>
        </div>
      </div>
    </div>
  }
}
export default withRouter(HeaderMain);
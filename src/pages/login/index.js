import React, {Component } from 'react';
import { Form, Input, Icon, Button,message } from 'antd';
import logo from "./logo.png";
import './index.less'
import reqLogin from '../../api';
import data from '../../utils/store'
import {setItem} from '../../utils/storage'

const Item = Form.Item;

class Login extends Component{

  validator = (rule,value,callback) =>{
    // console.log(rule,value);
    const name = rule.field === 'username' ? '用户名' : '密码';
    const passwordReg =/^\w+$/;
      if (!value) {
        callback('输入不能为空')
      } else if (value.length<4) {
        callback(`${name}长度必须大于4位`);
      }else if (value.length>10) {
        callback(`${name}长度必须小于10位`);
      }else if(!passwordReg.test(value)){
        callback(`${name}只能包含英文、数字、下划线`);
      }

    callback();
  };

  login = (e)=>{
    e.preventDefault();
    this.props.form.validateFields((err,value)=>{
      if (!err){
        const {username,password} = value;
        reqLogin(username,password)
          .then((response)=>{
            //请求成功
            console.log(response);
            //提升请求成功
            message.success('登录成功~',3);
            //存储用户数据到内存中
            data.user=response;
            //存储用户数据到本地中
            setItem(response);

            // 跳转到admin页面 -- 修改url地址为 /
            // 编程式导航
            this.props.history.replace('/')

            })
          .catch((error)=>{
            //请求失败
            message.error(error,3);
            //重置密码
            this.props.form.resetFields(['password']);
          })
      }
    })
  };

  render() {
    const { getFieldDecorator } = this.props.form;

      return <div className="login">
      <header className="login-header">
        <img src={logo} alt="logo"/>
        <h1>React项目: 后台管理系统</h1>
      </header>
      <section className="login-section">
        <h2>用户登录</h2>
        <Form onSubmit={this.login}>
          <Item>
            {/*{*/}
            {/*  getFieldDecorator('username',{*/}
            {/*    rules:[*/}
            {/*      {required: true,*/}
            {/*        message: '请输入用户名'*/}
            {/*      },*/}
            {/*      {*/}
            {/*        min:4,*/}
            {/*        message:'用户名长度必须大于4位'*/}
            {/*      },*/}
            {/*      {*/}
            {/*        max:10,*/}
            {/*        message:'用户名长度必须小于10位'*/}
            {/*      },*/}
            {/*      {*/}
            {/*        pattern:/^\w+$/,*/}
            {/*        message:'用户名只能包含英文、数字、下划线'*/}
            {/*      }*/}
            {/*    ]*/}
            {/*})(*/}
            {/*    <Input prefix={<Icon type="user" />} placeholder="用户名"/>*/}
            {/*  )*/}
            {/*}*/}
            {
              getFieldDecorator(
                'username', // input的标识，今后获取input的值，就从username
                {
                  rules: [ // 表单校验规则
                    { validator: this.validator }
                  ]
                }
              )(
                <Input prefix={<Icon type="user" />} placeholder="用户名"/>
              )
            }
          </Item>
          <Item>
            {
              getFieldDecorator(
                'password',
                {
                  rules:[
                    {validator:this.validator}
                  ]
                }
              )(
                <Input prefix={<Icon type="lock" />} placeholder="密码" type='password'/>
              )
            }
          </Item>
          <Item>
            <Button type="primary" htmlType="submit" className="login-btn">登录</Button>
          </Item>
        </Form>
      </section>
    </div>;
  }
}
//
// const newLogin = Form.create()(Login);
// export default newLogin;
export default Form.create()(Login);
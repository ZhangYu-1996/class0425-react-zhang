import React, {Component } from 'react';
import { Form, Input, Icon, Button,message } from 'antd';
import logo from "./logo.png";
import './index.less'
import axios from 'axios';

const Item = Form.Item;
class Login extends Component{
  validator = (rule,value,callback) =>{
    // console.log(rule,value);
    const passwordReg =/^\w+$/;
      if (!value) {
        callback('输入不能为空')
      } else if (value.length<4) {
        callback('密码长度必须大于4位');
      }else if (value.length>10) {
        callback('密码长度必须小于10');
      }else if(!passwordReg.test(value)){
        callback('只能包含英文、数字、下划线');
      }
    callback();
  };

  login = (e)=>{
    e.preventDefault();
    this.props.form.validateFields((err,value)=>{
      if (!err){
        axios.post('http://localhost:3000/login',value)
          .then((response)=>{
            const result = response.data;
            if (result.status === 0) {
              message.success('登录成功~',3)
            } else{
              message.error(result.msg,3);
              this.props.form.resetFields(['password']);
            }
          })
          .catch((error)=>{
            message.error('登陆失败，网络出现异常',3);
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
            {
              getFieldDecorator('username',{
                rules:[
                  {required: true,
                    message: '请输入用户名'
                  },
                  {
                    min:4,
                    message:'用户名长度必须大于4位'
                  },
                  {
                    max:10,
                    message:'用户名长度必须小于10位'
                  },
                  {
                    pattern:/^\w+$/,
                    message:'用户名只能包含英文、数字、下划线'
                  }
                ]
            })(
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

const newLogin = Form.create()(Login);
export default newLogin;
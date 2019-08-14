import React, {Component } from 'react';
import {Redirect} from 'react-router-dom';

import {getItem} from '../../utils/storage';

import data from '../../utils/store';

class Admin extends Component{

  render() {
    // 判断内存有没有数据
   if (!data.user._id) {
     // 判断本地有没有数据
     const user = getItem();
     if (!user){
       return <Redirect to='/login'/>;
     }
     // 如果内存没有值但本地有值，先存在内存中，在使用
     data.user = user;
   }


    return  <div>
      admin
    </div>
  }
}
export default Admin;
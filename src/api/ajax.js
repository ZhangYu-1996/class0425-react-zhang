import axios from 'axios';
/*
  需求：
    1. 开发环境使用 http://localhost:3000  生产环境使用 http://localhost:5000
    2. 成功由then触发 失败由catch触发
    3. 成功只需要成功的数据  失败只需要失败的错误信息
 */

//区别开发环境和生产环境
// console.log(process.env.NODE_ENV);
const  BASE_URL = process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'http://localhost:5000';
// 创建axios的实例
const axiosInstance = axios.create({
  baseURL:BASE_URL,
  timeout:10000,
});

axiosInstance.interceptors.response.use(
  //响应成功的回调
  (response) =>{
    const resule = response.data;

    if (resule.status === 0) {
      // 请求成功
      // 默认返回的成功的promise
      return resule.data || {};
    } else {
      // 请求失败
      // 默认返回的失败的promise
      return Promise.reject(resule.msg || '请求失败~~~~');
    }
  },
  // 响应失败的回调
  // 默认返回的成功的promise
  (error) =>{
    console.log('请求失败~', error);
    return Promise.reject('网络出现故障，请刷新试试~');
  }
);

export default axiosInstance;


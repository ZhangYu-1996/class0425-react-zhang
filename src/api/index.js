import  axiosInstance  from './ajax'

const reqLogin = (username,password) => axiosInstance.post('/login',{username,password});

export default reqLogin;
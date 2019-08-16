/*
  封装了localStorage的函数模块
 */

const USER_KEY = 'user';

function getItem() {
  return JSON.parse(localStorage.getItem(USER_KEY))
}

//下面的代码片段访问了当前域名下的本地 Storage 对象，并通过 Storage.setItem() 增加了一个数据项目。
function setItem(user) {
  localStorage.setItem(USER_KEY,JSON.stringify(user))
}

function removeItem() {
  localStorage.removeItem(USER_KEY)
}

export {
  setItem,
  getItem,
  removeItem
}
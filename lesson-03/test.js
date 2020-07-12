const Promise = require('./promise.js')


// new Promise(1);     // 不传函数试一下  自定义抛出错误异常
// node test.js 


new Promise((resolve, reject) => {
  console.log('开始啦')
  resolve(1)
})
// node test.js // TypeError: Cannot read property 'state' of undefined
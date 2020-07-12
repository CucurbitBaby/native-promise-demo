const Promise = require('./promise.js')


// new Promise(1);     // 不传函数试一下  自定义抛出错误异常
// node test.js 


new Promise((resolve, reject) => {
  console.log('开始啦')
  resolve(1)
})

// 代码要边写边优化
// 2. 初始化值和resolve/reject提为方法
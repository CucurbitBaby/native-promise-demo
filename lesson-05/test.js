const Promise = require('./promise.js')


// new Promise(1);     // 不传函数试一下  自定义抛出错误异常
// node test.js 


// new Promise((resolve, reject) => {
//   console.log('开始啦')
//   resolve(1)
// })

// 代码要边写边优化
// 2. 初始化值和resolve/reject提为方法


// onFulfilled和onRejected 如果不是函数则忽略是不完全正确的  我们用真实的Promise测试一下
new Promise((resolve, reject) => {
  console.log('开始啦')
  resolve(1)
})
  // .then()
  .then(value => {
    console.log('成功的回调vlaue:', value)        // 依赖输出 
  }, reason => {
    console.log('失败的回调reason:', reason)
  })

const Promise = require('./promise.js')


// new Promise(1);     // 不传函数试一下  自定义抛出错误异常
// node test.js 


// new Promise((resolve, reject) => {
//   console.log('开始啦')
//   resolve(1)
// })

// 代码要边写边优化
// 2. 初始化值和resolve/reject提为方法


// Promise.REJECTED .. 用静态属性 1.替换魔法字符串 2.避免打错字
// new Promise((resolve, reject) => {
//   console.log('开始啦')
//   resolve(1)
// })
//   // .then()      // 这个还未解决
//   .then(value => {
//     console.log('成功的回调vlaue:', value)        // 依赖输出 
//   }, reason => {
//     console.log('失败的回调reason:', reason)
//   })


// 看一下执行顺序的问题
console.log('1')

new Promise((resolve, reject) => {
  console.log('2')
  resolve(1)
})
  // .then()      // 这个还未解决
  .then(value => {
    console.log('4')
    console.log('成功的回调vlaue:', value)        // 依赖输出 
  }, reason => {
    console.log('失败的回调reason:', reason)
  })

  console.log('3')
  // 1 2 4 (成功的回调vlaue: 1) 3

  // 加上setTimeout异步执行解决了 顺序问题
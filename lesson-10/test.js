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


// // 看一下执行顺序的问题
// console.log('1')

// new Promise((resolve, reject) => {
//   console.log('2')
//   resolve(1)
// })
//   // .then()      // 这个还未解决
//   .then(value => {
//     console.log('4')
//     console.log('成功的回调vlaue:', value)        // 依赖输出 
//   }, reason => {
//     console.log('失败的回调reason:', reason)
//   })

//   console.log('3')
//   // 1 2 4 (成功的回调vlaue: 1) 3

// setTimeout 解决了顺序问题

// // 看一下自定义异常
// console.log('1')

// new Promise((resolve, reject) => {
//   // console.log('2')
//   throw new Error('哈哈，我是个自定义异常')
//   resolve(1)
// })
//   // .then()      // 这个还未解决
//   .then(value => {
//     console.log('4')
//     console.log('成功的回调vlaue:', value)        // 依赖输出 
//   }, reason => {
//     console.log('失败的回调reason:', reason)
//   })

//   console.log('3')
//   // 1 3 失败回调Reason: Error: 哈哈，我是个自定义异常



// // 利用callBacks 循环执行
// console.log('1')

// new Promise((resolve, reject) => {
//   setTimeout(() => {
//     console.log('哈哈')
//     resolve(1)
//   })
// })
//   // .then()      // 这个还未解决
//   .then(value => {
//     console.log('4')
//     console.log('成功的回调vlaue:', value)        // 依赖输出 
//   }, reason => {
//     console.log('失败的回调reason:', reason)
//   })

//   console.log('3')
//  // 1 3 哈哈 4 成功回到value: 1


// 实现链式调用
new Promise((resolve, reject) => {
  resolve(1)
})
  // .then()      // 这个还未解决
  .then(value => {
    return '呵呵'+ value
  }, reason => {
    console.log('失败的回调reason:', reason)
  })
  .then(value => {
    console.log('成功的回调22vlaue:', value)        // 依赖输出 
  }, reason => {
    console.log('失败的回调22reason:', reason)
  })
  
  // 成功的回调22vlaue: 呵呵1
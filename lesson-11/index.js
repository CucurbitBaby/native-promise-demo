// 首先看看最基本的原生Promise的使用
// new Promise((resolve, reject) => {
//   setTimeout(() => {
//     resolve(1)
//   })
// }).then(value => {
//   console.log('成功的回调vlaue:', value)
// }, reason => {
//   console.log('失败的回调reason:', reason)
// })

// lesson-01 先实现类
// new Promise((resolve, reject) => {
//   console.log('开始啦')
//   resolve(1)
// })

// 瞅瞅原生Promise构造函数传入的不是函数会发生什么事情  mock它
// new Promise(1)

// onFulfilled和onRejected 如果不是函数则忽略是不完全正确的  我们用真实的Promise测试一下
// new Promise((resolve, reject) => {
//   console.log('开始啦')
//   resolve(1)
// })
//   .then()
//   .then(value => {
//     console.log('成功的回调vlaue:', value)        // 依赖输出 
//   }, reason => {
//     console.log('失败的回调reason:', reason)
//   })


// 看一下执行顺序的问题
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


// // 看一下执行器中的异步操作会咋样
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
//   // 1 3 哈哈 4 成功回到value: 1

// // 看一下链式调用
// new Promise((resolve, reject) => {
//   resolve(1)
// })
//   // .then()      // 这个还未解决
//   .then(value => {
//     return '呵呵'+ value
//   }, reason => {
//     console.log('失败的回调reason:', reason)
//   })
//   .then(value => {
//     console.log('成功的回调22vlaue:', value)        // 依赖输出 
//   }, reason => {
//     console.log('失败的回调22reason:', reason)
//   })
  
//   // 成功的回调22vlaue: 呵呵1


// 实现链式调用  抛出异常
new Promise((resolve, reject) => {
  resolve(1)
})
  // .then()      // 这个还未解决
  .then(value => {
    throw new Error('哈哈 我是自定义错误')
    return '呵呵'+ value
  }, reason => {
    console.log('失败的回调reason:', reason)
  })
  .then(value => {
    console.log('成功的回调22vlaue:', value)        // 依赖输出 
  }, reason => {
    console.log('失败的回调22reason:', reason)
  })
  
  // 失败的回调22reason: Error: 哈哈 我是自定义错误

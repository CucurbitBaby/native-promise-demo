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
new Promise((resolve, reject) => {
  console.log('开始啦')
  resolve(1)
})
  .then()
  .then(value => {
    console.log('成功的回调vlaue:', value)        // 依赖输出 
  }, reason => {
    console.log('失败的回调reason:', reason)
  })

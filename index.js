// 开发过程结合promise/a+规范
// 1. index.js      进行原生的Promise演示
// 2. promise.js    进行自定义的Promise演示
// 3. test.js       是对promise.js进行测试

// new Promise((resolve, reject) => {
//   setTimeout(() => {
//     resolve(1)
//   })
// }).then(value => {
//   console.log('成功的回调vlaue', value)
// }, reason => {
//   console.log('失败的回调reason', reason)
// })


// 先实现类Promise
// new Promise((resolve, reject) => {
//   console.log('开始啦')
//   resolve(1)
// })

// 瞅瞅原生Promise构造函数传入的不是函数会发生什么事情  mock它
// new Promise(1)


// 参数是可选的，如果不是函数必须忽略(忽略不太正确的) 看看原生的怎么处理 => 下一个then依赖处理 并不是完全忽略
// new Promise((resolve, reject) => {
//   console.log('开始啦')
//   resolve(1)
// })
// .then()
// .then(
//   vlaue => {
//     console.log('value:', vlaue)
//   },
//   reason => {
//     console.log('reason:', reason)
//   }
// )


// 看一下执行顺序的问题
console.log('1')
new Promise((resolve, reject) => {
  console.log('2')
  resolve(1)
})
.then(
  vlaue => {
    console.log('4')
    console.log('value:', vlaue)
  },
  reason => {
    console.log('reason:', reason)
  }
)
console.log('3')
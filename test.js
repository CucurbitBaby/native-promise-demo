const Promise = require('./promise.js')

// 像index.js 实例化
// new Promise(1)

// new Promise((resolve, reject) => {
//   console.log('开始啦 目前没什么问题')
//   resolve(1)
// }).then(
//   value => {
//     console.log('执行了resolve', value)
//   },
//   reason => {
//     console.log('执行了reject', reason)
//   }
// )


console.log('1')
new Promise((resolve, reject) => {
  console.log('2')
  resolve(1)
}).then(
  vlaue => {
    console.log('4')
    console.log('value:', vlaue)
  },
  reason => {
    console.log('reason:', reason)
  }
)
console.log('3')
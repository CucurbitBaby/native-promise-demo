const Promise = require('./promise.js')

new Promise((resolve, reject) => {
  console.log('开始啦')
  resolve(1)
})

// node test.js 没什么问题
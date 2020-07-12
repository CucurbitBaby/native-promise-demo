const Promise = require('./promise.js')

new Promise((resolve, reject) => {
  console.log('开始啦')
  resolve(1)
})

// node test.js // TypeError: Cannot read property 'state' of undefined
// debugger     // resolve(1) 作为一个回调函数被执行，它的this指向的是window
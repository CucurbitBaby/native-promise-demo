const Promise = require('./promise.js')


// new Promise(1);     // 不传函数试一下  自定义抛出错误异常

new Promise((resolve, reject) => {
  console.log('开始啦')
  resolve(1)
})

// node test.js // TypeError: Cannot read property 'state' of undefined
// debugger     // resolve(1) 作为一个回调函数被执行，它的this指向的是window
// 首先Promise是一个类
class Promise {
  // 构造函数接收一个参数 => 函数 executor(执行者)
  constructor(executor) {
    // 参数校验 库的开发者不能相信用户的输入
    if (typeof executor !== 'function') {
      
      throw new TypeError(`Promise resolver ${executor} is not a function cyan!`)
    }


    // 初始化值
    this.value = null // 终值
    this.reason = null // 拒因
    this.state = 'pending' // 状态 

    // 定义resolve和reject函数  分别 接受一个终值和拒因
    const resolve = function(value) {
      // 成功后的一系列操作(1.状态的改变,  2.成功回调的执行)
      if(this.state === 'pending') {    
        // 此处debug this === undefied 因为是作为匿名函数去执行的(并无调用者)
        // es6严格模式下就是指向undefiend (review)
        // 所以需要改变this的指向
        this.state = 'fulfilled'
        this.value = value
      }

    }
    const reject = function(reason) {
      // 失败后的一系列操作(1.状态的改变,  2.失败回调的执行)
      if(this.state === 'pending') {
        this.state = 'rejected'
        this.reason = reason
      }
    }

    // resolve和reject函数分别传递给executor执行
    executor(resolve, reject)
  }
}

module.exports = Promise
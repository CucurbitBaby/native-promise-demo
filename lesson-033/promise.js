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
    this.state = 'pending' // 状态 不可以逆(resolve和reject中需要作判断)

    // 定义resolve和reject函数
    const resolve = function(value) {  // 成功后的一系列操作(状态的改变, 成功回调的执行)
      if(this.state === 'pending') {   
        debugger
        this.state = 'fulfilled'       // 状态改变
        this.value = value             // 终值赋值 
        // 由于 promise 有一次性的特征，因此当这个值被传递时，标志着 promise 等待态的结束，故称之终值
      }
    }
    const reject = function(reason) {  // 失败后的一系列操作(状态的改变, 失败回调的执行)
      if(this.state === 'pending') {
        this.state = 'rejected'        // 状态改变
        this.reason = reason           // 终值赋值
        // 由于 promise 有一次性的特征，因此当这个值被传递时，标志着 promise 等待态的结束，故称之终值
      }
    }

    // resolve和reject函数分别传递给executor执行
    executor(resolve, reject)
  }
}

module.exports = Promise
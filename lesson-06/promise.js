// 首先Promise是一个类
class Promise {
  // 构造函数接收一个参数 => 函数 executor(执行者)
  constructor(executor) {
    // 参数校验 库的开发者不能相信用户的输入
    if (typeof executor !== 'function') {

      throw new TypeError(`Promise resolver ${executor} is not a function cyan!`)
    }

    this.initValue()
    this.initBind()
    // resolve和reject函数分别传递给executor执行
    executor(this.resolve, this.reject)
  }

  // 绑定this
  initBind() {
    this.resolve = this.resolve.bind(this)
    this.reject = this.reject.bind(this)
  }

  // 初始化值
  initValue() {
    this.value = null // 终值
    this.reason = null // 拒因
    this.state = Promise.PENDING // 状态 
  }

  // 提取为方法在构造函数中执行 executor(this.resolve, this.reject) 需 bind
  resolve(value) {
    // 成功后的一系列操作(1.状态的改变,  2.成功回调的执行)
    if (this.state === Promise.PENDING) {
      this.state = Promise.FULFILLED
      this.value = value
    }

  }
  reject(reason) {
    // 失败后的一系列操作(1.状态的改变,  2.失败回调的执行)
    if (this.state === Promise.PENDING) {
      this.state = Promise.REJECTED
      this.reason = reason
    }
  }

  then(onFulfilled, onRejected) {
    // 参数校验
    if(typeof onFulfilled !== 'function') {
      onFulfilled = function(value) {
        return value
      }
    }
    if(typeof onRejected !== 'function') {
      onRejected = function(reason) {
        throw reason
      }
    }

    if(this.state === Promise.FULFILLED) {
      onFulfilled(this.value)
    }

    if(this.state === Promise.REJECTED) {
      onRejected(this.reason)
    }

  }

}

Promise.PENDING = 'pending'
Promise.FULFILLED = 'fulfilled'
Promise.REJECTED = 'rejected'

module.exports = Promise
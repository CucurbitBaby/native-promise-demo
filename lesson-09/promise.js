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
    var _this = this;
    try {
      executor(this.resolve, this.reject)
    } catch (e) {
      this.reject(e)
    }

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
    this.onFulfilledCallbacks = []  // 成功回调
    this.onRejectedCallbacks = []  // 失败回调
  }

  // 提取为方法在构造函数中执行 executor(this.resolve, this.reject) 需 bind
  resolve(value) {
    // 成功后的一系列操作(1.状态的改变,  2.成功回调的执行)
    if (this.state === Promise.PENDING) {
      this.state = Promise.FULFILLED
      this.value = value
      this.onFulfilledCallbacks.forEach((fn) => fn(this.value))
    }

  }
  reject(reason) {
    // 失败后的一系列操作(1.状态的改变,  2.失败回调的执行)
    if (this.state === Promise.PENDING) {
      this.state = Promise.REJECTED
      this.reason = reason
      this.onRejectedCallbacks.forEach((fn) => fn(this.reason))
    }
  }

  then(onFulfilled, onRejected) {
    // this.state 等于pending 所以没有执行任何一个回调函数
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
      setTimeout(() => {
        onFulfilled(this.value)
      })
    }

    if(this.state === Promise.REJECTED) {
      setTimeout(() => {
        onRejected(this.reason)
      })
    }
    if(this.state === Promise.PENDING) {
      this.onFulfilledCallbacks.push((value) => {
        setTimeout(() => {
          onFulfilled(value)
        })
      })
      this.onRejectedCallbacks.push((reason) => {
        setTimeout(() => {
          onRejected(reason)
        })
      })

    }
  }

}

Promise.PENDING = 'pending'
Promise.FULFILLED = 'fulfilled'
Promise.REJECTED = 'rejected'

module.exports = Promise
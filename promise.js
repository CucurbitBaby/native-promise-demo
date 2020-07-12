// 构造函数接受一个参数 是一个函数
class Promise {
  constructor(executor) {

    // 库的开发者不能相信用户的输入  参数校验
    if (typeof executor !== 'function') {
      throw new TypeError(`Promise resolver ${executor} is not a function cyan!`)
    }

    // // 初始化值
    // this.value = null // 终值
    // this.reason = null // 拒因
    // this.state = 'pending' // 状态 


    // // 定义resolve和reject函数  分别 接受一个终值和拒因
    // const resolve = function(value) {
    //   // debugger
    //   // 成功后的一系列操作(状态的改变, 成功回调的执行)
    //   if(this.state === 'pending') {
    //     this.state = 'fulfilled'
    //     this.value = value
    //   }

    // }
    // const reject = function(reason) {
    //   // 失败后的一系列操作(状态的改变, 失败回调的执行)
    //   if(this.state === 'pending') {
    //     this.state = 'rejected'
    //     this.reason = reason
    //   }
    // }

    // // 改用箭头函数
    // const resolve = value => {
    //   // debugger
    //   // 成功后的一系列操作(状态的改变, 成功回调的执行)
    //   if (this.state === 'pending') {
    //     this.state = 'fulfilled'
    //     this.value = value
    //   }

    // }
    // const reject = reason => {
    //   // 失败后的一系列操作(状态的改变, 失败回调的执行)
    //   if (this.state === 'pending') {
    //     this.state = 'rejected'
    //     this.reason = reason
    //   }
    // }



    // // resolve和reject函数分别传递给executor执行器执行
    // executor(resolve, reject)

    // oop优化
    this.initValue()
    // executor(this.resolve, this.reject)  // error借用bind()
    this.initBind()

    executor(this.resolve, this.reject) 

  }

  // 绑定 this
  initBind() {
    this.resolve = this.resolve.bind(this)
    this.reject = this.reject.bind(this)
  }

  // 初始化值
  initValue() {
    this.value = null // 终值
    this.reason = null // 拒因
    this.state = Promise.PENADING // 状态 
  }

  // 成功后的一系列操作(状态的改变, 成功回调的执行)
  resolve(value) {
    if (this.state === Promise.PENADING) {
      this.state = Promise.FULFILLED
      this.value = value
    }
  }

  // 失败后的一系列操作(状态的改变, 失败回调的执行)
  reject(reason) {
    if (this.state === Promise.PENADING) {
      this.state = Promise.REJECTED
      this.reason = reason
    }
  }

  // 参数是可选的，如果不是函数必须忽略(忽略不太正确，重新包装了一下)
  then(onFulfilled, onRejected){

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

  }

}

Promise.PENADING = 'pending'
Promise.FULFILLED = 'fulfilled'
Promise.REJECTED = 'rejected'

module.exports = Promise;
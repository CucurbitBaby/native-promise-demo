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

    // onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value;
    // onRejected = typeof onRejected === 'function' ? onRejected : err => { throw err };

    // 实现链式调用，且改变了后面的then方法的值，必须通过新的实例
    let promise2 = new Promise((resolve, reject) => {
      if(this.state === Promise.FULFILLED) {
        setTimeout(() => {
          try {
            const x = onFulfilled(this.value)
            // resolve(x)
            Promise.resolvePromise(promise2, x, resolve, reject);
          } catch (e) {
            reject(e)
          }
        })
      }
  
      if(this.state === Promise.REJECTED) {
        setTimeout(() => {
          try {
            const x = onRejected(this.reason)
            // resolve(x)
            Promise.resolvePromise(promise2, x, resolve, reject);
          } catch (e) {
            reject(e)
          }
        })
      }
      if(this.state === Promise.PENDING) {
        this.onFulfilledCallbacks.push((value) => {
          setTimeout(() => {
            try {
              const x = onFulfilled(value)
              // resolve(x)
              Promise.resolvePromise(promise2, x, resolve, reject);
            } catch (e) {
              reject(e)
            }
          })
        })
        this.onRejectedCallbacks.push((reason) => {
          setTimeout(() => {
            try {
              const x = onRejected(reason)
              // resolve(x)
              Promise.resolvePromise(promise2, x, resolve, reject);
            } catch (e) {
              reject(e)
            }
          })
        })
  
      }
    })

    return promise2


  }

}

Promise.PENDING = 'pending'
Promise.FULFILLED = 'fulfilled'
Promise.REJECTED = 'rejected'
Promise.resolvePromise =  function(promise2, x, resolve, reject ) {
  // resolvePromise 解决了多态和循环调用

  // promise2 === x 
  if(promise2 === x) {
    reject(new TypeError('循环调用了'))
  }
  let called = false
  if(x instanceof Promise) {  // 判断x是否为promise   
    // 如果x处于等待状态 promise需保持等待状态直至x被执行或者拒绝
    // 如果x处于执行状态 用相同的值执行 promise
    // 如果x处于拒绝状态 用相同的拒因拒绝 promise
    // 什么时候执行结束？  .then执行结束啊 小傻瓜
    x.then(value => {
      Promise.resolvePromise(promise2, value, resolve, reject)
    }, reason => {
      reject(reason)
    })
  } else if(x !== null && (typeof x === 'object' || typeof x === 'function')) {  // 判断x是是女朋友还是一等公民
    try {
      const then = x.then
      if (typeof then === 'function') {
        then.call(x, value => {
          if(called) return 
          called = true
          Promise.resolvePromise(promise2, value, resolve, reject)
        }, reason => {
          if(called) return
          called = true
          reject(reason)
        })
      } else {
          if(called) return
          called = true
        resolve(x)
      }
    } catch (e) {
      if(called) return
      called = true
      reject(e)
    }
  } else {  // 群演
    resolve(x)
  }
}

// 第三方测试工具
// 语法糖
Promise.defer = Promise.deferred = function () {
  let dfd = {}
  dfd.promise = new Promise((resolve,reject)=>{
    dfd.resolve = resolve;
    dfd.reject = reject;
  });
  return dfd;
}
// npm install promises-aplus-tests 用来测试自己的promise 符不符合promisesA+规范
module.exports = Promise
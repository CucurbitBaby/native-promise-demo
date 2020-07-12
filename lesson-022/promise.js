// 首先Promise是一个类
class Promise {
  // 构造函数接收一个参数 => 函数 executor(执行者)
  constructor(executor) {
    // 参数校验 库的开发者不能相信用户的输入
    if (typeof executor !== 'function') {
      throw new TypeError(`Promise resolver ${executor} is not a function cyan!`)
    }

    // 定义resolve和reject函数
    const resolve = function(value) {}
    const reject = function(reason) {}

    // resolve和reject函数分别传递给executor执行
    executor(resolve, reject)
  }
}

module.exports = Promise
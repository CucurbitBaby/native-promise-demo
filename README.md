# 异步编程
> 四种解决方案
1. callback 回调函数
2. generator + co库
3. promise 
4. asycn/await

##### A+规范译文术语
* 解决（fulfill）：指一个 promise 成功时进行的一系列操作，如状态的改变、回调的执行。虽然规范中用 fulfill 来表示解决，但在后世的 promise 实现多以 resolve 来指代之。
* 拒绝（reject）：指一个 promise 失败时进行的一系列操作。
* 终值（eventual value）：所谓终值，指的是 promise 被解决时传递给解决回调的值，由于 promise 有一次性的特征，因此当这个值被传递时，标志着 promise 等待态的结束，故称之终值，有时也直接简称为值（value）。
* 据因（reason）：也就是拒绝原因，指在 promise 被拒绝时传递给拒绝回调的值。
* then方法: Promise 表示一个异步操作的最终结果，与之进行交互的方式主要是 then 方法，该方法注册了两个回调函数，用于接收 promise 的终值或本 promise 不能执行的原因。

##### 术语
* Promise: promise 是一个拥有 then 方法的对象或函数，其行为符合本规范；
* thenable: 是一个定义了 then 方法的对象或函数，文中译作“拥有 then 方法”；
* 值（value）: 指任何 JavaScript 的合法值（包括 undefined , thenable 和 promise）；
* 异常（exception）: 是使用 throw 语句抛出的一个值。
* 据因（reason）: 表示一个 promise 的拒绝原因

#####  Promise 的状态
> 一个 Promise 的当前状态必须为以下三种状态中的一种：等待态（Pending）、执行态（Fulfilled）和拒绝态（Rejected）。
* 等待态（Pending）
  - 处于等待态时，promise 需满足以下条件：
    - 可以迁移至执行态或拒绝态
* 执行态（Fulfilled）
  - 处于执行态时，promise 需满足以下条件：
    - 不能迁移至其他任何状态
    - 必须拥有一个不可变的终值
* 拒绝态（Rejected）
  - 处于拒绝态时，promise 需满足以下条件：
    - 不能迁移至其他任何状态
    - 必须拥有一个不可变的据因

##### Then 方法
* 一个 promise 必须提供一个 then 方法以访问其当前值、终值和据因。
* promise 的 then 方法接受两个参数：
```js
  promise.then(onFulfilled, onRejected)
```
* 参数可选
```js
// onFulfilled 和 onRejected 都是可选参数。

// 如果 onFulfilled 不是函数，其必须被忽略(依然成功输出，用函数包装 return了值)
// 如果 onRejected 不是函数，其必须被忽略


```

##### [更多规范](https://www.ituring.com.cn/article/66566)



##### 开发过程结合promise/a+规范
1. index.js      进行原生的Promise演示
2. promise.js    进行自定义的Promise演示
3. test.js       是对promise.js进行测试

##### A+ 规范
* [译文](https://www.ituring.com.cn/article/66566)
* [史上最最最详细的手写Promise教程](https://juejin.im/post/5b2f02cd5188252b937548ab)
* [手写实现满足 Promise/A+ 规范的 Promise](https://www.jianshu.com/p/8d5c3a9e6181)

##### promise.js
* 它有一个一次性的特征，也就是必须是等待状态迁移至执行态或拒绝态, 就需要定义一些变量记录状态的改变
* state是不可逆的，所以resolve和reject中stat === 'pending'才可以继续下去 
* state === 'pending'; resolve和reject分别改变state等于'fulfilled'和'rejected'; 然后分别执行成功和失败回调 => 分别把终值和拒因赋值this.value和this.reason


##### vscode debug程序
* launch.json指定需要debug的js文件 => test.js
* TypeError: Cannot read property 'state' of undefined
* test.js => resovle(1) 作为一个匿名函数执行的 并没有谁调用它 es6严格模式下只想undefined(通过箭头函数改变就行了)


##### code 边写边优化
* 初始化状态和resolve和reject函数和then方法 分别作为Promise的方法
* 又报this的错误, 借用bind()
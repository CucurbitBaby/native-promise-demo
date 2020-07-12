let p1 = new Promise((resolve) => {
  resolve(1)
})

let p2 = p1.then((resolve => {
  return p2
}))

// (node:3440) UnhandledPromiseRejectionWarning: TypeError: Chaining cycle detected for promise #<Promise>
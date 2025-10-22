/**
 * 节流函数
 * @param fn 要节流的函数
 * @param delay 延迟时间，默认200ms
 * @returns 节流后的函数
 */
export function throttle<T extends (...args: any[]) => any>(
  fn: T,
  delay: number = 200
): (...args: Parameters<T>) => ReturnType<T> | undefined {
  let lastCall = 0
  return function (this: any, ...args: Parameters<T>) {
    const now = new Date().getTime()
    if (now - lastCall < delay) {
      return // 如果距离上次调用时间小于delay，则不执行
    }
    lastCall = now
    return fn.apply(this, args)
  }
}

/**
 * 防抖函数
 * @param fn 要防抖的函数
 * @param delay 延迟时间，默认200ms
 * @returns 防抖后的函数
 */
export function debounce<T extends (...args: any[]) => any>(
  fn: T,
  delay: number = 200
): (...args: Parameters<T>) => ReturnType<T> {
  let timer: number | null = null
  return function (this: any, ...args: Parameters<T>): ReturnType<T> {
    if (timer) clearTimeout(timer)
    return new Promise((resolve, reject) => {
      timer = window.setTimeout(() => {
        try {
          const result = fn.apply(this, args)
          // 如果结果是 Promise，直接返回
          if (result instanceof Promise) {
            result.then(resolve).catch(reject)
          } else {
            resolve(result)
          }
        } catch (error) {
          reject(error)
        }
      }, delay)
    }) as ReturnType<T>
  }
}

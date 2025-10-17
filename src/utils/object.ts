/**
 * 重置表单对象
 * @param form 表单对象
 */
export function resetForm<T extends Record<string, any>>(form: T): void {
  for (const key in form) {
    if (typeof form[key] === 'string') {
      form[key] = '' as any
    } else if (typeof form[key] === 'number') {
      form[key] = 0 as any
    } else if (typeof form[key] === 'boolean') {
      form[key] = false as any
    } else if (Array.isArray(form[key])) {
      form[key] = [] as any
    } else if (typeof form[key] === 'object' && form[key] !== null) {
      form[key] = {} as any
    }
  }
}

/**
 * 深拷贝对象
 * @param obj 要拷贝的对象
 * @returns 深拷贝后的对象
 */
export function deepClone<T>(obj: T): T {
  if (obj === null || typeof obj !== 'object') return obj
  if (obj instanceof Date) return new Date(obj.getTime()) as any
  if (obj instanceof Array) return obj.map(item => deepClone(item)) as any
  if (typeof obj === 'object') {
    const cloned: any = {}
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        cloned[key] = deepClone(obj[key])
      }
    }
    return cloned
  }
  return obj
}

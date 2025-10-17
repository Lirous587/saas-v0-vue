/**
 * 生成随机key
 * @param prefix 前缀，默认为 'key_'
 * @returns 随机key字符串
 */
export function genRandomKey(prefix: string = 'key_'): string {
  // Math.random()：生成一个随机数，并将其转换为 36 进制字符串。
  // substring(2, 9)：截取字符串的第 2 到第 10 个字符，以去掉 0. 前缀并限制长度。
  // Date.now()：获取当前时间戳，确保生成的键是唯一的。
  return prefix + Math.random().toString(36).substring(2, 9) + Date.now().toString(36)
}

/**
 * 生成指定范围的随机整数
 * @param min 最小值
 * @param max 最大值
 * @returns 随机整数
 */
export function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

/**
 * 生成UUID
 * @returns UUID字符串
 */
export function generateUUID(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0
    const v = c === 'x' ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}

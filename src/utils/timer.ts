/**
 * 时间格式化 对应后端的timestamp
 * @param timeStr ISO 8601 格式的时间字符串
 * @returns 格式化后的时间字符串
 */
export function formatDate(timeStr: string): string {
  if (typeof timeStr !== 'string' || !timeStr.includes('T') || !timeStr.includes('Z')) {
    return '刚刚'
  }

  const parts = timeStr.split('Z')
  if (parts.length < 1 || !parts[0]) {
    return '1970-01-01 00:00:00'
  }

  const dateTime = parts[0].split('T')
  if (dateTime.length !== 2) {
    return '1970-01-01 00:00:00'
  }

  return dateTime.join(' ')
}

/**
 * 获取相对时间描述
 * @param date 日期对象或时间戳
 * @returns 相对时间描述
 */
export function getRelativeTime(date: Date | number): string {
  const now = new Date().getTime()
  const target = typeof date === 'number' ? date : date.getTime()
  const diff = now - target

  const minute = 60 * 1000
  const hour = 60 * minute
  const day = 24 * hour
  const week = 7 * day
  const month = 30 * day

  if (diff < minute) return '刚刚'
  if (diff < hour) return `${Math.floor(diff / minute)}分钟前`
  if (diff < day) return `${Math.floor(diff / hour)}小时前`
  if (diff < week) return `${Math.floor(diff / day)}天前`
  if (diff < month) return `${Math.floor(diff / week)}周前`
  return `${Math.floor(diff / month)}个月前`
}

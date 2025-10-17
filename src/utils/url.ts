/**
 * 查询参数对象
 */
export interface QueryParams {
  [key: string]: string | number | boolean | null | undefined
}

/**
 * 将query参数转为url
 * @param query 查询参数对象
 * @returns URL查询字符串
 */
export function queryToUrl(query: QueryParams): string {
  const q: string[] = []
  for (const key in query) {
    if (query[key] != null && query[key] !== '') {
      q.push(`${key}=${encodeURIComponent(String(query[key]))}`)
    }
  }
  const result = q.join('&')
  return result ? '?' + result : ''
}

/**
 * 解析URL查询字符串
 * @param search URL查询字符串
 * @returns 查询参数对象
 */
export function parseQuery(search: string): QueryParams {
  const query: QueryParams = {}
  const params = new URLSearchParams(search)

  for (const [key, value] of params.entries()) {
    query[key] = value
  }

  return query
}

/**
 * 过滤对象中的无效值（undefined、null、NaN、空数组、空对象）
 * 空字符串和数字0不会被过滤
 * @param obj 原始对象
 * @param ignoreKeys 不处理这些键（白名单），如 ['page', 'page_size']
 */
export function pickvalidQuery<T extends Record<string, any>>(
  obj: T,
  ignoreKeys: string[] = []
): Partial<T> {
  const result: Partial<T> = {}

  Object.entries(obj).forEach(([key, value]) => {
    if (ignoreKeys.includes(key)) {
      // 白名单内的 key，直接保留
      result[key as keyof T] = value
      return
    }

    if (
      value === undefined ||
      value === null ||
      (Array.isArray(value) && value.length === 0) ||
      (typeof value === 'object' && !Array.isArray(value) && Object.keys(value).length === 0) ||
      (typeof value === 'number' && isNaN(value))
    ) {
      // 跳过无效值
      return
    }
    // 保存有效值
    result[key as keyof T] = value
  })
  return result
}

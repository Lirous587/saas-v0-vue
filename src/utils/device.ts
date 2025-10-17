/**
 * 设备类型
 */
export type DeviceType = 'mobile' | 'ipad' | 'computer'

/**
 * 获取当前设备类型
 * @returns 设备类型
 */
export function getNowEquipment(): DeviceType {
  if (typeof window === 'undefined') return 'computer'

  const windowWidth = window.innerWidth

  if (windowWidth < 768) {
    return 'mobile'
  } else if (windowWidth >= 768 && windowWidth < 992) {
    return 'ipad'
  }

  return 'computer'
}

/**
 * 检测是否为移动设备
 * @returns 是否为移动设备
 */
export function isMobile(): boolean {
  return getNowEquipment() === 'mobile'
}

/**
 * 检测是否为平板设备
 * @returns 是否为平板设备
 */
export function isTablet(): boolean {
  return getNowEquipment() === 'ipad'
}

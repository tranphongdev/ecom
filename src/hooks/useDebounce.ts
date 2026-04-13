import { useState, useEffect, useMemo } from 'react'
import { debounce } from 'lodash'

/**
 * Hook tùy chỉnh sử dụng lodash debounce
 * @param value Giá trị cần debounce (có thể là string, number, object...)
 * @param delay Thời gian trễ (ms)
 * @returns giá trị đã được chuyển qua debounce
 */
export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)

  // Bọc hàm setDebouncedValue qua lodash.debounce
  // Dùng useMemo để đảm bảo hàm debounce này không bị tạo lại trên mỗi render
  const debouncedSetter = useMemo(
    () => debounce((newValue: T) => setDebouncedValue(newValue), delay),
    [delay]
  )

  useEffect(() => {
    // Kích hoạt debounce setter mỗi khi value thay đổi
    debouncedSetter(value)
    
    // Xóa/hủy các thao tác dư thừa nếu component unmount
    return () => {
      debouncedSetter.cancel()
    }
  }, [value, debouncedSetter])

  return debouncedValue
}

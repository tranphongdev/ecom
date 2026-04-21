import { useQuery } from '@tanstack/react-query'
import { axiosInstance } from '~/utils'

export interface LocationData {
  name: string
  code: number
}

export const useProvinces = () => {
  return useQuery<LocationData[]>({
    queryKey: ['provinces'],
    queryFn: async () => {
      const { data } = await axiosInstance.get('https://provinces.open-api.vn/api/p/')
      return data.sort((a: LocationData, b: LocationData) => a.name.localeCompare(b.name))
    }
  })
}

export const useDistricts = (selectedCityCode?: number) => {
  return useQuery<LocationData[]>({
    queryKey: ['districts', selectedCityCode],
    queryFn: async () => {
      const { data } = await axiosInstance.get(`https://provinces.open-api.vn/api/p/${selectedCityCode}?depth=2`)
      return data.districts.sort((a: LocationData, b: LocationData) => a.name.localeCompare(b.name))
    },
    enabled: !!selectedCityCode
  })
}

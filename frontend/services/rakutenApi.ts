import { HotelSearchParam, HotelSearchResult } from '@/types/hotels'

export const getHotels = async (query: string): Promise<HotelSearchResult> => {
  const endpoint = 'Travel/KeywordHotelSearch'
  const params = {
    keyword: query,
  }
  const data = await fetchRakutenApi<HotelSearchParam, HotelSearchResult>(
    endpoint,
    params
  )
  return data
}

const fetchRakutenApi = async <T extends Record<string, unknown>, U>(
  endpoint: string,
  params: T
): Promise<U> => {
  // 必須かつ固定のパラメーターを追加
  params = {
    ...params,
    format: 'json',
    applicationId: process.env.NEXT_PUBLIC_RAKUTEN_ID,
  }

  const url = createRakutenApiUrl<T>(endpoint, params)
  const response = await fetch(url)
  if (!response.ok) {
    throw new Error('Network response was not ok')
  }
  const data = (await response.json()) as U
  return data
}

const createRakutenApiUrl = <T extends Record<string, unknown>>(
  endpoint: string,
  params: T
): string => {
  const query = createQueryParams(params)
  const appId = process.env.NEXT_PUBLIC_RAKUTEN_ID
  if (!appId) {
    throw new Error(
      'Environment variable NEXT_PUBLIC_RAKUTEN_ID is not defined'
    )
  }
  return `https://app.rakuten.co.jp/services/api/${endpoint}/20170426?${query}`
}

const createQueryParams = <T extends Record<string, unknown>>(params: T) => {
  const query = Object.entries(params)
    .map(([key, value]) => `${key}=${value as string}`)
    .join('&')
  return query
}

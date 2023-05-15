import { HotelSearchResult } from '../../types/hotels.type'

export const getHotels = async (query: string): Promise<HotelSearchResult> => {
  try {
    const response = await fetch(
      `https://app.rakuten.co.jp/services/api/Travel/KeywordHotelSearch/20170426?format=json&keyword=${query}&applicationId=${process.env.NEXT_PUBLIC_RAKUTEN_ID}`
    )
    if (!response.ok) {
      throw new Error('Network response was not ok')
    }
    const data = (await response.json()) as HotelSearchResult
    return data
  } catch (error) {
    console.error(error)
    throw error
  }
}

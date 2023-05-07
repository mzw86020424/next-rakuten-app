import { useState } from 'react'
import { Hotel } from 'type/hotel.type'
import axios from 'axios'

type SearchResponse = {
  hotels: Hotel[]
}

const HotelSearch = () => {
  const [query, setQuery] = useState('')
  const [hotels, setHotels] = useState<Hotel[]>([])

  const handleSearch = async (): Promise<SearchResponse> => {
    const { data } = await axios.get<SearchResponse>(
      `https://app.rakuten.co.jp/services/api/Travel/KeywordHotelSearch/20170426?format=json&keyword=${query}&applicationId=${process.env.NEXT_PUBLIC_RAKUTEN_ID}`
    )
    return data
  }

  const handleButtonClick = async () => {
    try {
      const data = await handleSearch()
      setHotels(data.hotels)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div>
      <input
        placeholder="text"
        type="text"
        value={query}
        onChange={(x) => setQuery(x.target.value)}
      />
      {/* eslint-disable-next-line */}
      <button onClick={handleButtonClick}>Search</button>
      {hotels.map((value: Hotel) => (
        <div key={value.hotel[0].hotelBasicInfo.hotelNo}>
          <h2>{value.hotel[0].hotelBasicInfo.hotelName}</h2>
          <p>{value.hotel[0].hotelBasicInfo.hotelInformationUrl}</p>
        </div>
      ))}
    </div>
  )
}

export default HotelSearch

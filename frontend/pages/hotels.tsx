'use client'

import { useState } from 'react'
import { HotelInfo } from '../types/hotels'
import { getHotels } from '@/services/api'

const Hotels = () => {
  const [query, setQuery] = useState('')
  const [hotels, setHotels] = useState<
    {
      hotel: [HotelInfo]
    }[]
  >([])

  const fetchHotels = async () => {
    try {
      const hotelsData = await getHotels(query)
      setHotels(hotelsData.hotels)
    } catch (error) {
      console.error(error)
    }
  }

  const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    void fetchHotels()
  }

  return (
    <>
      <form>
        <input
          placeholder="text"
          type="text"
          value={query}
          onChange={(x) => setQuery(x.target.value)}
        />
        <button onClick={handleButtonClick}>Search</button>
      </form>
      {hotels.length > 0 ? (
        hotels.map((value) => {
          return (
            <div key={value.hotel[0].hotelBasicInfo.hotelNo}>
              {value.hotel[0].hotelBasicInfo.hotelName}
              {value.hotel[0].hotelBasicInfo.hotelInformationUrl}
              {value.hotel[0].hotelBasicInfo.hotelMinCharge}
            </div>
          )
        })
      ) : (
        <div>No results</div>
      )}
    </>
  )
}

export default Hotels

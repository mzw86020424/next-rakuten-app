import { useRouter } from 'next/router'
import { useState } from 'react'
import { HotelInfo } from '@/types/hotels'
import { getHotel } from '@/services/rakutenApi'

const Hotel = () => {
  const router = useRouter()
  const { id } = router.query
  const [hotels, setHotels] = useState<
    {
      hotel: [HotelInfo]
    }[]
  >([])
  const hotelBasicInfo = hotels[0]?.hotel[0]?.hotelBasicInfo

  const testClick = () => {
    fetchHotel()
  }

  const fetchHotel = async () => {
    try {
      await getHotel(Number(id)).then((res) => {
        setHotels(res.hotels)
        console.log(hotelBasicInfo)
      })
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
      <button onClick={testClick}>test</button>
      <p>{hotelBasicInfo?.hotelName}</p>
    </>
  )
}

export default Hotel

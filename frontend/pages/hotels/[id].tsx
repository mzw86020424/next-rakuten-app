import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import { HotelInfo } from '@/types/hotels'
import { getHotel } from '@/services/rakutenApi'
import Image from 'next/image'

const Hotel = () => {
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)
  const { id } = router.query
  const [hotels, setHotels] = useState<
    {
      hotel: [HotelInfo]
    }[]
  >([])
  const hotelBasicInfo = hotels[0]?.hotel[0]?.hotelBasicInfo

  useEffect(() => {
    if (id !== undefined) {
      getHotel(Number(id))
        .then((res) => res.hotels)
        .then((data) => {
          setHotels(data)
        })
        .catch((error) => {
          setError(error)
          console.log(error)
        })
    }
  }, [id])

  if (id === undefined) {
    return <p>Loading...</p>
  }

  return (
    <>
      <p>{hotelBasicInfo?.hotelName}</p>
      <Image
        src={hotelBasicInfo?.hotelImageUrl}
        alt="ホテル画像"
        height={500}
        width={500}
      />
    </>
  )
}

export default Hotel

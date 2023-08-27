import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import { HotelInfo } from '@/types/hotels'
import { getHotel } from '@/services/rakutenApi'
import Image from 'next/image'

async function fetchHotelData(id: string) {
  const response = await getHotel(Number(id))
  return response.hotels[0]?.hotel[0]
}

const Hotel = () => {
  const router = useRouter()
  const { id } = router.query

  const [hotelInfo, setHotelInfo] = useState<HotelInfo | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    if (id !== undefined) {
      setLoading(true)
      setError(null)

      fetchHotelData(id as string)
        .then((data) => {
          setHotelInfo(data || null)
        })
        .catch((error: Error) => {
          setError(error)
        })
        .finally(() => {
          setLoading(false)
        })
    }
  }, [id])

  if (loading) {
    return <p>Loading...</p>
  }

  if (error) {
    return <p>An error occurred: {error.message}</p>
  }

  if (!hotelInfo) {
    return <p>ホテル情報がありません</p>
  }

  return (
    <>
      <p>{hotelInfo.hotelBasicInfo.hotelName}</p>
      <Image
        src={hotelInfo.hotelBasicInfo.hotelImageUrl}
        alt="ホテル画像"
        height={500}
        width={500}
      />
    </>
  )
}

export default Hotel

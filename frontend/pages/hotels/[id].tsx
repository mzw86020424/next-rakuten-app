import { useRouter } from 'next/router'
import { getHotel } from '@/services/rakutenApi'

const Hotel = () => {
  const router = useRouter()
  const { id } = router.query

  const testClick = () => {
    fetchHotel()
  }

  const fetchHotel = async () => {
    try {
      await getHotel(Number(id)).then((res) => {
        console.log(res)
      })
    } catch (error) {
      console.error(error)
    }
  }

  return <>
  <button onClick={testClick}>test</button>
  </>
}

export default Hotel

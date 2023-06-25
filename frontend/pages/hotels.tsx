'use client'

import { useState } from 'react'
import { HotelInfo } from '../types/hotels'
import { getHotels } from '@/services/rakutenApi'
import styles from '@/styles/hotels.module.css'

const Hotels = () => {
  const [query, setQuery] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [hotels, setHotels] = useState<
    {
      hotel: [HotelInfo]
    }[]
  >([])

  const fetchHotels = async (page = 1) => {
    try {
      const hotelsData = await getHotels(query, page)
      setHotels(hotelsData.hotels)
      setCurrentPage(hotelsData.pagingInfo.page)
      setTotalPages(hotelsData.pagingInfo.pageCount)
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
      <table className={styles['table-container']}>
        <thead>
          <tr>
            <th>ホテル名</th>
            <th>URL</th>
            <th>宿泊価格</th>
          </tr>
        </thead>
        <tbody>
          {hotels.length === 0 ? (
            <tr>
              <td colSpan={3}>No results</td>
            </tr>
          ) : (
            hotels.map((value) => {
              return (
                <tr key={value.hotel[0].hotelBasicInfo.hotelNo}>
                  <td>
                    <h1>{value.hotel[0].hotelBasicInfo.hotelName}</h1>
                  </td>
                  <td>
                    <a href={value.hotel[0].hotelBasicInfo.hotelInformationUrl}>
                      {value.hotel[0].hotelBasicInfo.hotelInformationUrl}
                    </a>
                  </td>
                  <td>{value.hotel[0].hotelBasicInfo.hotelMinCharge}円 ~</td>
                </tr>
              )
            })
          )}
        </tbody>
      </table>
      <div className={styles['pagination-container']}>
        <button
          disabled={currentPage === 1}
          onClick={() => fetchHotels(currentPage - 1)}
        >
          前へ
        </button>
        <span>{currentPage}</span>
        <button
          disabled={currentPage === totalPages}
          onClick={() => fetchHotels(currentPage + 1)}
        >
          次へ
        </button>
      </div>
    </>
  )
}

export default Hotels

'use client'

import { useState } from 'react'
import { HotelInfo } from '../types/hotels'
import { getHotels } from '@/services/rakutenApi'
import styles from '@/styles/hotels.module.css'
import Image from 'next/image'

const Hotels = () => {
  const [keyword, setKeyword] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [hotels, setHotels] = useState<
    {
      hotel: [HotelInfo]
    }[]
  >([])

  const handleSearchClick = () => {
    void fetchHotels()
  }

  const handlePreviousClick = () => {
    void fetchHotels(currentPage - 1)
  }

  const handleNextClick = () => {
    void fetchHotels(currentPage + 1)
  }

  const fetchHotels = async (page = 1) => {
    try {
      await getHotels(keyword, page).then((res) => {
        setHotels(res.hotels)
        setCurrentPage(res.pagingInfo.page)
        setTotalPages(res.pagingInfo.pageCount)
      })
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
      <input
        placeholder="text"
        type="text"
        value={keyword}
        onChange={(x) => setKeyword(x.target.value)}
      />
      <button onClick={handleSearchClick}>Search</button>
      <table className={styles['table-container']}>
        <thead>
          <tr>
            <th>image</th>
            <th>ホテル名</th>
            <th>URL</th>
            <th>宿泊価格</th>
          </tr>
        </thead>
        <tbody>
          {hotels.length === 0 ? (
            <tr>
              <td colSpan={4}>No results</td>
            </tr>
          ) : (
            hotels.map((value) => {
              return (
                <tr key={value.hotel[0].hotelBasicInfo.hotelNo}>
                  <td className="relative">
                    <Image
                      src={value.hotel[0].hotelBasicInfo.hotelImageUrl}
                      alt="ホテルのサムネイル画像"
                      className="object-cover"
                      fill
                      quality={100}
                    />
                  </td>
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
        <div>
          {currentPage === 1 ? null : <a onClick={handlePreviousClick}>＜</a>}
        </div>
        <div>
          <span>
            {currentPage} / {totalPages}
          </span>
        </div>
        <div>
          {currentPage === totalPages ? null : (
            <a onClick={handleNextClick}>＞</a>
          )}
        </div>
      </div>
    </>
  )
}

export default Hotels

'use client'

import { useState } from 'react'
import { HotelInfo } from '@/types/hotels'
import { getHotels } from '@/services/rakutenApi'
import styles from '@/styles/hotels.module.css'
import Image from 'next/image'
import Link from 'next/link'

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
      <form
        className="mt-4 mx-auto w-full max-w-md flex items-center px-4"
        onSubmit={(e) => {
          e.preventDefault() // デフォルトのフォーム送信を防ぐ
          handleSearchClick()
        }}
      >
        <input
          className="flex-grow p-2 border rounded mr-2"
          placeholder="text"
          type="text"
          value={keyword}
          onChange={(x) => setKeyword(x.target.value)}
        />
        <button className="p-2 bg-blue-500 text-white rounded" type="submit">
          Search
        </button>
      </form>
      <table className={styles['table-container']}>
        <thead>
          <tr>
            <th>image</th>
            <th>ホテル名</th>
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
                  <td className={`relative ${styles['image-cell']}`}>
                    <div className={styles['image-container']}>
                      <Image
                        src={value.hotel[0].hotelBasicInfo.hotelThumbnailUrl}
                        alt="ホテルのサムネイル画像"
                        layout="fill"
                        className={styles['image']}
                      />
                    </div>
                  </td>
                  <td>
                    <Link
                      href={`/hotels/${value.hotel[0].hotelBasicInfo.hotelNo}`}
                      target="_blank"
                    >
                      {value.hotel[0].hotelBasicInfo.hotelName}
                    </Link>
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

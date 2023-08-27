import Hotels from '../../../pages/hotels/index'
import { render, fireEvent, waitFor, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { getHotels } from '../../../services/rakutenApi'

describe('初期表示', () => {
  test('入力フォームと検索ボタンが表示されている', () => {
    const { getByText, getByPlaceholderText } = render(<Hotels />)
    expect(getByPlaceholderText('text')).toBeTruthy()
    expect(getByText('Search')).toBeTruthy()
  })
})

// next/imageとgetHotelsのモック作成
/* eslint-disable react/display-name, @next/next/no-img-element */
jest.mock('next/image', () => ({ src, alt }: { src: string; alt: string }) => (
  <img src={src} alt={alt} />
))
jest.mock('../../../services/rakutenApi', () => ({
  getHotels: jest.fn(),
}))

describe('ホテル一覧検索', () => {
  const mockHotelsResponse = {
    hotels: [
      {
        hotel: [
          {
            hotelBasicInfo: {
              hotelNo: '1',
              hotelName: 'test hotel',
              hotelInformationUrl: 'http://testhotel.com',
              hotelImageUrl: 'http://testhotel.com/image.jpg',
              hotelMinCharge: 1000,
            },
          },
        ],
      },
    ],
    pagingInfo: {
      page: 1,
      pageCount: 1,
    },
  }

  beforeEach(() => {
    ;(getHotels as jest.Mock).mockResolvedValue(mockHotelsResponse)
  })

  test('画像が表示されること', async () => {
    render(<Hotels />)

    const inputElement = screen.getByPlaceholderText('text')
    const buttonElement = screen.getByText('Search')

    fireEvent.change(inputElement, { target: { value: 'test' } })
    fireEvent.click(buttonElement)

    await waitFor(() => expect(getHotels).toHaveBeenCalledTimes(1))

    const imageElement = screen.getByAltText('ホテルのサムネイル画像')

    expect(imageElement).toBeInTheDocument()
    expect(imageElement).toHaveAttribute( // TODO: srcが渡せていないので要調査
      'src',
      mockHotelsResponse.hotels[0].hotel[0].hotelBasicInfo.hotelImageUrl
    )
  })

  test('詳細ページへのリンクが表示されること', async () => {
    render(<Hotels />)

    const inputElement = screen.getByPlaceholderText('text')
    const buttonElement = screen.getByText('Search')
  
    fireEvent.change(inputElement, { target: { value: 'test' } })
    fireEvent.click(buttonElement)

    await waitFor(() => expect(getHotels).toHaveBeenCalledTimes(1))

    const linkElement = screen.getByText('test hotel')

    expect(linkElement).not.toBeNull();
    expect(linkElement.getAttribute('href')).toBe('/hotels/1');
  })
})

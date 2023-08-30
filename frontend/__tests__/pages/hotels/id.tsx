import Hotel from '../../../pages/hotels/[id]'
import { render, fireEvent, waitFor, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { getHotel } from '../../../services/rakutenApi'
import { useRouter } from '../../../__mocks__/next/router';

describe('初期表示', () => {
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
  const mockRouterResponse = {
    query: 1,
  }

  jest.mock('../../../services/rakutenApi'); // モックを適用

  beforeEach(() => {
    (getHotel as any).mockResolvedValue(mockHotelsResponse); // getHotel のモック設定
  });

  useRouter.mockReturnValue(mockRouterResponse);

  const getHotel = jest.fn(() => mockHotelsResponse);

  test('ホテル名とホテル画像が表示されること', async () => {
    render(<Hotel />);

    await waitFor(() => expect(getHotel).toHaveBeenCalled);

    const imageElement = screen.getByAltText('ホテル画像')
  })
})
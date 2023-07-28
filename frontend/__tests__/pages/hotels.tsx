import Hotels from '@/pages/hotels'
import { render } from '@testing-library/react'

describe('初期表示', () => {
  test('入力フォームと検索ボタンが表示されている', () => {
    const { getByText, getByPlaceholderText } = render(<Hotels />)
    expect(getByPlaceholderText('text')).toBeTruthy()
    expect(getByText('Search')).toBeTruthy()
  })
})

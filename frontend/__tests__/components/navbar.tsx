import Navbar from '@/components/navbar'
import { render } from '@testing-library/react'

describe('Navbarコンポーネント', () => {
  test('サイトのタイトルが表示される', () => {
    const { getByText } = render(<Navbar />)
    expect(getByText('サイトのタイトル')).toBeTruthy()
  })

  test('ホームとホテル,ブログへのリンクが表示される', () => {
    const { getByText } = render(<Navbar />)
    expect(getByText('ホーム')).toBeTruthy()
    expect(getByText('ホテル')).toBeTruthy()
  })
})

import Navbar from '../../components/navbar'
import { render } from '@testing-library/react'

describe('Navbarコンポーネント', () => {
  test('サイトのタイトルが表示される', () => {
    const { getByText } = render(<Navbar />)
    expect(getByText('サイトのタイトル')).toBeTruthy()
  })

  test('ホームとホテルへのリンクが表示される', () => {
    const { getByText } = render(<Navbar />)
    expect(getByText('ホーム')).toBeTruthy()
    expect(getByText('ホテル')).toBeTruthy()
  })

  test('ホームをクリックすると正しいURLに遷移する', () => {
    const { getByText } = render(<Navbar />);
    // "'homeLink' は 'null' の可能性があります。"の警告を回避するために、nullの場合は空のaタグを返す
    const homeLink = getByText('ホーム').closest('a') ?? document.createElement('a');

    expect(homeLink.getAttribute('href')).toBe('/');
  });

  test('ホテルをクリックすると正しいURLに遷移する', () => {
    const { getByText } = render(<Navbar />);
    // "'hotelLink' は 'null' の可能性があります。"の警告を回避するために、nullの場合は空のaタグを返す
    const hotelLink = getByText('ホテル').closest('a') ?? document.createElement('a');

    expect(hotelLink.getAttribute('href')).toBe('/hotels');
  });
})
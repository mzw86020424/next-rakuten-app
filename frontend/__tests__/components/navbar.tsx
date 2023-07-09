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
    const homeLink = getByText('ホーム').closest('a');

    expect(homeLink).not.toBeNull();
    // "'homeLink' は 'null' の可能性があります。"の警告を回避するために安全参照を実施
    expect(homeLink?.getAttribute('href')).toBe('/');
  });

  test('ホテルをクリックすると正しいURLに遷移する', () => {
    const { getByText } = render(<Navbar />);
    const hotelLink = getByText('ホテル').closest('a');
  
    expect(hotelLink).not.toBeNull();
    // "'hotelLink' は 'null' の可能性があります。"の警告を回避するために安全参照を実施
    expect(hotelLink?.getAttribute('href')).toBe('/hotels');
  });
})
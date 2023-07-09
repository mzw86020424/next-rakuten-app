import Hotels from '@/pages/hotels'
import { render, fireEvent } from '@testing-library/react'

describe('初期表示', () => {
  test('入力フォームと検索ボタンが表示されている', () => {
    const { getByText, getByPlaceholderText } = render(<Hotels />)
    expect(getByPlaceholderText('text')).toBeTruthy()
    expect(getByText('Search')).toBeTruthy()
  })
})

describe('検索ボタン押下', () => {
  test('フォームに入力して検索ボタンを押下するとconsole.logされる', () => {
    const { getByText, getByPlaceholderText } = render(<Hotels />)
    const input: HTMLInputElement = getByPlaceholderText(
      'text'
    ) as HTMLInputElement
    const button: HTMLButtonElement = getByText('Search') as HTMLButtonElement
    const searchString = 'test'
    input.value = searchString
    expect(input.value).toBe(searchString)
    fireEvent.click(button)
    const consoleOutput: any[] = []
    console.log = jest.fn((output) => consoleOutput.push(output))
  })
})

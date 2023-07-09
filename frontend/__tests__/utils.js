import { render } from '@testing-library/react'
import { AuthProvider } from '@/contexts/AuthContext'

const customRender = (ui, options) =>
  render(ui, { wrapper: AuthProvider, ...options })

// ネイティブの render を上書きする
export * from '@testing-library/react'

// customRender をデフォルトの render としてエクスポートする
export { customRender as render }

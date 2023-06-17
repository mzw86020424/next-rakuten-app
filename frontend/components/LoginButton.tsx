import { useAuth0 } from '@auth0/auth0-react'
import { useAuthContext } from '@/contexts/AuthContext'

export const LoginButton = () => {
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0()
  const { setToken } = useAuthContext()

  const onLoginClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    void loginWithRedirect()
  }

  const onLogoutClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    // ログアウトする時に、tokenをnullに設定
    setToken(null)
    void logout({ logoutParams: { returnTo: window.location.origin } })
  }

  if (!isAuthenticated) {
    return <button onClick={onLoginClick}>LOG IN</button>
  } else {
    return <button onClick={onLogoutClick}>LOG OUT</button>
  }
}

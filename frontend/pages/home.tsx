import { useAuth0 } from '@auth0/auth0-react'
import { NextPage } from 'next'
import React from 'react'

const Home: NextPage = () => {
  const { isAuthenticated } = useAuth0()

  return (
    <div>
      <h2>ログイン状態</h2>
      {isAuthenticated ? (
        <>
          <p>ログイン中です</p>
        </>
      ) : (
        <p>ログアウトしています</p>
      )}
    </div>
  )
}

export default Home

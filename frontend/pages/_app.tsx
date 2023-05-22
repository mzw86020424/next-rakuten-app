import 'styles/globals.css'
import type { AppProps } from 'next/app'
import Layout from '../components/layout'
import { Auth0Provider } from '@auth0/auth0-react'

export default function App({ Component, pageProps }: AppProps) {
  //ログイン後のリダイレクト先を指定
  const baseUrl = process.env['NEXT_PUBLIC_BASE_URL'] || 'http://localhost'
  const redirectUri = `${baseUrl}/home`
  return (
    <Auth0Provider
      domain={process.env['NEXT_PUBLIC_AUTH0_DOMAIN']!}
      clientId={process.env['NEXT_PUBLIC_AUTH0_CLIENT_ID']!}
      authorizationParams={{
        redirect_uri: `${redirectUri}`,
      }}
    >
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Auth0Provider>
  )
}

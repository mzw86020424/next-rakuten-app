import 'styles/globals.css'
import type { AppProps } from 'next/app'
import Layout from '../components/layout'
import { Auth0Provider } from '@auth0/auth0-react'
import { AuthProvider } from '@/contexts/AuthContext'

export default function App({ Component, pageProps }: AppProps) {
  //ログイン後のリダイレクト先を指定
  const baseUrl = process.env['NEXT_PUBLIC_BASE_URL'] || 'http://localhost'
  const redirectUri = `${baseUrl}/`
  const domain = process.env['NEXT_PUBLIC_AUTH0_DOMAIN']
  const clientId = process.env['NEXT_PUBLIC_AUTH0_CLIENT_ID']
  const audience = process.env['NEXT_PUBLIC_AUTH0_AUDIENCE']

  if (!domain || !clientId || !audience) {
    throw new Error(
      'Environment variables NEXT_PUBLIC_AUTH0_DOMAIN, NEXT_PUBLIC_AUTH0_CLIENT_ID, NEXT_PUBLIC_AUTH0_AUDIENCE must be set.'
    )
  }

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{
        redirect_uri: `${redirectUri}`,
        audience: audience,
      }}
    >
      <AuthProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </AuthProvider>
    </Auth0Provider>
  )
}

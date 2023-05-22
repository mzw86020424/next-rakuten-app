import styles from './navbar.module.css'
import NextLink from 'next/link'
import { LoginButton } from './LoginButton'

export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      <div className={styles.navbar_title}>
        <NextLink href="/">サイトのタイトル</NextLink>
      </div>
      <ul>
        <li>
          <NextLink href="/" className={styles.navbar_link}>
            ホーム
          </NextLink>
        </li>
        <li>
          <NextLink href="/hotels" className={styles.navbar_link}>
            ホテル
          </NextLink>
        </li>
      </ul>
      <ul>
        <li>
          <LoginButton />
        </li>
      </ul>
    </nav>
  )
}

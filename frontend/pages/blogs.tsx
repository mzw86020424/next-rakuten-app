import { NextPage } from 'next'
import React, { useState } from 'react'
import { useAuthContext } from '@/contexts/AuthContext'

const Blogs: NextPage = () => {
  const { token } = useAuthContext()

  const [title, setTitle] = useState<string>('')
  const [caption, setCaption] = useState<string>('')

  const onClickPost = () => {
    if (!token) {
      alert('ログインしてください')
      return
    }
    if (title.trim() === '' || caption.trim() === '') {
      alert('タイトルと本文は必須です')
      return
    }
    const params = {
      title: title,
      caption: caption,
    }

    if (!process.env.NEXT_PUBLIC_API_BASE_URL) {
      throw new Error('NEXT_PUBLIC_API_BASE_URL is not defined')
    }
    fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/posts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token ?? ''}`,
      },
      body: JSON.stringify(params),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error('Network response was not ok')
        }
        return res.json()
      })
      .then(() => {
        setTitle('')
        setCaption('')
        alert('投稿が成功しました')
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setState: React.Dispatch<React.SetStateAction<string>>
  ) => {
    setState(e.target.value)
  }

  return (
    <div>
      <label htmlFor="">タイトル</label>
      <input
        type="text"
        value={title}
        onChange={(e) => {
          onChange(e, setTitle)
        }}
      />
      <br />
      <label htmlFor="">本文</label>
      <input
        type="text"
        value={caption}
        onChange={(e) => {
          onChange(e, setCaption)
        }}
      />
      <br />
      <button onClick={onClickPost}>新規投稿</button>
    </div>
  )
}

export default Blogs

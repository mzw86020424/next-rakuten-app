import { NextPage } from 'next'
import React, { useEffect, useState } from 'react'
import { useAuthContext } from '@/contexts/AuthContext'
import { Blog } from '@/types/blogs'

const Blogs: NextPage = () => {
  const { token } = useAuthContext()

  const [title, setTitle] = useState<string>('')
  const [caption, setCaption] = useState<string>('')

  const onClick = () => {
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
    console.log(token)

    fetch('http://127.0.0.1:3000/api/v1/posts', {
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
      .then((data) => {
        console.log(data)
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

  console.log(token)

  useEffect(() => {
    const getPosts = async () => {
      const res = await fetch('http://localhost:3000/api/v1/posts')
      const data: Blog[] = await (res.json() as Promise<Blog[]>)
      console.log(data)
    }
    void getPosts()
  }, [])

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
      <button onClick={onClick}>新規投稿</button>
    </div>
  )
}

export default Blogs

import { videoInfo } from '@/types/nicodous'
import { useState } from 'react'
import { getNicodouVideos } from 'services/railsApi'

const Nicodous = () => {
  const [keyword, setKeyword] = useState<string>('')
  const [nicodous, setNicodous] = useState<videoInfo[]>([])

  const fetchNicodous = async () => {
    try {
      // TODO: resの型を指定する
      await getNicodouVideos(keyword).then((res) => {
        setNicodous(res.data as videoInfo[])
      })
    } catch (error) {
      console.error(error)
    }
  }

  const handleSearchClick = () => {
    void fetchNicodous()
  }

  return (
    <>
      <input
        placeholder="text"
        type="text"
        value={keyword}
        onChange={(x) => setKeyword(x.target.value)}
      />
      <button onClick={handleSearchClick}>Search</button>
      <table>
        <thead>
          <tr>
            <th>タイトル</th>
            <th>詳細</th>
            <th>タグ</th>
          </tr>
        </thead>
        <tbody>
          {nicodous.length === 0 ? (
            <tr>
              <td colSpan={3}>No results</td>
            </tr>
          ) : (
            nicodous.map((value) => {
              return (
                <tr key={value.title}>
                  <td>
                    <h1>{value.title}</h1>
                  </td>
                  <td>
                    <h2>{value.description}</h2>
                  </td>
                  <td>
                    <h2>{value.tags}</h2>
                  </td>
                </tr>
              )
            })
          )}
        </tbody>
      </table>
    </>
  )
}

export default Nicodous

import { useState } from 'react'
import { getNicodouVideos } from "services/railsApi";

const Nicodous = () => {
  const [keyword, setKeyword] = useState('')
  const [nicodous, setNicodous] = useState<
    {
      // TODO:nicodouData型を定義する
      nicodous: [nicodouData]
    }[]
  >([])

  const fetchNicodous = async () => {
    try {
      await getNicodouVideos(keyword).then((res) => {
        setNicodous(res.nicodous)
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
      {{nicodous}}
    </>
  )
}

export default Nicodous

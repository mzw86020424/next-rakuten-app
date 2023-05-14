import { useState } from 'react'

export default function Hotels() {
  const [searchTerm, setSearchTerm] = useState('')

  const handleSearch = () => {
    console.log(searchTerm)
  }

  return (
    <div>
      <input
        placeholder="text"
        type="text"
        value={searchTerm}
        onChange={(x) => setSearchTerm(x.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  )
}

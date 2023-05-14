export default function Sample() {

  const fetchSamples = async () => {
    const res = await fetch('http://localhost:3000/samples')
    const data = await res.json()
    console.log(data)
  }

  return (
    <div>
      <button onClick={fetchSamples} >sample</button>
    </div>
  )
}

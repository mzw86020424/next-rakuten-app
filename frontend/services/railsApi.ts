const getNicodouVideos = async (params: RequestInit) => {
  const path = 'nicodous'
  return await fetchRailsApi(path, params)
}

const fetchRailsApi = async (path: string, options: RequestInit = {}) => {
  const url = createRailsApiUrl(path)
  const response = await fetch(url, options)
  if (!response.ok) {
    throw new Error('Network response was not ok')
  }
  const data = (await response.json())
  return data
}

const createRailsApiUrl = (path: string) => {
  const url = `${process.env.NEXT_PUBLIC_RAILS_API_URL}/${path}`
  return url
}
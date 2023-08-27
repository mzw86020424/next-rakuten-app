export const getNicodouVideos = async (keyword: string) => {
  const path = 'nicodous'
  const params = { keyword: keyword }
  return await fetchRailsApi(path, params)
}

const fetchRailsApi = async <T extends Record<string, unknown>>(path: string, params: T) => {
  const url = createRailsApiUrl(path, params)
  const response = await fetch(url)
  if (!response.ok) {
    throw new Error('Network response was not ok')
  }
  const data = (await response.json())
  return data
}

const createRailsApiUrl = <T extends Record<string, unknown>>(path: string, params: T) => {
  const query = createQueryParams(params)
  const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/${path}?${query}`
  return url
}

const createQueryParams = <T extends Record<string, unknown>>(params: T) => {
  const query = Object.entries(params)
    .map(([key, value]) => `${key}=${value as string}`)
    .join('&')
  return query
}
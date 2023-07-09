# https://site.nicovideo.jp/search-api-docs/snapshot
class NicodouClient
  require 'net/http'

  def search_videos
    request = Net::HTTP::Get.new(
      '/api/v2/snapshot/video/contents/search'
    )
    response = client.request(request)
    JSON.parse(response.body)
  end

  private

  def client
    uri = URI.parse('https://api.search.nicovideo.jp')
    client = Net::HTTP.new(uri.host, uri.port)
    client.use_ssl = true

    client
  end
end

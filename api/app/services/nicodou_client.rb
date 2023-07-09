# https://site.nicovideo.jp/search-api-docs/snapshot
class NicodouClient
  require 'net/http'

  def search_videos(keyword)
    endpoint = 'snapshot/video/contents/search'

    params = {
      'q' => keyword,
      # ソート順、取得項目、サービス名はとりあえず固定
      '_sort' => 'viewCounter',
      'targets' => 'title,description,tags',
      '_context' => 'my-api'
    }

    res = get(endpoint, params)

    JSON.parse(res.body)
  end

  private

  def get(endpoint, params={})
    uri = URI.parse("https://api.search.nicovideo.jp/api/v2/#{endpoint}")
    uri.query = URI.encode_www_form(params)

    http = Net::HTTP.new(uri.host, uri.port)
    http.use_ssl = true

    req = Net::HTTP::Get.new(uri)

    http.request(req)
  end
end

# https://site.nicovideo.jp/search-api-docs/snapshot
class NicodouClient
  require 'net/http'

  def search_videos(params)
    endpoint = 'snapshot/video/contents/search'
    params = build_default_params(params)
    res = get(endpoint, params)

    raise "Error: #{res.code} #{res.message}" if res.code != '200'

    JSON.parse(res.body)
  end

  private

  # ソート順、検索対象項目、取得項目、サービス名はとりあえず固定
  def build_default_params(params)
    {
      q: params[:keyword] || '',
      _sort: params[:sort] || 'viewCounter',
      targets: params[:target] || 'title,description,tags',
      fields: params[:fields] || 'title,description,tags',
      _context: 'my-api'
    }
  end

  def get(endpoint, params = {})
    uri = URI.parse("#{ENV.fetch('NICODOU_API_DOMAIN', nil)}/#{endpoint}")
    uri.query = URI.encode_www_form(params)

    http = Net::HTTP.new(uri.host, uri.port)
    http.use_ssl = true

    req = Net::HTTP::Get.new(uri)

    http.request(req)
  end
end

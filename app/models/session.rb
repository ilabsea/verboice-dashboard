class Session
  cattr_accessor :success, :credential

  def self.login url, email, password
      response = Typhoeus::Request.post(url, body: {account: {email: email, password: password}}, headers: {"Accept" => "application/json"} )

      if response.success?
        @@success = true
        JSON.parse(response.body, symbolize_names: true, endpoint: url)
      else
        @@success = false
        if response.code == 401
          JSON.parse(response.body, symbolize_names: true, endpoint: url)
        elsif response.code == 404
          {success: false, message: 'Page not found'}
        end
      end

  end

  def self.success?
    @@success
  end

end

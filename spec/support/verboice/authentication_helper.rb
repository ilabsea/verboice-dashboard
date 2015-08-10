module Verboice::AuthenticationHelper
  def auth_params
    {
      url:      'http://localhost:3000/api2/auth',
      email:    '1@example.com',
      password: 'password'
    }
  end

end

module Features
  module SessionHelpers
    def sign_in
      VCR.use_cassette 'features/user_sign_in_valid' do
        visit sign_in_path
        fill_in "Email",  with: user_params[:email]
        fill_in "Password", with: user_params[:password]
        click_button "Login"
      end
    end
  end
end

require "rails_helper"

RSpec.describe Session, :type => :model do
  before(:each ) do
    @url  = 'http://localhost:3000/api/channels'
    @user = '1@example.com'
    @pwd  = 'password'
  end

  describe '.login' do
    context 'with valid endpoint and credential' do
      it 'return successs result' do
        VCR.use_cassette 'models/login-success' do
          response = Session.login(auth_params[:url], auth_params[:email], auth_params[:password])
          expect(response[:success]).to be true
          expect(response[:auth_token]).not_to be_empty
          expect(response[:email]).to eq auth_params[:email]
          expect(Session.success?).to be true
        end

      end
    end

    context 'with valid endpoint and invalid credential' do
      it 'return successs result' do
        password = 'password2'
        email = '1@example.com'
        url  = 'http://localhost:3000/api2'

        VCR.use_cassette 'models/login-invalid-credential' do
         response = Session.login(url, email, password)
         expect(response[:success]).to be false
         expect(response[:message]).to eq 'Error with your login or password'
         expect(Session.success?).to be false
        end
      end
    end

    context 'with invalid endpoint' do
      it 'return error result' do
        password = 'passwords'
        email = '1@example.com'
        url  = 'http://localhost:3000/api'

        VCR.use_cassette 'models/login-invalid-endpoint' do
          response = Session.login(url, email, password)
          expect(response[:success]).to be false
          expect(response[:message]).to eq 'Page not found'
          expect(Session.success?).to be false
        end

      end

    end
  end

end

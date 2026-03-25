class SessionsController < ApplicationController
  allow_unauthenticated_access only: %i[ new create ]
  rate_limit to: 10, within: 3.minutes, only: :create, with: -> { redirect_to new_session_path, alert: "Try again later." }

  def new
  end

  def show
    if Current.user
      render json: { user: Current.user }
    else
      render json: {}, status: :unauthorized
    end
  end

  def create
    params.expect(:email_address, :password)
    if user = User.authenticate_by(params.permit(:email_address, :password))
      start_new_session_for user
      render json: { token: Current.session.token, user: user }
    else
      render json: {}, status: :unauthorized
    end
  end

  def destroy
    terminate_session
    render json: {}
  end
end

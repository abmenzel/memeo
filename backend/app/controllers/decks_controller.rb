class DecksController < ApplicationController
  before_action :require_authentication
  before_action :set_deck, only: %i[update destroy]
  
  def index
    render json: Current.user.decks.includes(:cards), include: :cards
  end

  def show
    render json: @deck
  end

  def create
    @deck = Current.user.decks.build(deck_params)

    if @deck.save
      render json: @deck, status: :created
    else
      render json: @deck.errors, status: :unprocessable_entity
    end
  end

  def update
    if @deck.update(deck_params)
      render json: @deck
    else
      render json: @deck.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @deck.destroy
  end

  private
    def set_deck
      @deck = Current.user.decks.find(params[:id])
    end

    def deck_params
      params.expect(deck: [:name])
    end
end

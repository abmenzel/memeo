class CardsController < ApplicationController
  before_action :require_authentication
  before_action :set_deck
  before_action :set_card, only: %i[update destroy]
  
  def index
    render json: @deck.cards
  end

  def create
    card_params = params.expect(card: [:front, :back])
    @card = @deck.cards.build(card_params)

    if @card.save
      render json: @card, status: :created
    else
      render json: @card.errors, status: :unprocessable_entity
    end
  end

  def update
    if @card.update(card_params)
      render json: @card, status: :created
    else
      render json: @card.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @card.destroy
  end

  private
    def set_deck
      @deck = Current.user.decks.find(params[:deck_id])
    end

    def set_card
      @card = @deck.cards.find(params[:id])
    end
end

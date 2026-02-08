class TagsController < ApplicationController
  before_action :require_authentication
  before_action :set_tag, only: %i[update destroy]

  def index
    render json: Current.user.tags
  end

  def create
    tag_params = params.expect(tag: [:name, :color])
    @tag = Current.user.tags.build(tag_params)

    if @tag.save
      render json: @tag, status: :created
    else
      render json: @tag.errors, status: :unprocessable_entity
    end
  end

  def update
    tag_params = params.expect(tag: [:name, :color])
    
    if @tag.update(tag_params)
      render json: @tag
    else
      render json: @tag.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @tag.destroy
  end

  private
    def set_tag
      @tag = Current.user.tags.find(params[:id])
    end

end

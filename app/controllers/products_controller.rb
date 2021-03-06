class ProductsController < ApplicationController
  before_action :set_product, except: [:index, :new, :create, :search]
  before_action :set_products, only: [:index, :show]
  before_action :move_to_index, except: [:index, :show, :search]
  before_action :set_parents, only: [:index, :show, :new, :create, :edit, :update]

  def index
    if user_signed_in?
      @user = User.find(current_user.id)
    end
    @images = Image.limit(3).order(id: "DESC")
  end

  def new
    @product = Product.new
    @product.images.new
  end

  def create
    @product = Product.new(product_params)
    if @product.save
      return
    else
      @product.images.new
      render :new
    end
  end

  def edit
    if user_signed_in? && current_user.id == @product.user_id
      return
    else
      redirect_to product_path
    end
  end

  def update
    if @product.update(product_params)
      redirect_to product_path
    else
      render :edit
    end
  end

  def show
    if user_signed_in?
      @user = User.find(current_user.id)
    end
    @images = @product.images
    @category = @product.category
    @parent = @category.root
    @children = @category.parent
    @products = Product.includes(:images).order("created_at DESC").where(category_id: @parent.descendants).where.not(category_id: @category)
    @likes = Like.where(product_id: @product.id).count
    @likes = 0 if @likes.nil?
    @comment = Comment.new
    @comments = @product.comments.includes(:user)
  end

  def destroy
    if @product.destroy
      redirect_to root_path
    else
      redirect_to product_path
    end
  end

  def search
    respond_to do |format|
      format.html
      format.json do
        if params[:parent_id]
          @childrens = Category.find(params[:parent_id]).children
        elsif params[:children_id]
          @grandChilds = Category.find(params[:children_id]).children
        elsif params[:gcchildren_id]
          @parents = Category.where(id: params[:gcchildren_id])
        elsif params[:keyword]
          @keywords = params[:keyword]
          return nil if @keywords == ""
          @allProducts = []
          @keywords.split(/[[:blank:]]+/).each do |keyword|
            @allProducts += Product.all.where("name LIKE(?) OR brand LIKE(?)", "%#{keyword}%", "%#{keyword}%").order(created_at: :desc)
          end
          @allProducts.uniq!

          @allCategorys = []
          @keywords.split(/[[:blank:]]+/).each do |keyword|
            @allCategorys += Category.where("name LIKE(?)", "%#{keyword}%")
          end
          @allCategorys.uniq!
        elsif params[:userid]
          @user = User.where(id: params[:userid])
        end
      end
    end
  end

  private

  def product_params
    params.require(:product).permit(:name, :price, :brand, :size, :prefecture_id, :condition_id, :postage_id, :shippingday_id, :detal, :category_id, :buyer_id, images_attributes: [:item, :_destroy, :id]).merge(user_id: current_user.id)
  end

  def set_product
    @product = Product.find(params[:id])
  end

  def set_products
    @products = Product.includes(:images).order("created_at DESC")
  end

  def move_to_index
    redirect_to user_session_path unless user_signed_in?
  end

  def set_parents
    @parents = Category.where(ancestry: nil)
  end
end

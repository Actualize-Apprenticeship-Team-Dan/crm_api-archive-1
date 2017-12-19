class SettingsController < ApplicationController
  # def new
    
  # end

  # def create
  #   @setting = Setting.create(
  #                             admin_id: current_admin.id
  #                             )
  # end

  def edit
    @setting = current_admin.setting

  end

  def update
    @setting = current_admin.setting
    if @setting.update(setting_params)
      flash[:success] = "Settings Saved!"
      redirect_to "/"
    else
      render :edit
    end
  end

  private
  def setting_params
    params.require(:setting).permit(:auto_text)
  end

end

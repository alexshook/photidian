module ApplicationHelper

  def private?
    if self.private == true
      return true
    end
  end

end

json.array!  @leads.each do |lead|
  json.(lead, :id, :first_name, :last_name, :email, :phone, :appointment_date, :created_at, :notes)
  # json.events lead.events, :id, :name, :created_at
  # json.outreaches lead.outreaches, :id, :notes
end
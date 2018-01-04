json.array!  @leads.each do |lead|
  json.(lead, :id, :first_name, :last_name, :email, :phone, :appointment_date, :notes)
  json.events lead.events, :id, :lead_id, :name, :created_at, :updated_at
  json.outreaches lead.outreaches, :id, :notes, :lead_id, :updated_at
end
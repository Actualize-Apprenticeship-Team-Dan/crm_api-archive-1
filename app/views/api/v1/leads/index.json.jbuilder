json.array!  @leads.each do |lead|
  json.(lead, :id, :first_name, :last_name, :email, :phone, :ip, :city, :state,
  :zip, :contacted, :appointment_date, :created_at, :updated_at, :processed_within_minutes, :hot, :notes)
  json.events lead.events, :id, :lead_id, :name, :created_at, :updated_at
  json.outreaches lead.outreaches, :id, :notes, :lead_id, :updated_at
end
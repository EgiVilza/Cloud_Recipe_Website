output "roles" {
    description = "The roles and their members"
    value = var.roles
}

output "service_accounts_data" {
  description = "Data of all service accounts"
  value = google_service_account.service_accounts
}

output "map_of_service_accounts_emails" {
  description = "A map of emails"
  value = { for k, v in google_service_account.service_accounts : k => v.email }
}
# Service Accounts
resource "google_service_account" "service_accounts" {
  for_each     = var.service_accounts
  account_id   = each.key
  display_name = each.value
  project      = var.project_id
}

# IAM Project Bindings
resource "google_project_iam_binding" "bindings" {
  for_each = var.roles
  project  = var.project_id
  role     = each.key
  members  = each.value[*]
}
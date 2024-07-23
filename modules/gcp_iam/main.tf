# Service Accounts
resource "google_service_account" "service_accounts" {
  for_each = var.service_accounts
  account_id = each.key
  display_name = each.value
  project = var.project_id
}

# IAM Project Bindings
resource "google_project_iam_binding" "bindings" {
  for_each = var.roles
  project = var.project_id
  role = each.key
  members = each.value[*]
}

# Storage Bucket IAM Members
resource "google_storage_bucket_iam_member" "storage_bucket_members" {
  bucket = var.bucket_name
  role = var.storage_bucket_roles
  member = var.storage_bucket_members
}

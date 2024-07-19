# Sets default settings for enabling APIs
resource "google_project_service" "default" {
  for_each = toset(var.apis)
  project = var.project_id
  service = each.key
  disable_dependent_services = true
  disable_on_destroy = false
}


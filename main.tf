provider "google" {
  project = var.project_id
  region  = var.region
}

module "enable_apis" {
  source = "./modules/enable_apis"
  project_id = var.project_id
  apis = var.apis
}

# GCR Service Account
resource "google_service_account" "gcr_service_account" {
  account_id   = "gcr-service-account"
  display_name = "GCR Service Account"
}

# Not Yet Implmented into modules#

# # Creating App Bucket
# resource "google_storage_bucket" "recipe_app_bucket" {
#   name          = var.bucket_name
#   location      = "US"
#   force_destroy = true

#   website {
#     main_page_suffix = "build/index.html"
#     not_found_page   = "build/index.html"
#   }
# }

# # Creating App Bucket Object
# resource "google_storage_bucket_object" "recipe_app_bucket_object" {
#   for_each = fileset(path.module, "build/**")

#   name   = each.value
#   bucket = google_storage_bucket.recipe_app_bucket.name
#   source = "${path.module}/${each.value}"

#   depends_on = [google_storage_bucket.recipe_app_bucket]
# }

# # All Users access to Storage Bucket
# resource "google_storage_bucket_iam_member" "all_users" {
#   bucket = google_storage_bucket.recipe_app_bucket.name
#   role   = "roles/storage.objectViewer"
#   member = "allUsers"
# }

# # Creating Storage Admin Role
# resource "google_project_iam_binding" "gcr_service_account_binding" {
#   project = var.project_id
#   role    = "roles/storage.admin"

#   members = [
#     "serviceAccount:${google_service_account.gcr_service_account.email}"
#   ]
# }

# # Creating Primary Cluster
# resource "google_container_cluster" "primary" {
#   name     = "my-gke-cluster"
#   location = var.region

#   initial_node_count = 1

#   node_config {
#     machine_type = "e2-micro"
#   }

#   deletion_protection = false

#   depends_on = [google_project_service.kubernetes_engine]
# }

# # Creating Primary Node
# resource "google_container_node_pool" "primary_nodes" {
#   cluster  = google_container_cluster.primary.name
#   location = var.region

#   node_count = 1

#   node_config {
#     preemptible  = false
#     machine_type = "e2-micro"

#     disk_type    = "pd-standard"
#     disk_size_gb = 50

#     oauth_scopes = [
#       "https://www.googleapis.com/auth/cloud-platform",
#     ]
#   }

#   management {
#     auto_upgrade = true
#     auto_repair  = true
#   }

#   depends_on = [google_project_service.kubernetes_engine]
# }

# Whats next: Manage Terraform code & Deploy docker image
# Note: Docker Image
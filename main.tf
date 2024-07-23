provider "google" {
  project = var.project_id
  region  = var.region
}

module "enable_apis" {
  source     = "./modules/enable_apis"
  project_id = var.project_id
  apis       = [
    "compute.googleapis.com",
    "appengine.googleapis.com",
  ]
}

module "gcp_iam" {
  source     = "./modules/gcp_iam"
  project_id = var.project_id

  # IAM Service Accounts
  service_accounts = var.service_accounts

  # IAM Bindings
  roles = {
    "roles/storage.admin" = [
      "serviceAccount:${module.gcp_iam.service_accounts_data["gcr-service-account"].email}",
      ]
    }

  # Storage Bucket allUsers IAM
  bucket_name = var.bucket_name
  storage_bucket_roles = "roles/storage.objectViewer"
  storage_bucket_members = "allUsers"
}

# module "storage" {
#   source = "./modules/storage"
#   file_path = path.module
#   bucket_name = var.bucket_name
# }

# Not Yet Implmented into modules #

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
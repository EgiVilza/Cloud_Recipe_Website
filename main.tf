provider "google" {
  project = var.project_id
  region  = var.region
}

module "enable_apis" {
  source     = "./modules/enable_apis"
  project_id = var.project_id
  # apis = [
  #   "compute.googleapis.com",
  #   "appengine.googleapis.com",2
  # ]
}

#IAM project roles and members
module "project_iam" {
  source     = "./modules/gcp_iam/project_iam"
  project_id = var.project_id

  # IAM Service Accounts
  service_accounts = var.service_accounts

  # IAM Bindings
  roles = {
    "roles/storage.admin" = [
      "serviceAccount:${module.project_iam.service_accounts_data["gcr-service-account"].email}",
    ]
  }
}

# IAM Storage Bucket allUsers
module "storage_iam" {
  source                 = "./modules/gcp_iam/storage_iam"
  bucket_name            = var.bucket_name
  storage_bucket_roles   = "roles/storage.objectViewer"
  storage_bucket_members = "allUsers"

  depends_on = [ module.storage ]
}

# Storage Bucket for build / Note: Possibly change module name
module "storage" {
  source      = "./modules/storage"
  file_path   = path.module
  bucket_name = var.bucket_name
}

module "gke_cluster" {
  source       = "./modules/containers/gke_cluster"
  cluster_name = "my-gke-cluster"
  location     = var.region
  machine_type = "e2-micro"
  node_count   = 1

  depends_on = [ module.enable_apis ]
}

module "node_pool" {
  source       = "./modules/containers/node_pool"
  cluster_name = "my-gke-cluster"
  location     = var.region
  machine_type = "e2-micro"
  node_count   = 1
  disk_type    = "pd-standard"
  disk_size_gb = 50

  depends_on = [ module.enable_apis, module.gke_cluster ]
}

# Whats next: Manage Terraform code & Deploy docker image
# Note: Docker Image
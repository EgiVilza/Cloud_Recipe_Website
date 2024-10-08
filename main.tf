provider "google" {
  project = var.project_id
  region  = var.region
}

# Data for currently authenticated Google Cloud account 
data "google_client_config" "provider" {}

provider "kubernetes" {
  host                   = "https://${module.gke_cluster.cluster_endpoint}"
  cluster_ca_certificate = base64decode(module.gke_cluster.cluster_ca_certificate)
  token                  = data.google_client_config.provider.access_token
}

# Enable APIs
module "enable_apis" {
  source     = "./modules/enable_apis"
  project_id = var.project_id
  # apis = [
  #   "compute.googleapis.com",
  #   "appengine.googleapis.com",2
  # ]
}

# IAM project roles and members
module "project_iam" {
  source     = "./modules/gcp_iam/project_iam"
  project_id = var.project_id

  # IAM Service Accounts
  service_accounts = var.service_accounts

  # IAM Bindings
  roles = {
    "roles/storage.admin" = [
      "serviceAccount:${module.project_iam.service_accounts_data["gcr-service-account"].email}",
    ],
    "roles/container.admin" = [
      "serviceAccount:${module.project_iam.service_accounts_data["gcr-service-account"].email}",
    ]
  }
}

# Storage Bucket for build / Note: Possibly change module name
module "storage" {
  source      = "./modules/storage"
  file_path   = path.module
  bucket_name = var.bucket_name
}

# GKE Cluster
module "gke_cluster" {
  source       = "./modules/containers/gke_cluster"
  cluster_name = "my-gke-cluster"
  location     = var.region
  machine_type = "e2-micro"
  node_count   = 1

  depends_on = [module.enable_apis]
}

# Node Pool
module "node_pool" {
  source       = "./modules/containers/node_pool"
  cluster_name = "my-gke-cluster"
  location     = var.region
  machine_type = "e2-micro"
  node_count   = 1
  disk_type    = "pd-standard"
  disk_size_gb = 50

  depends_on = [module.enable_apis, module.gke_cluster]
}

# App Deployment
module "kubernetes_deployment" {
  source     = "./modules/containers/kubernetes_deployment"
  project_id = var.project_id

  depends_on = [ module.gke_cluster ]
}

# App Service
module "kubernetes_service" {
  source = "./modules/containers/kubernetes_service"

  depends_on = [ module.kubernetes_deployment ]
}

# Whats next: Update build to hide API keys & Implement a recipe mongoDB database
# For later: Fix sidebar bug

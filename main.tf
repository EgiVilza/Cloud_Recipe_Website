provider "google" {
  project = var.project
  region  = var.region
}

# resource "google_compute_instance" "default" {
#   name = "terraform-instance"
#   machine_type = "f1-micro"
#   zone = var.zone

#   boot_disk {
#     initialize_params {
#       image = "debian-cloud/debian-9"
#     }
#   }

#   network_interface {
#     network = "default"

#     access_config {
#       // Ephemeral public IP
#     }
#   }
# }

# Enable Compute Engine API
resource "google_project_service" "compute_engine" {
  project = var.project
  service = "compute.googleapis.com"
}

# Enable App Engine API
resource "google_project_service" "app_engine" {
  project = var.project
  service = "appengine.googleapis.com"
}

# Creating App Bucket
resource "google_storage_bucket" "recipe_app_bucket" {
  name          = var.bucket_name
  location      = "US"
  force_destroy = true

  website {
    main_page_suffix = "build/index.html"
    not_found_page = "build/index.html"
  }
}

# Creating App Bucket Object
resource "google_storage_bucket_object" "recipe_app_bucket_object" {
  for_each = fileset(path.module, "build/**")

  name   = each.value
  bucket = google_storage_bucket.recipe_app_bucket.name
  source = "${path.module}/${each.value}"

  depends_on = [google_storage_bucket.recipe_app_bucket]
}

resource "google_storage_bucket_iam_member" "all_users" {
  bucket = google_storage_bucket.recipe_app_bucket.name
  role   = "roles/storage.objectViewer"
  member = "allUsers"
}